import { useQuery } from "@tanstack/react-query";
import { getUsersListApi } from "../api/user.api";

export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsersListApi,
        retry: false,
    });
};