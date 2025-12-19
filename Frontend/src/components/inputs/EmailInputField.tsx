import React from "react";

type Props = {
    label: string;
    name: string;
    value: string;
    placeHolder?: string;
    type?: React.HTMLInputTypeAttribute;
    required?: boolean;

    error?: string;
    touched?: boolean;
    errormessage?: string;

    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    blurHandler?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const EmailInputField = ({
    label,
    name,
    value,
    placeHolder,
    type = "text",
    required = false,

    error,
    touched,
    errormessage,

    changeHandler,
    blurHandler,
}: Props) => {
    const showError = Boolean(touched && error);

    return (
        <div className="flex flex-col gap-1">
            {/* Label */}
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {/* Input */}
            <input
                id={name}
                name={name}
                value={value}
                type={type}
                placeholder={placeHolder}
                onChange={changeHandler}
                onBlur={blurHandler}
                aria-invalid={showError}
                aria-describedby={`${name}-error`}
                className={`
          w-full rounded-md border px-3 py-2 text-sm outline-none
          transition-all duration-200
          ${showError
                        ? "border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    }
        `}
            />

            {/* Error Message */}
            {showError && (
                <p id={`${name}-error`} className="text-xs text-red-500">
                    {errormessage}
                </p>
            )}
        </div>
    );
};

export default EmailInputField;
