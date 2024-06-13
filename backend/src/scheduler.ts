import { Task } from './models/Task';
import { Log } from './models/Log';
import cron from 'node-cron';

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
            if (executionDate > now && executionDate <= new Date(now.getTime() + 10000)) {
                setTimeout(() => executeTask(task), executionDate.getTime() - now.getTime());
            }
        }
        if (task.cron) {
            cron.schedule(task.cron, () => executeTask(task));
        }
    });
};

scheduleTasks();
setInterval(scheduleTasks, 10000); // Check for due tasks every 10 seconds
