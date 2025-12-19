import React from "react";
import { FiChevronDown } from "react-icons/fi";
import "./style.css"

type Option = {
    label: string;
    value: string;
};

type Props = {
    label: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
    placeholder?: string;
    disable?: boolean;
};

const SelectDropdown: React.FC<Props> = ({
    label,
    value,
    options,
    onChange,
    placeholder = "Select option",
    disable = false
}) => {
    return (
        <div className="user-select">
            <label className="user-select-label">{label}</label>

            <div className="relative">
                <select
                    className={`user-select-input ${disable ? "user-select-disabled" : ""}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disable}

                >
                    <option value="" disabled>
                        {placeholder}
                    </option>

                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <FiChevronDown className="user-select-icon" />
            </div>
        </div>
    );
};

export default React.memo(SelectDropdown);
