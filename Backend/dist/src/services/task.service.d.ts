export declare const createTaskService: (creatorId: string, data: any) => Promise<import("mongoose").Document<unknown, {}, import("../interfaces/task.interface").ITask, {}, {}> & import("../interfaces/task.interface").ITask & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const getTasksService: (query: any, userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../interfaces/task.interface").ITask, {}, {}> & import("../interfaces/task.interface").ITask & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
})[]>;
export declare const updateTaskService: (taskId: string, userId: string, data: any) => Promise<import("mongoose").Document<unknown, {}, import("../interfaces/task.interface").ITask, {}, {}> & import("../interfaces/task.interface").ITask & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const deleteTaskService: (taskId: string, userId: string) => Promise<void>;
//# sourceMappingURL=task.service.d.ts.map