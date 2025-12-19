import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { useUsers } from "../../hooks/userUsers";
import type { User } from "../../utils/type";
import "./style.css";

type Props = {
    value?: string;
    onChange: (userId: string) => void;
    label?: string;
    placeholder?: string;
    disable?: boolean;
};

const UserSelectDropdown: React.FC<Props> = ({
    value,
    onChange,
    label = "Assign To",
    placeholder = "Select user",
    disable = false
}) => {
    const { data: users, isLoading } = useUsers();

    return (
        <div className="user-select">
            {label && <label className="user-select-label">{label}</label>}

            <div className="relative">
                <select
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disable}
                    className={`user-select-input ${disable ? "user-select-disabled" : ""}`}
                >
                    <option value="" disabled>
                        {isLoading ? "Loading users..." : placeholder}
                    </option>

                    {users?.map((user: User) => (
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option>
                    ))}
                </select>

                <FiChevronDown className="user-select-icon" />
            </div>
        </div>
    );
};

export default React.memo(UserSelectDropdown);
