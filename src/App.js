import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar2 from './components/Sidebar2';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Attendance from './pages/Attendance';
import Leaves from './pages/Leaves';

import Login from './pages/Login';
import './App.css';

function App() {
    return (
        <Router>
            <div className="d-flex">
                <Sidebar2 />
                <div className="container">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/departments" element={<Departments />} />
                        <Route path="/attendance" element={<Attendance />} />
                        <Route path="/leaves" element={<Leaves />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
