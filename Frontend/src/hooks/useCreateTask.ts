import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTaskPayload } from "../utils/type";
import { createTaskApi } from "../api/task.api";
import { SUCCESS_TOAST } from "../utils/showToasts";


export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateTaskPayload) =>
            createTaskApi(payload),

        onSuccess: (data) => {
            console.log("Task created successfully:", data);
            SUCCESS_TOAST(data.message || "Task created successful");
            queryClient.invalidateQueries({ queryKey: ["tasks"] });

        },
    });
};
