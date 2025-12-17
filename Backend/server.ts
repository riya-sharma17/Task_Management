// import express from "express";
// import * as dotenv from "dotenv";
// import cors from "cors";
// import http from "http";
// import { connectDB } from "./src/databases/connection";
// import { App } from "./src/app";
// import { initSocket } from "./src/sockets";

// dotenv.config();

// const port = Number(process.env.PORT) || 4002;
// const base_url = process.env.BASE_URL || "";

// const myApp = new App(port, base_url);
// const app = myApp.app;

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));

// const server = http.createServer(app);

// const startServer = async () => {
//   try {
//     await connectDB();
//     await myApp.initialize();

//     initSocket(server);

//     server.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//     });
//   } catch (err) {
//     console.error(" Server startup failed:", err);
//     process.exit(1);
//   }
// };

// startServer();


import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { connectDB } from "./src/databases/connection";
import { App } from "./src/app";
import { initSocket } from "./src/sockets";

dotenv.config();

const port = Number(process.env.PORT) || 4002;
const base_url = process.env.BASE_URL || "";



const myApp = new App(port, base_url);
const app = myApp.app;

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Collaborative Task Manager API is running",
    env: process.env.NODE_ENV || "production",
  });
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    await myApp.initialize();

    initSocket(server);

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
};

startServer();
