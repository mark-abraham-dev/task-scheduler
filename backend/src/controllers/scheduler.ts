import cron from "node-cron";
import { Task } from "../models/Task";
import { Log } from "../models/Log";

const executeTask = async (task: any) => {
    const executionTime = new Date().toISOString();
    const log = new Log({ taskId: task._id, executionTime });
    await log.save();
};

export const scheduleTasks = async () => {
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
