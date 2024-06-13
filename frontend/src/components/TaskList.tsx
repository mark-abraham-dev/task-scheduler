import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { getTasks, deleteTask } from "../services/api";
import { Task } from "../types";

interface TaskListProps {
  refresh: boolean;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ refresh, onEdit }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <Container>
      <Typography variant="h4">Scheduled Tasks</Typography>
      <Paper style={{ maxHeight: 400, overflow: "auto" }}>
        <List>
          {tasks.map((task) => (
            <ListItem key={task._id}>
              <ListItemText
                primary={`${task.title} (${task.type})`}
                secondary={`${task.time || task.cron} | ${task.status}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => onEdit(task)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(task._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TaskList;
