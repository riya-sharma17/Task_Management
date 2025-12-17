import express, { Application } from "express";
import cookieParser from "cookie-parser";
import {Request, Response} from 'express';
import routev1 from "./routes/routev1";

export class App {
  public app: Application;
  public port: string | number;
  public base_url: string;

  constructor(port: string | number, base_url: string) {
    this.app = express();
    this.port = port;
    this.base_url = base_url;
  }

  public async initialize(): Promise<void> {
    try {
      this.initializeMiddlewares();
      this.initializeRoutes();
    } catch (error) {
      console.log("Server Initialization error:", error);
    }
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(): void {
    this.app.get('/', (req: Request, res: Response)=>{
       res.status(200).json({
        message: "Collaborative Task Manager API is running"
       })
       
    })
    this.app.use("/api/v1", routev1);
  }
}
