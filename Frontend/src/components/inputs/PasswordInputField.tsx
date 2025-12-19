import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = {
    label: string;
    name: string;
    value: string;
    placeHolder?: string;
    required?: boolean;

    error?: string;
    touched?: boolean;
    errormessage?: string;

    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    blurHandler?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const PasswordInputField = ({
    label,
    name,
    value,
    placeHolder,
    required = false,

    error,
    touched,
    errormessage,

    changeHandler,
    blurHandler,
}: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const showError = Boolean(touched && error);

    return (
        <div className="flex flex-col gap-1">
            {/* Label */}
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {/* Input Wrapper */}
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    value={value}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeHolder}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    aria-invalid={showError}
                    aria-describedby={`${name}-error`}
                    className={`
            w-full rounded-md border px-3 py-2 pr-10 text-sm outline-none
            transition-all duration-200
            ${showError
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        }
          `}
                />

                {/* Eye Icon */}
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
            </div>

            {/* Error Message */}
            {showError && (
                <p id={`${name}-error`} className="text-xs text-red-500">
                    {errormessage}
                </p>
            )}
        </div>
    );
};

export default PasswordInputField;
