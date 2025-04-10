import express from "express";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/db.js";
//import errormiddlewares
import { errorMiddleware } from "./middlewares/errorMiddlewares.js"

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

//import db
connectDB();

//use errormiddleware at last
//it will not be automatically execute it will execute only if (next is called)
app.use(errorMiddleware);