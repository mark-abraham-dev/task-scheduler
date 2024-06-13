import React, { useState } from "react";
import { createTask, updateTask } from "../services/api";

interface TaskFormProps {
  task?: any;
  onSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [time, setTime] = useState(task?.time || "");
  const [cron, setCron] = useState(task?.cron || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = { title, time, cron };
    if (task) {
      await updateTask(task._id, newTask);
    } else {
      await createTask(newTask);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Time</label>
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required={!cron}
        />
      </div>
      <div>
        <label>Cron</label>
        <input
          type="text"
          value={cron}
          onChange={(e) => setCron(e.target.value)}
          required={!time}
        />
      </div>
      <button type="submit">{task ? "Update" : "Create"}</button>
    </form>
  );
};

export default TaskForm;
