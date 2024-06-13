import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LogList from "./components/LogList";

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Distributed Task Scheduler</h1>
      <TaskForm onSuccess={handleSuccess} />
      <TaskList />
      <LogList />
    </div>
  );
};

export default App;
