import React from 'react';
import TaskItem from './TaskItem';
import { List } from '@mui/material';

const TaskList = ({ tasks, dispatch }) => {
  return (
    <List>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} dispatch={dispatch} />
      ))}
    </List>
  );
};

export default TaskList;