import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Checkbox, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';

interface Task {
  _id: string;
  title: string;
  startTime: string;
  endTime: string;
  priority: number;
  status: string;
}

const TaskTable: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    _id: '',
    title: '',
    startTime: '',
    endTime: '',
    priority: 1,
    status: 'pending',
  });
  const [sortField, setSortField] = useState<string>('priority');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://hd-phi.vercel.app/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = tasks.map((task) => task._id);
      setSelectedTasks(newSelecteds);
      return;
    }
    setSelectedTasks([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selectedTasks.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedTasks, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedTasks.slice(1));
    } else if (selectedIndex === selectedTasks.length - 1) {
      newSelected = newSelected.concat(selectedTasks.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedTasks.slice(0, selectedIndex),
        selectedTasks.slice(selectedIndex + 1),
      );
    }

    setSelectedTasks(newSelected);
  };

  const handleAddTask = () => {
    setNewTask({
      _id: '',
      title: '',
      startTime: '',
      endTime: '',
      priority: 1,
      status: 'pending',
    });
    setOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setNewTask(task);
    setOpen(true);
  };

  const handleDeleteTasks = async () => {
    try {
      await Promise.all(selectedTasks.map(id => axios.delete(`https://hd-phi.vercel.app/tasks/${id}`)));
      fetchTasks();
      setSelectedTasks([]);
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }
  };

  const handleSaveTask = async () => {
    try {
      if (newTask._id) {
        await axios.put(`https://hd-phi.vercel.app/tasks/${newTask._id}`, newTask);
      } else {
        await axios.post('https://hd-phi.vercel.app/tasks', newTask);
      }
      fetchTasks();
      setOpen(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<number | string>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name as string]: name === 'priority' ? Number(value) : value });
  };

  const handleSortChange = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const handleFilterChange = (e: SelectChangeEvent<string>) => {
    setFilterStatus(e.target.value);
  };

  const isSelected = (id: string) => selectedTasks.indexOf(id) !== -1;

  const filteredTasks = tasks.filter(task => filterStatus === 'all' || task.status === filterStatus);
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortField === 'priority') {
      return sortOrder === 'asc' ? a.priority - b.priority : b.priority - a.priority;
    } else if (sortField === 'startTime') {
      return sortOrder === 'asc' ? new Date(a.startTime).getTime() - new Date(b.startTime).getTime() : new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
    } else if (sortField === 'endTime') {
      return sortOrder === 'asc' ? new Date(a.endTime).getTime() - new Date(b.endTime).getTime() : new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
    }
    return 0;
  });

  const currentDateTime = new Date().toISOString().slice(0, 16); 

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar position="static" sx={{ backgroundColor: '#3a2449' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Task Management
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigate('/welcome')}
            sx={{
              background: 'white',
              color: '#3a2449',
              textTransform: 'none',
            }}
          >
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Box className="container mx-auto flex flex-col flex-1" sx={{ mt: 4, padding: 8 }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box>
            <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ mr: 2, mb: 2 }}>
              Add Task
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDeleteTasks} disabled={selectedTasks.length === 0} sx={{ mb: 2 }}>
              Delete Task
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" onClick={() => handleSortChange('startTime')} sx={{ mr: 2, mb: 2 }}>
              Sort by Start Time
            </Button>
            <Button variant="contained" onClick={() => handleSortChange('endTime')} sx={{ mr: 2, mb: 2 }}>
              Sort by End Time
            </Button>
            <FormControl sx={{ width: '200px', ml: 2, mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="finished">Finished</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Paper sx={{ width: '100%', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedTasks.length > 0 && selectedTasks.length < tasks.length}
                    checked={tasks.length > 0 && selectedTasks.length === tasks.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#6458f7' }}>Task ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#6458f7' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#6458f7' }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#6458f7' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#6458f7' }}>Start Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#6458f7' }}>End Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#6458f7' }}>Total Time to Finish (hrs)</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#6458f7' }}>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTasks.map((task, index) => {
                const isItemSelected = isSelected(task._id);
                const labelId = `enhanced-table-checkbox-${task._id}`;
                const totalTimeToFinish = (new Date(task.endTime).getTime() - new Date(task.startTime).getTime()) / (1000 * 60 * 60);

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, task._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={task._id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{new Date(task.startTime).toLocaleString()}</TableCell>
                    <TableCell>{new Date(task.endTime).toLocaleString()}</TableCell>
                    <TableCell>{totalTimeToFinish.toFixed(2)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditTask(task)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{newTask._id ? 'Edit Task' : 'Add Task'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Start Time"
            name="startTime"
            type="datetime-local"
            value={newTask.startTime}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: currentDateTime }} 
          />
          <TextField
            label="End Time"
            name="endTime"
            type="datetime-local"
            value={newTask.endTime}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={newTask.priority}
              onChange={handleSelectChange}
            >
              {[1, 2, 3, 4, 5].map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={newTask.status}
              onChange={handleSelectChange}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="finished">Finished</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskTable;