import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTaskPayload } from "../utils/type";
import { createTaskApi } from "../api/task.api";


export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateTaskPayload) =>
            createTaskApi(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};
