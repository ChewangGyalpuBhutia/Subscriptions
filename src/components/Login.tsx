import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignUpPicture from '../assets/SignIn.png';
import { TextField, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { email, password });
      // Handle successful login, e.g., store token, redirect to dashboard
      navigate('/welcome'); // Example redirect after successful login
    } catch (error) {
      setError('Error logging in');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="hidden lg:flex items-center justify-end flex-1">
        <div className="signup-image-container flex items-center justify-end rounded-lg">
          <img src={SignUpPicture} alt="Sign Up" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 md:m-4">
        <div className="signup-container border">
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-1'>
            <h1 className='font-extrabold text-3xl' style={{ color: '#3a2449' }}>Let us know </h1>
            <h1 className='font-extrabold text-3xl' style={{ color: '#d62637' }}>!</h1>
            </div>
          </div>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              variant="standard"
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
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#3a2449',
                borderRadius: 3,
                textTransform: 'none' // This line ensures the text is not transformed to uppercase
              }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: 'transparent',
                borderRadius: 3,
                textTransform: 'none',
                border: '2px solid #3a2449',
                color: '#3a2449',
              }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Login;