import { useQuery } from "@tanstack/react-query";
import { getTasksListApi } from "../api/task.api";

type TaskFilters = {
    status?: string;
    priority?: string;
};

export const useTasks = (filters: TaskFilters) => {
    return useQuery({
        queryKey: ["tasks", filters],
        queryFn: () => getTasksListApi(filters),
        retry: false,
    });
};
