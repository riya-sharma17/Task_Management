"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskService = exports.updateTaskService = exports.getTasksService = exports.createTaskService = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const taskAudit_model_1 = __importDefault(require("../models/taskAudit.model"));
const ApiError_1 = require("../utils/ApiError");
const message_1 = require("../utils/message");
const enum_1 = require("../utils/enum");
const task_socket_1 = require("../sockets/task.socket");
const createTaskService = async (creatorId, data) => {
    const assignee = await user_model_1.default.findById(data.assignedToId);
    if (!assignee) {
        throw new ApiError_1.ApiError(400, message_1.ERROR_RESPONSE.USER_NOT_FOUND);
    }
    const task = await task_model_1.default.create({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority,
        status: data.status ?? enum_1.TaskStatus.TODO,
        creatorId,
        assignedToId: data.assignedToId,
    });
    (0, task_socket_1.emitTaskCreated)(task);
    if (creatorId !== data.assignedToId) {
        (0, task_socket_1.emitTaskAssigned)(data.assignedToId, task);
    }
    return task;
};
exports.createTaskService = createTaskService;
const getTasksService = async (query) => {
    const { status, priority, sort } = query;
    const filter = {};
    if (status)
        filter.status = status;
    if (priority)
        filter.priority = priority;
    const sortQuery = {};
    if (sort === "dueDate")
        sortQuery.dueDate = 1;
    return task_model_1.default.find(filter)
        .sort(sortQuery)
        .populate("assignedToId", "name email")
        .populate("creatorId", "name email");
};
exports.getTasksService = getTasksService;
const updateTaskService = async (taskId, userId, data) => {
    const task = await task_model_1.default.findOne({
        _id: taskId,
        $or: [
            { creatorId: userId },
            { assignedToId: userId },
        ],
    });
    if (!task) {
        throw new ApiError_1.ApiError(404, message_1.ERROR_RESPONSE.TASK_NOT_FOUND);
    }
    const isCreator = task.creatorId.equals(userId);
    const isAssignee = task.assignedToId.equals(userId);
    const isSelfAssigned = isCreator && isAssignee;
    if (!isSelfAssigned) {
        if (data.status && !isAssignee) {
            throw new ApiError_1.ApiError(403, message_1.ERROR_RESPONSE.ONLY_ASSIGNE);
        }
        if (data.priority && !isCreator) {
            throw new ApiError_1.ApiError(403, message_1.ERROR_RESPONSE.ONLY_CREATOR);
        }
        if (data.assignedToId && !isCreator) {
            throw new ApiError_1.ApiError(403, message_1.ERROR_RESPONSE.CREATOR_REASSIGN);
        }
    }
    const oldStatus = task.status;
    const updatedTask = await task_model_1.default.findByIdAndUpdate(taskId, data, { new: true })
        .populate("assignedToId", "name email")
        .populate("creatorId", "name email");
    if (!updatedTask) {
        throw new ApiError_1.ApiError(404, message_1.ERROR_RESPONSE.TASK_NOT_FOUND);
    }
    if (data.status && data.status !== oldStatus) {
        await taskAudit_model_1.default.create({
            taskId: updatedTask._id,
            updatedBy: userId,
            oldStatus,
            newStatus: data.status,
        });
    }
    (0, task_socket_1.emitTaskUpdated)(updatedTask);
    if (data.assignedToId) {
        (0, task_socket_1.emitTaskAssigned)(data.assignedToId.toString(), updatedTask);
    }
    return updatedTask;
};
exports.updateTaskService = updateTaskService;
const deleteTaskService = async (taskId, userId) => {
    const task = await task_model_1.default.findOneAndDelete({
        _id: taskId,
        creatorId: userId,
    });
    if (!task) {
        throw new ApiError_1.ApiError(403, message_1.ERROR_RESPONSE.TASK_NOT_FOUND);
    }
    (0, task_socket_1.emitTaskDeleted)(taskId);
};
exports.deleteTaskService = deleteTaskService;
//# sourceMappingURL=task.service.js.map