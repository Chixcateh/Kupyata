
import express from "express";
import dotenv from "dotenv";
dotenv.config()
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import{ connectDB } from "./libs/db.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { app,server} from "./libs/socket.js";




const PORT = process.env.PORT || 5001;
const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../front/dist"))); 
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front", "dist", "index.html"));
  });
}


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB()
});