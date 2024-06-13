import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import { createTask, updateTask } from "../services/api";
import { Task } from "../types";

interface TaskFormProps {
  task: Task | null;
  onSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [cron, setCron] = useState("");

  useEffect(() => {
    setTitle(task?.title || "");
    setTime(task?.time || "");
    setCron(task?.cron || "");
  }, [task]);

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
    <Container>
      <Typography variant="h4">
        {task ? "Update Task" : "Create Task"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Time"
              type="datetime-local"
              fullWidth
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required={!cron}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Cron"
              fullWidth
              value={cron}
              onChange={(e) => setCron(e.target.value)}
              required={!time}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {task ? "Update" : "Create"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TaskForm;
