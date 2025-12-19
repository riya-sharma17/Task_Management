import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api/auth.api";
import { SHOW_ERROR_TOAST, SUCCESS_TOAST } from "../utils/showToasts";

export const useRegister = () => {
    return useMutation({
        mutationFn: registerApi,
        onSuccess:(data) => {
            SUCCESS_TOAST(data.message || "Registration successful!");
        },
        onError:(err) => {
            SHOW_ERROR_TOAST(err.message || "Registration failed. Please try again.");
        }
    });
};
