import { ENDPOINTS } from "../utils/endPoints";
import type { UpdateProfileDetails } from "../utils/type";
import api from "./axios";

export const loginApi = async (payload: {
    email: string;
    password: string;
}) => {
    const res = await api.post(ENDPOINTS.LOGIN, payload);
    console.log("login response :", res)
    return res;
};

export const registerApi = async (payload: {
    name: string;
    email: string;
    password: string;
}) => {
    const { data } = await api.post(ENDPOINTS.REGISTER, payload);
    return data;
};

export const getProfileApi = async () => {
    const res = await api.get(ENDPOINTS.ME);
    console.log("MY PROFILE API RESPONSE : ", res);
    return res.data.data;
};

export const logoutApi = async () => {
    const res = await api.post(ENDPOINTS.LOGOUT);
    console.log("logout response :", res);
    return res.data;
}
export const updateProfileApi = async (payload: UpdateProfileDetails) => {
    const res = await api.put(ENDPOINTS.UPDATED_PROFILE, payload);
    console.log("update profile response :", res);
    return res.data.data;
}