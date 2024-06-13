import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LogList from "./components/LogList";
import { Container, Typography } from "@mui/material";

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setRefresh(!refresh);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Distributed Task Scheduler
      </Typography>
      <TaskForm onSuccess={handleSuccess} />
      <TaskList />
      <LogList />
    </Container>
  );
};

export default App;
