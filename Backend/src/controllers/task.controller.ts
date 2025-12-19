import { Request, Response, NextFunction } from "express";
import {
    createTaskService,
    getTasksService,
    updateTaskService,
    deleteTaskService,
} from "../services/task.service";
import { SUCCESS_RESPONSE } from "../utils/message";

export const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const task = await createTaskService(
            res.locals.user._id,
            req.body
        );

        return res.status(201).json({
            message: SUCCESS_RESPONSE.TASK_CREATED,
            data: task,
        });
    } catch (error) {
        next(error);
    }
};

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

export const getTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = res.locals.user._id;

        const tasks = await getTasksService(req.query, userId);

        return res.status(200).json({
            message: SUCCESS_RESPONSE.TASKS_FETCHED,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};


export const updateTask = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const task = await updateTaskService(
            id,
            res.locals.user._id,
            req.body
        );

        return res.status(200).json({
            message: SUCCESS_RESPONSE.TASK_UPDATED,
            data: task,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        await deleteTaskService(
            id,
            res.locals.user._id
        );

        return res.status(200).json({
            message: SUCCESS_RESPONSE.TASK_DELETED,
        });
    } catch (error) {
        next(error);
    }
};
