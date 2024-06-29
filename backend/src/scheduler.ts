import cron from "node-cron";
import dotenv from "dotenv";
import { Task } from "./models/Task";
import { Log } from "./models/Log";

dotenv.config();

const TIME_INTERVAL = Number(process.env.TIME_INTERVAL!);

const executeTask = async (task: any) => {
    const executionTime = new Date().toISOString();
    const log = new Log({ taskId: task._id, executionTime });
    await log.save();
};

const scheduleTasks = async () => {
    const tasks = await Task.find({ status: "Pending" });
    tasks.forEach(async (task) => {
        if (task.time) {
            const executionDate = new Date(task.time);
            const cronTime = `${executionDate.getSeconds()} ${executionDate.getMinutes()} ${executionDate.getHours()} ${executionDate.getDate()} ${executionDate.getMonth() + 1} *`;
            if (executionDate > new Date()) {
                await Task.findByIdAndUpdate({ _id: task._id }, { status: "Scheduled" });
                cron.schedule(cronTime, async () => {
                    await executeTask(task);
                    await Task.findByIdAndUpdate({ _id: task._id }, { status: "Expired" });
                });
            } else {
                await Task.findByIdAndUpdate({ _id: task._id }, { status: "Expired" });
            }
        }
        if (task.cron) {
            await Task.findByIdAndUpdate({ _id: task._id }, { status: "Scheduled" });
            cron.schedule(task.cron, () => executeTask(task));
        }
    });
};

export const runTaskScheduler = () => {
    console.log("Scheduler is running");
    const taskInterval = setInterval(scheduleTasks, TIME_INTERVAL);
    return () => clearInterval(taskInterval);
}
