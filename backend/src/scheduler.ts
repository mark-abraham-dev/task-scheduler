import cron from 'node-cron';
import dotenv from "dotenv";
import { Task } from './models/Task';
import { Log } from './models/Log';

dotenv.config();

const TIME_INTERVAL = Number(process.env.TIME_INTERVAL!);

const executeTask = async (task: any) => {
    const executionTime = new Date().toISOString();
    const log = new Log({ taskId: task._id, executionTime });
    await log.save();
};

const scheduleTasks = async () => {
    const tasks = await Task.find();
    tasks.forEach((task) => {
        if (task.time) {
            const executionDate = new Date(task.time);
            const now = new Date();
            if (executionDate > now && executionDate <= new Date(now.getTime() + TIME_INTERVAL)) {
                setTimeout(() => executeTask(task), executionDate.getTime() - now.getTime());
            }
        }
        if (task.cron) {
            cron.schedule(task.cron, () => executeTask(task));
        }
    });
};

export const runTaskScheduler = async () => {
    console.log("Scheduler is running");
    const taskInterval = setInterval(scheduleTasks, TIME_INTERVAL);
    return () => clearInterval(taskInterval);
}
