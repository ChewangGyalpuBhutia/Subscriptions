import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOTP: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post('/verify-otp', { email, otp });
      navigate('/welcome');
    } catch (error) {
      setError('Invalid OTP');
    }
  };

  return (
    <div className="container mx-auto">
      <h1>Verify OTP</h1>
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" />
      <button onClick={handleVerifyOTP}>Verify OTP</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default VerifyOTP;