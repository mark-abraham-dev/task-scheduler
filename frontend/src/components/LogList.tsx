import React, { useEffect, useState } from "react";
import { getLogs } from "../services/api";
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
} from "@mui/material";

interface Log {
  _id: string;
  taskId: string;
  executionTime: string;
}

const LogList: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const response = await getLogs();
    setLogs(response.data);
  };

  return (
    <Container>
      <Typography variant="h4">Execution Logs</Typography>
      <List>
        {logs.map((log) => (
          <ListItem key={log._id}>
            <ListItemText
              primary={`Task ID: ${log.taskId}`}
              secondary={`Executed at: ${log.executionTime}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default LogList;
