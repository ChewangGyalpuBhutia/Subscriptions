import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state || { email: '', password: '' };

  const handleSignOut = () => {
    // Handle sign out logic, e.g., clear tokens, redirect to login
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar position="static" sx={{ backgroundColor: '#3a2449' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={handleSignOut}
            sx={{
              background: 'white',
              color: '#3a2449',
              textTransform: 'none',
            }}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Box className="container mx-auto flex flex-col flex-1" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4">Welcome, {email}!</Typography>
      </Box>
      <Box sx={{ height: '80px', backgroundColor: '#3a2449', mt: 'auto' }} />
    </div>
  );
};

export default Welcome;