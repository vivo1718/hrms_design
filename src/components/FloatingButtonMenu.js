import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './FloatingButtonMenu.css';

const FloatingButtonMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null); // Reference for the menu
    const buttonRef = useRef(null); // Reference for the floating button

    const toggleMenu = () => setShowMenu(!showMenu);

    const closeMenu = () => setShowMenu(false);

    // Close the menu if the click is outside the menu or button
    const handleClickOutside = (event) => {
        if (
            menuRef.current && !menuRef.current.contains(event.target) &&
            buttonRef.current && !buttonRef.current.contains(event.target)
        ) {
            closeMenu();
        }
    };

    useEffect(() => {
        // Add the event listener when the component is mounted
        document.addEventListener('click', handleClickOutside);

        // Cleanup the event listener when the component is unmounted
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            {/* Floating Button */}
            <Button 
                variant="primary"
                className="floating-button"
                onClick={toggleMenu}
                ref={buttonRef}
            >
                ☰
            </Button>

            {/* Dropdown Menu */}
            {showMenu && (
                <div className="floating-menu" ref={menuRef}>
                    <button className="close-menu" onClick={closeMenu}>×</button> {/* Cross icon */}
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
