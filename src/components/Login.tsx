import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignUpPicture from '../assets/SignIn.png';
import { TextField, Button, Typography, Box, IconButton, InputAdornment, CircularProgress, Modal } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './Login.css';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password should be of minimum 6 characters length').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(`${apiUrl}/login`, values);
        // Handle successful login, e.g., store token, redirect to dashboard
        navigate('/welcome'); // Example redirect after successful login
      } catch (error:any) {
        setModalMessage(error.response?.data?.error || 'Error logging in');
        setModalOpen(true);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
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
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#3a2449',
                borderRadius: 3,
                textTransform: 'none' // This line ensures the text is not transformed to uppercase
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
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
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            // border: '2px solid #000',
            boxShadow: 24,
            borderRadius: 4,
            p: 4,
          }}
        >
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {modalMessage}
          </Typography>
          <Button onClick={handleCloseModal} sx={{ mt: 2, color:'#3a2449' }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;