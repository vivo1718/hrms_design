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

function App() {

    return (
        <Router>
            <div className="d-flex">
                <Sidebar2 />
                <FloatingButtonMenu></FloatingButtonMenu>
                <div className="container">
                    <Routes>
                    <Route path="/" element={<Login/>} />
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/login_with_otp" element={<LoginOtp/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/dashboard" element={<Dashboard/>} />
                        <Route path="/employees" element={<Employees/>} />
                        <Route path="/departments" element={<Departments/>} />
                        <Route path="/attendance" element={<Attendance/>} />
                        <Route path="/leaves" element={<Leaves/>} />
                        <Route path="/payroll" element={<Payroll/>} />
                        <Route path="/setting" element={<Setting/>} />
                         
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
