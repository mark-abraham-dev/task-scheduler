import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from "./routes/task";
import logRoutes from "./routes/log";
import { scheduleTasks } from "./controllers/scheduler";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT!);

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/logs", logRoutes);
app.use("/schedule", scheduleTasks);

mongoose.connect(process.env.MONGO_URI!);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
