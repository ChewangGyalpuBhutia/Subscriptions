import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignUpPicture from '../assets/SignUp.png';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/signup', { firstName, lastName, email, password });
      navigate('/verify-otp', { state: { email } });
    } catch (error) {
      setError('Error signing up');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className='flex items-center justify-end flex-1'>
        <div className="flex items-center justify-end" style={{ height: 550, width: 600 }}>
          <img src={SignUpPicture} alt="Sign Up" className="h-full" />
        </div>
      </div>
      <div className="flex items-center justify-end flex-1 bg-red-">
        <Paper elevation={3} sx={{ marginLeft: 20, marginRight: 20, padding: 4 }}>
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
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              sx={{ mt: 3, mb: 2, backgroundColor: '#3a2449', borderRadius: 3 }}
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