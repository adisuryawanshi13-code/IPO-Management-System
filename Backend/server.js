import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";

// FORCE correct env path
dotenv.config({ path: "./.env" });
console.log("JWT_SECRET =", process.env.JWT_SECRET);


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

