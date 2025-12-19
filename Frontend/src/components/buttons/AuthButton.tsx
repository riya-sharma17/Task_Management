import React from "react";
import Spinner from "../spinner";

type AuthButtonProps = {
    text: string;
    clickHandler: () => void;
    isLoading?: boolean;
    disabled?: boolean;
};

const AuthButton: React.FC<AuthButtonProps> = ({
    text,
    clickHandler,
    isLoading = false,
    disabled = false,
}) => {
    const isDisabled = disabled || isLoading;

    return (
        <button
            type="button"
            onClick={clickHandler}
            disabled={isDisabled}
            className={`
        w-full flex items-center justify-center
        rounded-md py-2 text-sm font-medium
        transition-all duration-200
        bg-blue-600 text-white

        ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 active:scale-[0.98]"}
      `}
        >
            {isLoading ? <Spinner /> : text}
        </button>
    );
};

export default React.memo(AuthButton);
