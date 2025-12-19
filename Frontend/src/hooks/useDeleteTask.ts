import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskApi } from "../api/task.api";

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskId: string) => deleteTaskApi(taskId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};
