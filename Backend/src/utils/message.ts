export const SUCCESS_RESPONSE = {
  // Auth
  USER_REGISTERED: "User registered successfully",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  PROFILE_FETCHED: "Profile fetched successfully",
  PROFILE_UPDATED: "Profile updated successfully",

  // Users
  USERS_FETCHED: "Users fetched successfully",

  // Tasks
  TASK_CREATED: "Task created successfully",
  TASK_UPDATED: "Task updated successfully",
  TASK_DELETED: "Task deleted successfully",
  TASK_FETCHED: "Task fetched successfully",
  TASKS_FETCHED: "Tasks fetched successfully",
  TASK_ASSIGNED: "Task assigned successfully",
};

export const ERROR_RESPONSE = {
  // Auth
  EMAIL_ALREADY_REGISTERED: "Email already registered",
  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED: "Unauthorized access",
  TOKEN_EXPIRED: "Session expired, please login again",

  // Users
  USER_NOT_FOUND: "User not found",
  EMAIL_NOT_EXISTS: "email not exists, please register first",
  INCORRECT_PASSWORD: "Incorrect password, please try again",

  // Tasks
  TASK_NOT_FOUND: "Task not found",
  INVALID_TASK_DATA: "Invalid task data",
  DUE_DATE_PAST: "Due date must be in the future",
  ASSIGNEE_NOT_FOUND: "Assigned user does not exist",
  NOT_TASK_CREATOR: "You are not allowed to perform this action",
  ONLY_ASSIGNE: "Only assignee can update task status",
  ONLY_CREATOR: "Only creator can update task priority",
   CREATOR_REASSIGN: "Only creator can reassign task",

  // Common
  BAD_REQUEST: "Bad request",
  SERVER_ERROR: "Internal server error",
};
