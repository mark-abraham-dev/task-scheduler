import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust base URL as needed
});

export const getTasks = () => api.get('/tasks');
export const createTask = (task: any) => api.post('/tasks', task);
export const updateTask = (id: string, task: any) => api.put(`/tasks/${id}`, task);
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);
export const getLogs = () => api.get('/logs');
