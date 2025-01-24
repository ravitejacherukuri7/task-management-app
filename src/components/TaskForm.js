import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField } from '@mui/material';
import { addTask } from '../features/tasksSlice';

const TaskForm = ({ dispatch }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      dispatch(addTask({ id: uuidv4(), title, description, dueDate, priority, completed: false }));
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default TaskForm;