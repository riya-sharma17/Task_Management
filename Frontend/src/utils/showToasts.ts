import { toast } from "react-hot-toast";

/**
 * @function TOAST
 * @description TOASTS FOR DIFFERENT ACTIONS
 */

export const SHOW_ERROR_TOAST = (message = "OOPS! something went wrong") => {
    toast.dismiss(); // Clears any existing toast before showing a new one
    message = message.toString();
    toast.error(message);
};

export const SHOW_INTERNET_TOAST = () => {
    toast.dismiss(); // Clears any existing toast before showing a new one
    toast.error("Please check your internet connections.");
};

export const LOGOUT_TOAST = () => {
    toast.success("Logout Successful");
};
export const SUCCESS_TOAST = (message = "Successful") => {
    message = message.toString();
    toast.success(message);
};

