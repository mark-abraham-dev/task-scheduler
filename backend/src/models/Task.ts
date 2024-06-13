import { Schema, model, Document } from 'mongoose';

interface ITask extends Document {
    title: string;
    type: string;
    time?: string;
    cron?: string;
}

const taskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    type: { type: String, required: true },
    time: { type: String },
    cron: { type: String },
});

export const Task = model<ITask>('Task', taskSchema);
