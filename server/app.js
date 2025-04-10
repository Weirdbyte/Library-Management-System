import express from "express";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/db.js";
//import errormiddlewares
import { errorMiddleware } from "./middlewares/errorMiddlewares.js"
import authRouter from "./routes/authRouter.js";

config({path: "./config/config.env"});
export const app = express();

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        //this is arr of path of servers that u want to connect to backend
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1/auth",authRouter);//this is static uri
//i.e before the execution of any route in authRouter , /api/v1/auth will done first
//  http://localhost:4000/api/v1/auth/register 
//import db
connectDB();

//use errormiddleware at last
//it will not be automatically execute it will execute only if (next is called)
app.use(errorMiddleware);