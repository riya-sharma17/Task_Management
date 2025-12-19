import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskApi } from "../api/task.api";
import type { UpdateTaskPayload } from "../utils/type";

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateTaskPayload) =>
            updateTaskApi(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};
