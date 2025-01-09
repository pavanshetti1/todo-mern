//imports
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import todoRoute from "./routes/todoRoute.js";
import userRoute from "./routes/userRoute.js";
const app = express();
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';

dotenv.config();
const PORT  = process.env.PORT || 4002;

//database connection
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to mogodb");
} catch (error) {
    console.log(error)
}


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-type", "Authorization"]
}))

// routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

if(process.env.NODE_ENV === "production"){
    const dirPath = path.resolve();
    app.use(express.static("frontend/dist"));
    app.get("*", (req, res) =>{
        res.sendFile(path.resolve(dirPath, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}` );
})