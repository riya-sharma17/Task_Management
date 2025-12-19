export const ENDPOINTS = {
    REGISTER: "/api/v1/user/signup",
    LOGIN: "/api/v1/user/login",
    ME: "/api/v1/user/me",
    LOGOUT: "/api/v1/user/logout",
    GET_USERS: "/api/v1/user/users",
    GET_TASKS: "/api/v1/task/get-tasks",
    CREATE_TASK: "/api/v1/task/create-task",
    UPDATE_TASK: (taskId: string) => `/api/v1/task/${taskId}`,
    DELETE_TASK: (taskId: string) => `/api/v1/task/${taskId}`,
    UPDATED_PROFILE: "/api/v1/user/profile",
}