import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import taskRoutes from './routes/task';
import logRoutes from './routes/log';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/logs', logRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/taskScheduler');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
