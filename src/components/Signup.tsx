import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignUpPicture from '../assets/SignUp.png';
import { TextField, Button, Typography, Box, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './Signup.css';

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password should be of minimum 6 characters length').required('Password is required'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string; general?: string }) => {

      setLoading(true);
      try {
        const response = await axios.post(`${apiUrl}/signup`, values);
        navigate('/verify-otp', { state: { email: values.email } });
      } catch (error) {
        formik.setFieldError('general', 'Error signing up');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignIn = () => {
    navigate('/login');
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
            <div className='flex items-center gap-1 underline cursor-pointer' onClick={handleSignIn}>
              <h1 className='font-bold text-lg' style={{ color: '#3a2449' }}>Sign</h1>
              <h1 className='font-bold text-lg' style={{ color: '#d62637' }}>in</h1>
            </div>
          </div>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
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
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
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
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
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
              autoComplete="new-password"
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
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {formik.errors.general && (
              <Typography color="error" variant="body2">
                {formik.errors.general}
              </Typography>
            )}
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
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Signup;