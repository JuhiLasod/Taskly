import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from "./Routes/authRoutes.js";

const app=express();
// app.use(cors());
app.use(cors({
    origin: "https://taskly-3k4r.onrender.com", // match your frontend Render URL
    credentials: true
  }));
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("API running");
})
dotenv.config();
mongoose.connect(process.env.MONGO_URI)

    .then(()=>{console.log("db connected")})
    .catch(()=>{console.log("error while connecting to db")});
    // console.log(process.env.MONGO_URI);
app.use("/api/auth",authRoutes);
app.listen(process.env.PORT || 8000,()=>{
    console.log("server running on",process.env.PORT);
});
