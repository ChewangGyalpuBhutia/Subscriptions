import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, TextField, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemText, SelectChangeEvent, Table, TableBody, TableCell, TableHead, TableRow, Paper, Card, CardContent, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface Task {
  _id: string;
  title: string;
  startTime: string;
  endTime: string;
  priority: number;
  status: string;
}

interface DashboardSummary {
  totalCount: number;
  completedPercentage: number;
  pendingCount: number;
  averageActualTime: number;
  pendingTaskSummary: {
    priority: number;
    title: string;
    timeLapsed: number;
    timeToFinish: number;
    status: string;
  }[];
}

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || { email: '' };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    _id: '',
    title: '',
    startTime: '',
    endTime: '',
    priority: 1,
    status: 'pending',
  });
  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary | null>(null);
  const [sortField, setSortField] = useState<string>('priority');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    fetchDashboardSummary();
  }, []);

  const fetchDashboardSummary = async () => {
    try {
      // const response = await axios.get('http://localhost:3000/tasks/dashboard');  await axios.get(`${apiUrl}/tasks/dashboard`);
      const response = await axios.get('https://hd-phi.vercel.app/tasks/dashboard');
      setDashboardSummary(response.data);
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
    }
  };

  const handleSignOut = () => {
    navigate('/login');
  };

  const groupTasksByPriority = (tasks: DashboardSummary['pendingTaskSummary']) => {
    const groupedTasks: { [key: number]: DashboardSummary['pendingTaskSummary'] } = {};
    tasks.forEach(task => {
      if (!groupedTasks[task.priority]) {
        groupedTasks[task.priority] = [];
      }
      groupedTasks[task.priority].push(task);
    });
    return groupedTasks;
  };

  const filteredTasks = dashboardSummary?.pendingTaskSummary.filter(task => filterStatus === 'all' || task.status === filterStatus) || [];
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortField === 'priority') {
      return sortOrder === 'asc' ? a.priority - b.priority : b.priority - a.priority;
    } else if (sortField === 'timeLapsed') {
      return sortOrder === 'asc' ? a.timeLapsed - b.timeLapsed : b.timeLapsed - a.timeLapsed;
    } else if (sortField === 'timeToFinish') {
      return sortOrder === 'asc' ? a.timeToFinish - b.timeToFinish : b.timeToFinish - a.timeToFinish;
    }
    return 0;
  });

  const totalPendingTasks = filteredTasks.length;
  const totalTimeLapsed = filteredTasks.reduce((acc, task) => acc + task.timeLapsed, 0);
  const totalTimeToFinish = filteredTasks.reduce((acc, task) => acc + task.timeToFinish, 0);

  const tasksByPriority = groupTasksByPriority(filteredTasks);

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar position="static" sx={{ backgroundColor: '#3a2449' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigate('/task-table')}
            sx={{
              background: 'white',
              color: '#3a2449',
              textTransform: 'none',
            }}
          >
            Task List
          </Button>
        </Toolbar>
      </AppBar>
      <Box className="container mx-auto flex flex-col flex-1" sx={{ mt: 4, textAlign: 'center', padding: 4 }}>
        {dashboardSummary && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Summary</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Tasks</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#6458f7', }}>{dashboardSummary.totalCount}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Tasks Completed</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#6458f7', }}>{dashboardSummary && dashboardSummary.completedPercentage !== null ? dashboardSummary.completedPercentage.toFixed(2) : '0.00'}%</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Tasks Pending</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#6458f7', }}>{dashboardSummary.pendingCount}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Avg Time Completed</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#6458f7', }}>{dashboardSummary ? dashboardSummary.averageActualTime.toFixed(2) : '0.00'} hrs</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Pending Task Summary</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Number of Pending Tasks</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#6458f7', }}>{totalPendingTasks}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Time Lapsed</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#6458f7', }}>{(totalTimeLapsed ?? 0).toFixed(2)} hrs</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Time to Finish Estimate</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#6458f7', }}>{(totalTimeToFinish ?? 0).toFixed(2)} hrs</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Task Details by Priority</Typography>
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: '#6458f7', }}>Task Priority</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#6458f7', }}>Pending Task</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#6458f7', }}>Time Lapsed (hours)</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#6458f7', }}>Time to Finish (hours)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map(priority => {
                      const tasks = tasksByPriority[priority] || [];
                      const pendingTaskCount = tasks.length;
                      const timeLapsed = tasks.reduce((acc, task) => acc + task.timeLapsed, 0);
                      const timeToFinish = tasks.reduce((acc, task) => acc + task.timeToFinish, 0);

                      return (
                        <TableRow key={priority}>
                          <TableCell>{priority}</TableCell>
                          <TableCell>{pendingTaskCount}</TableCell>
                          <TableCell>
                            {timeLapsed ? timeLapsed.toFixed(2) : '0.00'}
                          </TableCell>
                          <TableCell>
                            {timeToFinish ? timeToFinish.toFixed(2) : '0.00'}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
          </Box>
        )}
      </Box>
      <Box sx={{ height: '80px', backgroundColor: '#3a2449', mt: 'auto' }} />
    </div>
  );
};

export default Welcome;