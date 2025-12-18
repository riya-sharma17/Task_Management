import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/user/list");
      return res.data.data;
    },
  });
};
