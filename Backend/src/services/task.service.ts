import TaskModel from "../models/task.model";
import userModel from "../models/user.model";
import TaskAuditModel from "../models/taskAudit.model";
import { ApiError } from "../utils/ApiError";
import { ERROR_RESPONSE } from "../utils/message";
import { TaskStatus } from "../utils/enum";

import {
    emitTaskCreated,
    emitTaskUpdated,
    emitTaskDeleted,
    emitTaskAssigned,
} from "../sockets/task.socket";


export const createTaskService = async (
    creatorId: string,
    data: any
) => {
    const assignee = await userModel.findById(data.assignedToId);
    if (!assignee) {
        throw new ApiError(400, ERROR_RESPONSE.USER_NOT_FOUND);
    }

    const task = await TaskModel.create({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority,
        status: data.status ?? TaskStatus.TODO,
        creatorId,
        assignedToId: data.assignedToId,
    });

    emitTaskCreated(task);

    if (creatorId !== data.assignedToId) {
        emitTaskAssigned(data.assignedToId, task);
    }

    return task;
};

export const getTasksService = async (query: any) => {
    const { status, priority, sort } = query;

    const filter: any = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const sortQuery: any = {};
    if (sort === "dueDate") sortQuery.dueDate = 1;

    return TaskModel.find(filter)
        .sort(sortQuery)
        .populate("assignedToId", "name email")
        .populate("creatorId", "name email");
};

export const updateTaskService = async (
    taskId: string,
    userId: string,
    data: any
) => {
    const task = await TaskModel.findOne({
        _id: taskId,
        $or: [
            { creatorId: userId },
            { assignedToId: userId },
        ],
    });

    if (!task) {
        throw new ApiError(404, ERROR_RESPONSE.TASK_NOT_FOUND);
    }

    const isCreator = task.creatorId.equals(userId);
    const isAssignee = task.assignedToId.equals(userId);
    const isSelfAssigned = isCreator && isAssignee;

    if (!isSelfAssigned) {

        if (data.status && !isAssignee) {
            throw new ApiError(
                403,
                ERROR_RESPONSE.ONLY_ASSIGNE
            );
        }

        if (data.priority && !isCreator) {
            throw new ApiError(
                403,
                ERROR_RESPONSE.ONLY_CREATOR
            );
        }

        if (data.assignedToId && !isCreator) {
            throw new ApiError(
                403,
                ERROR_RESPONSE.CREATOR_REASSIGN
            );
        }
    }

    const oldStatus = task.status;

    const updatedTask = await TaskModel.findByIdAndUpdate(
        taskId,
        data,
        { new: true }
    )
        .populate("assignedToId", "name email")
        .populate("creatorId", "name email");

    if (!updatedTask) {
        throw new ApiError(404, ERROR_RESPONSE.TASK_NOT_FOUND);
    }

    if (data.status && data.status !== oldStatus) {
        await TaskAuditModel.create({
            taskId: updatedTask._id,
            updatedBy: userId,
            oldStatus,
            newStatus: data.status,
        });
    }

    emitTaskUpdated(updatedTask);

    if (data.assignedToId) {
        emitTaskAssigned(
            data.assignedToId.toString(),
            updatedTask
        );
    }

    return updatedTask;
};

export const deleteTaskService = async (
    taskId: string,
    userId: string
) => {
    const task = await TaskModel.findOneAndDelete({
        _id: taskId,
        creatorId: userId,
    });

    if (!task) {
        throw new ApiError(403, ERROR_RESPONSE.TASK_NOT_FOUND);
    }

    emitTaskDeleted(taskId);
};
