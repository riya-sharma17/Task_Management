import React from "react";
import "./filterSelect.css";

type Option = {
    label: string;
    value: string;
};

type Props = {
    label: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
};

const FilterSelect: React.FC<Props> = ({
    label,
    value,
    options,
    onChange,
}) => {
    return (
        <div className="filter-select">
            <label className="filter-select-label">{label}</label>

            <select
                className="filter-select-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">All</option>

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterSelect;
