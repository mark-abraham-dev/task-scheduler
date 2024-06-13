export interface Log {
    _id: string;
    taskId: string;
    executionTime: string;
}

export interface Task {
    _id: string;
    title: string;
    type: string;
    time: string;
    cron: string;
    status: string;
}
