import React, { useState } from 'react';
import { ListItem, ListItemText, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { editTask, deleteTask } from '../features/tasksSlice';

const TaskItem = ({ task, dispatch }) => {
  const [open, setOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState({ title: task.title, description: task.description, dueDate: task.dueDate, priority: task.priority });

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggleComplete = () => {
    dispatch(editTask({ id: task.id, updatedTask: { completed: !task.completed } }));
  };

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTaskData({ ...editTaskData, [name]: value });
  };

  const handleEditSubmit = () => {
    dispatch(editTask({ id: task.id, updatedTask: editTaskData }));
    setOpen(false);
  };

  return (
    <>
      <ListItem className="task-item">
        <ListItemText
          primary={task.title}
          secondary={`${task.description} (Due: ${task.dueDate}) - Priority: ${task.priority}`}
        />
        <Button onClick={handleToggleComplete}>
          {task.completed ? 'Undo' : 'Complete'}
        </Button>
        <Button onClick={handleEditClick}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </ListItem>

      {/* Edit Task Dialog */}
      <Dialog open={open} onClose={handleEditClose}>
        <DialogTitle className="dialog-title">Edit Task</DialogTitle>
        <DialogContent className="dialog-content">
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            value={editTaskData.title}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            value={editTaskData.description}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="dueDate"
            label="Due Date"
            type="date"
            value={editTaskData.dueDate}
            onChange={handleEditChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="priority"
            label="Priority"
            type="text"
            value={editTaskData.priority}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;