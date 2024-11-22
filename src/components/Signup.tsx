import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignUpPicture from '../assets/SignUp.png';
import { TextField, Button, Container, Typography, Box, Grid, Paper } from '@mui/material';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('/signup', { email, password });
      navigate('/verify-otp', { state: { email } });
    } catch (error) {
      setError('Error signing up');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="w-full md:w-1/2 p-4">
        <img src={SignUpPicture} alt="Sign Up" className="w-full h-auto" />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <Paper elevation={3} sx={{ padding: 4 }}>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1 '>
              <h1 className='font-extrabold text-3xl' style={{ color: '#3a2449', }}>Let us know </h1>
              <h1 className='font-extrabold text-3xl' style={{ color: '#d62637' }}>!</h1>
            </div>
            <div className='flex items-center gap-1 underline'>
              <h1 className='font-bold text-lg' style={{ color: '#3a2449', }}>Sign</h1>
              <h1 className='font-bold text-lg' style={{ color: '#d62637' }}>in</h1>
            </div>
          </div>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField variant="standard"
              margin="normal"
              required
              fullWidth
              id="First Name"
              label="First Name"
              name="First Name"
              autoComplete="First Name"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default Signup;