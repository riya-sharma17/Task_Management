import api from "./axios";
import { ENDPOINTS } from "../utils/endPoints";
import type { CreateTaskPayload, Task, UpdateTaskPayload, } from "../utils/type";


/* ================= GET ================= */
// export const getTasksListApi = async (): Promise<Task[]> => {
//     const res = await api.get(ENDPOINTS.GET_TASKS);
//     return res.data.data;
// };

type TaskFilters = {
    status?: string;
    priority?: string;
};

export const getTasksListApi = async (filters?: TaskFilters): Promise<Task[]> => {
    const res = await api.get(ENDPOINTS.GET_TASKS, {
        params: {
            ...(filters?.status && { status: filters.status }),
            ...(filters?.priority && { priority: filters.priority }),
        },
    });

    return res.data.data;
};


/* ================= CREATE ================= */
export const createTaskApi = async (payload: CreateTaskPayload) => {
    const res = await api.post(ENDPOINTS.CREATE_TASK, payload);
    return res.data.data;
};

/* ================= UPDATE ================= */

export const updateTaskApi = async ({
    taskId,
    data,
}: UpdateTaskPayload) => {
    const res = await api.put(ENDPOINTS.UPDATE_TASK(taskId), data);
    return res.data.data;
};

/* ================= DELETE ================= */
export const deleteTaskApi = async (taskId: string) => {
    const res = await api.delete(ENDPOINTS.DELETE_TASK(taskId));
    return res.data.data;
};
