import { Schema, model, Document } from "mongoose";

interface ILog extends Document {
    taskId: string;
    executionTime: string;
}

const logSchema = new Schema<ILog>({
    taskId: { type: String, required: true },
    executionTime: { type: String, required: true },
});

export const Log = model<ILog>("Log", logSchema);
