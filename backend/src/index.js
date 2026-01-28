import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import authRouter from './routes/auth.route.js'
import eventRouter  from './routes/event.route.js'

import cors from 'cors';
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();

const port = process.env.PORT


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use("/api/auth/",  authRouter);
app.use("/api/categories/",  eventRouter);






app.listen(port,(req,res)=>{

    console.log("server is running at ",port);
    connectDB();
})

 