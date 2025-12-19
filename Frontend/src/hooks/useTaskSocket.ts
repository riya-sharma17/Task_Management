import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "../utils/socket";

export const useTaskSocket = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        socket.on("task:created", () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        });

        socket.on("task:updated", () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        });

        socket.on("task:deleted", () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        });

        return () => {
            socket.off("task:created");
            socket.off("task:updated");
            socket.off("task:deleted");
        };
    }, []);
};
