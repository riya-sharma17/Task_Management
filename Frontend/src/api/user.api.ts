import api from "./axios";
import { ENDPOINTS } from "../utils/endPoints";

export const getUsersListApi = async () => {
    const res = await api.get(ENDPOINTS.GET_USERS);
    console.log("USERS LIST RESPONSE : ", res);
    return res.data.data.users;
};

