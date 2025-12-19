import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/slices/authSlice";
import { updateProfileApi } from "../api/auth.api";

export const useUpdateProfile = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: updateProfileApi,

        onSuccess: (data) => {
            dispatch(setUserDetails(data));
        },

        onError: (err) => {
            console.error(err);
        },
    });
};

