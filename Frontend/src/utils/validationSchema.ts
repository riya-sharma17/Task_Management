import * as Yup from "yup";
import { TaskPriority, TaskStatus } from "./enum";


export const registerSchema = Yup.object({
    name: Yup.string()
        .min(2, "Name is too short")
        .required("Name is required"),


    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),


    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export const loginSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export const updateProfileSchema = Yup.object({
    name: Yup.string()
        .min(2, "Name is too short")
        .required("Name is required"),


    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
});

export const taskValidationSchema = Yup.object({
    title: Yup.string()
        .trim()
        .max(100, "Title must be at most 100 characters")
        .required("Title is required"),

    description: Yup.string()
        .trim()
        .optional(),

    dueDate: Yup.date()
        .required("Due date is required")
        .min(
            new Date(new Date().setHours(0, 0, 0, 0)),
            "Due date cannot be in the past"
        ),

    priority: Yup.mixed<TaskPriority>()
        .oneOf(Object.values(TaskPriority), "Invalid priority")
        .optional(),

    status: Yup.mixed<TaskStatus>()
        .oneOf(Object.values(TaskStatus), "Invalid status")
        .optional(),

    assignedToId: Yup.string()
        .required("Please select a user"),
});
export const updateTaskValidationSchema = Yup.object({
    title: Yup.string()
        .trim()
        .max(100, "Title must be at most 100 characters")
        .required("Title is required"),

    description: Yup.string()
        .trim()
        .required("Description is required"),

    dueDate: Yup.date()
        .required("Due date is required"),

    priority: Yup.mixed<TaskPriority>()
        .oneOf(Object.values(TaskPriority), "Invalid priority")
        .required("Priority is required"),

    status: Yup.mixed<TaskStatus>()
        .oneOf(Object.values(TaskStatus), "Invalid status")
        .required("Status is required"),

    assignedToId: Yup.string()
        .required("Please select a user"),
});