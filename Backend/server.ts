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

app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["https://task-management-4z6g.vercel.app/",
      "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
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
