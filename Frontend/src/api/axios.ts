import axios from "axios";
import { store } from "../store/store";
import { logout } from "../store/slices/authSlice";
import { SHOW_ERROR_TOAST, SHOW_INTERNET_TOAST } from "../utils/showToasts";
export const BASEURL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: BASEURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Response → Auto logout on 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        const errorMessage = error.response?.data?.message || error.message || "Something went wrong. Please try again.";

        if (error.code === "ECONNABORTED") {
            SHOW_ERROR_TOAST("Request timeout. Please try again.");
            return Promise.reject({
                message: "Request timeout. Please try again.",
                status: 408,
            });
        }

        if (!error.response) {
            SHOW_INTERNET_TOAST();
            return Promise.reject({
                message: "Network error. Please check your internet connection.",
                status: 0,
            });
        }

        const { status } = error.response;

        if (status === 401 || status === 403) {
            store.dispatch(logout());
            return Promise.reject({
                message: errorMessage,
                status,
            });
        }

        SHOW_ERROR_TOAST(errorMessage);

        return Promise.reject({
            message: errorMessage,
            status,
        });
    }
);


export default api;
