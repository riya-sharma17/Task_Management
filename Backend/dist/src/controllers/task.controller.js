"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const task_service_1 = require("../services/task.service");
const message_1 = require("../utils/message");
const createTask = async (req, res, next) => {
    try {
        const task = await (0, task_service_1.createTaskService)(res.locals.user._id, req.body);
        return res.status(201).json({
            message: message_1.SUCCESS_RESPONSE.TASK_CREATED,
            data: task,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createTask = createTask;
// export const getTasks = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const tasks = await getTasksService(req.query);
//         return res.status(200).json({
//             message: SUCCESS_RESPONSE.TASKS_FETCHED,
//             data: tasks,
//         });
//     } catch (error) {
//         next(error);
//     }
// };
const getTasks = async (req, res, next) => {
    try {
        const userId = res.locals.user._id;
        const tasks = await (0, task_service_1.getTasksService)(req.query, userId);
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.TASKS_FETCHED,
            data: tasks
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getTasks = getTasks;
const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await (0, task_service_1.updateTaskService)(id, res.locals.user._id, req.body);
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.TASK_UPDATED,
            data: task,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        await (0, task_service_1.deleteTaskService)(id, res.locals.user._id);
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.TASK_DELETED,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.controller.js.map