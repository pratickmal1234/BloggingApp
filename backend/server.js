import express from "express";
import dotenv from "dotenv/config";
import cookieParser from "cookie-parser";
import { dbConnect } from "./src/config/dbConnect.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRout from "./src/ruotes/userRout.js";
import blogRout from "./src/ruotes/bloggingRout.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.port;

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// 🔥 THIS LINE FIXES IMAGE ISSUE
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use("/user", userRout);
app.use("/blog", blogRout);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});