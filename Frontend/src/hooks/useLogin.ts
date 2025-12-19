import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/auth.api";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/slices/authSlice";
import { SHOW_ERROR_TOAST } from "../utils/showToasts";

export const useLogin = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: loginApi,

        onSuccess: (data) => {
            console.log("login data on success :", data);
            const dataToSave = data.data.data;
            dispatch(setUserDetails(dataToSave));
        },

        onError: (err) => {
            SHOW_ERROR_TOAST(err.message || "Login failed. Please try again.");
        },
    });
};

