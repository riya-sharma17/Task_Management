import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/auth.api";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/slices/authSlice";
import { SHOW_ERROR_TOAST, SUCCESS_TOAST } from "../utils/showToasts";

export const useLogin = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: loginApi,

        onSuccess: (data) => {
            const dataToSave = data.data.data;
            dispatch(setUserDetails(dataToSave));
            SUCCESS_TOAST(data.data.message || "Login successful!");
        },

        onError: (err) => {
            SHOW_ERROR_TOAST(err.message || "Login failed. Please try again.");
        },
    });
};

