import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar2 from './components/Sidebar2';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Attendance from './pages/Attendance';
import Leaves from './pages/Leaves';
import  Payroll from './pages/Payroll';
import Setting from './pages/Setting';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';
import FloatingButtonMenu from './components/FloatingButtonMenu';
import LoginOtp from './pages/LoginOtp';
import EmployeeDescription from './pages/EmployeeDescription';
import Chat from './pages/Chat';
import LandingPage from './components/LandingPage';

function App() {

    return (
        
        <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Other App Pages */}
        <Route
          path="/*"
          element={
            <div className="d-flex">
              <Sidebar2 />
              <FloatingButtonMenu />
              <div className="container">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/login_with_otp" element={<LoginOtp />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/departments" element={<Departments />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/leaves" element={<Leaves />} />
                  <Route path="/payroll" element={<Payroll />} />
                  <Route path="/setting" element={<Setting />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/employee_details/:id" element={<EmployeeDescription />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
    );
}

export default App;
