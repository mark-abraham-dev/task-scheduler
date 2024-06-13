import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { createTask, updateTask } from "../services/api";
import { Task } from "../types";

interface TaskFormProps {
  task: Task | null;
  onSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [time, setTime] = useState("");
  const [cron, setCron] = useState("");

  useEffect(() => {
    setTitle(task?.title || "");
    setType(task?.type || "One-time");
    setTime(task?.time || "");
    setCron(task?.cron || "");
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = { title, type, time, cron };
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
        <FormControl sx={{ m: 3 }} variant="standard">
          <FormLabel id="task-type-radios">Task-Type</FormLabel>
          <RadioGroup
            aria-labelledby="task-type-radios"
            name="task-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <FormControlLabel
              value="One-time"
              control={<Radio />}
              label="One-time"
            />
            <FormControlLabel
              value="Recurring"
              control={<Radio />}
              label="Recurring"
            />
          </RadioGroup>
        </FormControl>
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
          {type === "One-time" && (
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
          )}
          {type === "Recurring" && (
            <Grid item xs={12}>
              <TextField
                label="Cron"
                fullWidth
                value={cron}
                onChange={(e) => setCron(e.target.value)}
                required={!time}
              />
            </Grid>
          )}
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
