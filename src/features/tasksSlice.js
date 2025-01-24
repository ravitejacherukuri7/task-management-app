import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex(task => task.id === id);
      state.tasks[index] = { ...state.tasks[index], ...updatedTask };
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      const newTasks = state.tasks.filter(task => task.id !== action.payload);
      state.tasks = newTasks;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, editTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;