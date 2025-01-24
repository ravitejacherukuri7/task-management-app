import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, editTask, deleteTask } from '../features/tasksSlice';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Container, Typography, Box } from '@mui/material';

const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || task.priority === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Container className="container">
      <Typography variant="h4" className="title">Task Dashboard</Typography>
      <TaskForm dispatch={dispatch} />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <Box className="task-list">
        <h2>Upcoming Tasks</h2>
        <TaskList tasks={filteredTasks.filter(task => !task.completed)} dispatch={dispatch} />
        <h2>Completed Tasks</h2>
        <TaskList tasks={filteredTasks.filter(task => task.completed)} dispatch={dispatch} />
      </Box>
    </Container>
  );
};

export default Dashboard;