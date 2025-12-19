import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../api/auth.api";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

export const useLogout = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: logoutApi,

        onSuccess: (data) => {
            console.log("logout on success :", data);
            dispatch(logout());
        },

        onError: (err) => {
            console.log("LOGOUT ERROR : ", err);
        },
    });
};

