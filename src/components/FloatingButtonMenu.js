import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './FloatingButtonMenu.css';

const FloatingButtonMenu = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <>
            {/* Floating Button */}
            <Button 
                variant="primary"
                className="floating-button"
                onClick={toggleMenu}
            >
                ☰
            </Button>

            {/* Dropdown Menu */}
            {showMenu && (
                <div className="floating-menu">
                    <ul>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/employees">Employees</Link>
                        </li>
                        <li>
                            <Link to="/attendance">Attendance</Link>
                        </li>
                        <li>
                            <Link to="/payroll">Payroll</Link>
                        </li>
                        <li>
                            <Link to="/setting">Setting</Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default FloatingButtonMenu;
