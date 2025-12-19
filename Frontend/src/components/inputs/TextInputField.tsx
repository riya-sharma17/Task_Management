import React from "react";

type TextInputFieldProps = {
    label: string;
    name: string;
    value: string;
    placeHolder?: string;
    required?: boolean;

    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    blurHandler?: (e: React.FocusEvent<HTMLInputElement>) => void;

    touched?: boolean;
    error?: string;
    errormessage?: string;

    disabled?: boolean;
};

const TextInputField: React.FC<TextInputFieldProps> = ({
    label,
    name,
    value,
    placeHolder,
    required = false,
    changeHandler,
    blurHandler,
    touched,
    error,
    errormessage,
    disabled = false,
}) => {
    const showError = touched && error;

    return (
        <div className="w-full">
            {/* Label */}
            <label
                htmlFor={name}
                className="mb-1.5 block text-sm font-medium text-gray-700"
            >
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>

            {/* Input */}
            <input
                id={name}
                name={name}
                type="text"
                value={value}
                placeholder={placeHolder}
                onChange={changeHandler}
                onBlur={blurHandler}
                disabled={disabled}
                className={`
          w-full
          rounded-lg
          border
          px-4
          py-2.5
          text-sm
          text-gray-900
          placeholder-gray-400
          focus:outline-none
          focus:ring-2
          transition
          ${showError
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    }
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
        `}
            />

            {/* Error */}
            {showError && (
                <p className="mt-1 text-xs text-red-500">{errormessage}</p>
            )}
        </div>
    );
};

export default React.memo(TextInputField);
