// import { io, Socket } from "socket.io-client";
// import { BASEURL } from "../api/axios";

// // const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// export const socket: Socket = io(BASEURL, {
//     withCredentials: true,
//     autoConnect: false,
// });


// import { io, Socket } from "socket.io-client";
// import { BASEURL } from "../api/axios";

// let socket: Socket;

// export const initSocket = (userId: string) => {
//     socket = io(BASEURL, {
//         withCredentials: true,
//     });

//     socket.on("connect", () => {
//         console.log("Socket connected:", socket.id);
//         socket.emit("join", userId);
//     });

//     return socket;
// };

// export const getSocket = () => socket;

// import { io, Socket } from "socket.io-client";
// import { BASEURL } from "../api/axios";

// let socket: Socket | null = null;

// export const connectSocket = (userId: string) => {
//     if (socket) return socket;

//     socket = io(BASEURL, {
//         withCredentials: true,
//         transports: ["websocket"],
//     });

//     socket.on("connect", () => {
//         console.log("✅ Socket connected:", socket?.id);
//         socket?.emit("join", userId);
//     });

//     socket.on("disconnect", () => {
//         console.log("❌ Socket disconnected");
//     });

//     return socket;
// };

// export const disconnectSocket = () => {
//     if (socket) {
//         socket.disconnect();
//         socket = null;
//     }
// };

// export const getSocket = () => socket;


import { io, Socket } from "socket.io-client";
import { BASEURL } from "../api/axios";

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
    if (socket) return socket;

    socket = io(BASEURL, {
        withCredentials: true,
        transports: ["websocket"],
    });

    socket.on("connect", () => {
        console.log("✅ Socket connected:", socket?.id);
        socket?.emit("join", userId);
    });

    socket.on("disconnect", () => {
        console.log("❌ Socket disconnected");
    });

    socket.on("connect_error", (err) => {
        console.error("🚨 Socket connection error:", err.message);
    });

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

