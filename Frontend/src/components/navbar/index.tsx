import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import CustomModal from "../modal";
import { LuUserPen } from "react-icons/lu";
import { IoNotificationsOutline, IoLogOutOutline } from "react-icons/io5";
import { useLogout } from "../../hooks/useLogout";
import TextInputField from "../inputs/TextInputField";
import { useFormik } from "formik";
import { updateProfileSchema } from "../../utils/validationSchema";
import EmailInputField from "../inputs/EmailInputField";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import { disconnectSocket, getSocket } from "../../utils/socket";
import type { Notification, TaskNotificationResponse } from "../../utils/type";

const priorityColors: Record<string, string> = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-orange-100 text-orange-700",
    Urgent: "bg-red-100 text-red-700",
};

const statusColors: Record<string, string> = {
    "To Do": "bg-gray-100 text-gray-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Review: "bg-purple-100 text-purple-700",
    Completed: "bg-emerald-100 text-emerald-700",
};


const Navbar = () => {
    const { name, email } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { mutate: logout } = useLogout();
    const updateInfo = useUpdateProfile();

    const [modal, setModal] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    /* -------------------------- SOCKET LISTENER -------------------------- */
    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        const handler = (data: TaskNotificationResponse) => {
            const task = { ...data.task, read: false };
            setNotifications((prev) => [task, ...prev]);
        };

        socket.on("task:assigned", handler);

        return () => {
            socket.off("task:assigned", handler);
        };
    }, []);

    /* -------------------------- CLOSE ON OUTSIDE CLICK -------------------------- */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpenNotifications(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((n) => ({ ...n, read: true }))
        );
    };

    const logoutHandler = () => {
        disconnectSocket();
        logout();
    };

    /* -------------------------- PROFILE FORM -------------------------- */
    const updateProfile = useFormik({
        initialValues: { name, email },
        validationSchema: updateProfileSchema,
        onSubmit: (value) => {
            updateInfo.mutate(value);
        },
    });

    /* -------------------------------- RENDER -------------------------------- */
    return (
        <>
            <nav className="px-10 py-3 flex justify-between items-center w-full bg-white border-b">
                <p className="text-sm font-medium">👋 Hi, {name}</p>

                <div className="flex gap-6 items-center relative">
                    {/* Notifications */}
                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="dropdown-icon-container relative cursor-pointer hover:bg-gray-200 transition"
                            onClick={() => setOpenNotifications((p) => !p)}
                        >
                            <IoNotificationsOutline className="icon" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[11px] font-semibold text-white bg-red-500 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </div>

                        {openNotifications && (
                            <div
                                className="
                                    fixed inset-0 z-50 
                                    flex items-end justify-center 
                                    sm:items-start sm:justify-end
                                    sm:static
                                "
                            >
                                {/* Backdrop (mobile only) */}
                                <div
                                    className="absolute inset-0 bg-black/30 sm:hidden"
                                    onClick={() => setOpenNotifications(false)}
                                />

                                {/* Notification Panel */}
                                <div
                                    className="
                                        relative
                                        w-full sm:w-[380px]
                                        max-h-[80vh] sm:max-h-[420px]
                                        bg-white
                                        rounded-t-2xl sm:rounded-xl
                                        shadow-xl border
                                        overflow-hidden
                                        sm:absolute sm:right-0 sm:mt-3
                                    "
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50">
                                        <p className="text-sm font-semibold text-gray-800">
                                            Notifications
                                        </p>

                                        {notifications.length > 0 && (
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                                            >
                                                Mark all read
                                            </button>
                                        )}
                                    </div>

                                    {/* Body */}
                                    {notifications.length === 0 ? (
                                        <div className="px-4 py-10 text-center text-sm text-gray-500">
                                            🎉 You’re all caught up
                                        </div>
                                    ) : (
                                        <ul className="overflow-y-auto divide-y max-h-[calc(80vh-56px)] sm:max-h-[360px]">
                                            {notifications.map((n) => (
                                                <li
                                                    key={n._id}
                                                    className={`px-4 py-3 transition hover:bg-gray-50 ${!n.read ? "bg-indigo-50/50" : "bg-white"
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-start gap-2">
                                                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                                            {n.title}
                                                        </p>

                                                        <span
                                                            className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${priorityColors[n.priority]}`}
                                                        >
                                                            {n.priority}
                                                        </span>
                                                    </div>

                                                    <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                                                        {n.description}
                                                    </p>

                                                    <div className="mt-2 flex justify-between items-center">
                                                        <span
                                                            className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${statusColors[n.status]}`}
                                                        >
                                                            {n.status}
                                                        </span>

                                                        <span className="text-[11px] text-gray-400">
                                                            Due: {new Date(n.dueDate).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* 👤 Profile */}
                    <div
                        className="dropdown-icon-container cursor-pointer"
                        onClick={() => setModal((p) => !p)}
                    >
                        <LuUserPen className="icon" />
                    </div>

                    {/* 🚪 Logout */}
                    <div
                        onClick={logoutHandler}
                        className="dropdown-icon-container cursor-pointer"
                    >
                        <IoLogOutOutline className="icon" />
                    </div>
                </div>
            </nav>

            {/* ------------------------- PROFILE MODAL ------------------------- */}
            <CustomModal
                open={modal}
                openHandler={() => setModal(false)}
                title="Profile Details"
                onSubmit={() => updateProfile.handleSubmit()}
                loading={false}
                submitButtonText="Save"
                submitButtonLoadingText="Saving"
            >
                <TextInputField
                    required
                    label="Name"
                    name="name"
                    value={updateProfile.values.name}
                    placeHolder="Enter your name"
                    changeHandler={updateProfile.handleChange}
                    blurHandler={updateProfile.handleBlur}
                    touched={updateProfile.touched.name}
                    error={updateProfile.errors.name}
                    errormessage={updateProfile.errors.name}
                />

                <EmailInputField
                    required
                    label="Email"
                    name="email"
                    value={updateProfile.values.email}
                    placeHolder="you@example.com"
                    changeHandler={updateProfile.handleChange}
                    blurHandler={updateProfile.handleBlur}
                    touched={updateProfile.touched.email}
                    error={updateProfile.errors.email}
                    errormessage={updateProfile.errors.email}
                />
            </CustomModal>
        </>
    );
};

export default React.memo(Navbar);
