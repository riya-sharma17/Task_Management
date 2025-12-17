"use strict";
// import express from "express";
// import * as dotenv from "dotenv";
// import cors from "cors";
// import http from "http";
// import { connectDB } from "./src/databases/connection";
// import { App } from "./src/app";
// import { initSocket } from "./src/sockets";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const connection_1 = require("./src/databases/connection");
const app_1 = require("./src/app");
const sockets_1 = require("./src/sockets");
dotenv.config();
const port = Number(process.env.PORT) || 4002;
const base_url = process.env.BASE_URL || "";
const myApp = new app_1.App(port, base_url);
const app = myApp.app;
app.set("trust proxy", 1);
app.use((0, cors_1.default)({
    origin: ["https://task-management-blue-ten.vercel.app", "https://task-management-system-frontend-ruby-seven.vercel.app/",
        "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", (0, cors_1.default)());
const server = http_1.default.createServer(app);
app.get("/health", (_req, res) => {
    res.status(200).send("ok-from-server-file");
});
const startServer = async () => {
    try {
        await (0, connection_1.connectDB)();
        await myApp.initialize();
        (0, sockets_1.initSocket)(server);
        server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
    catch (err) {
        console.error("Server startup failed:", err);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map