import { io } from "socket.io-client";

export const socket = io(
  "https://task-management-2-aad9.onrender.com",
  {
    withCredentials: true,
  }
);
