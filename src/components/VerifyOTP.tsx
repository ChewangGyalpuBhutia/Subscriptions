import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SignUpPicture from '../assets/SignUp.png';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import './Signup.css';

const VerifyOTP: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/verify-otp`, { email, otp });
      navigate('/welcome');
    } catch (error) {
      setError('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="hidden lg:flex items-center justify-end flex-1">
        <div className="signup-image-container flex items-center justify-end rounded-lg">
          <img src={SignUpPicture} alt="Verify OTP" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 md:m-4">
        <div className="signup-container border">
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-1'>
              <h1 className='font-extrabold text-3xl' style={{ color: '#3a2449' }}>Verify OTP</h1>
            </div>
          </div>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="otp"
              label="OTP"
              name="otp"
              autoComplete="one-time-code"
              autoFocus
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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
              onClick={handleVerifyOTP}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;