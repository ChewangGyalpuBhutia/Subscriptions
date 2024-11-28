import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import VerifyOTP from './components/VerifyOTP';
import Login from './components/Login';
import Welcome from './components/Welcome';
import TaskTable from './components/TaskTable';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ReunionFrontend" element={<Navigate to="/welcome" />} />
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/task-table" element={<TaskTable />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;