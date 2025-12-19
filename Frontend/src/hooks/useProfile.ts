import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../api/auth.api";

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfileApi,
        retry: false,
    });
};
