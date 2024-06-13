import React, { useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LogList from "./components/LogList";
import { Task } from "./types";

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleSuccess = () => {
    setRefresh(!refresh);
    setSelectedTask(null);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Distributed Task Scheduler
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TaskForm task={selectedTask} onSuccess={handleSuccess} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TaskList refresh={refresh} onEdit={handleEdit} />
        </Grid>
        <Grid item xs={12} md={4}>
          <LogList refresh={refresh} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
