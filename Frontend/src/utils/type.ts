export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Status = "To Do" | "In Progress" | "Review" | "Completed";

export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}


export interface UserRef {
    _id: string;
    name: string;
    email: string;
}

export interface Task {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: Priority;
    status: Status;
    creatorId: UserRef;
    assignedToId: UserRef;
    createdAt: string;
    updatedAt: string;
}


export type CreateTaskPayload = {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    assignedToId: string;
};

export type UpdateTaskPayload = {
    taskId: string;
    data: Partial<CreateTaskPayload>;
};

export type UpdateProfileDetails = {
    email?: string;
    name?: string;
}

export type Notification = {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    creatorId: string;
    assignedToId: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    read: boolean;
};

export type TaskNotificationResponse = {
    message: string;
    task: Notification;
};