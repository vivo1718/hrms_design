import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUncharted } from '@fortawesome/free-brands-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar1.css';
const Sidebar1 = () => (

    // <div className="bg-light vh-100 p-3">
    //     <h4>HRMS</h4>
    //     <nav className="nav flex-column">
    //         <Link to="/dashboard" className="nav-link">Dashboard</Link>
    //         <Link to="/employees" className="nav-link">Employees</Link>
    //         <Link to="/departments" className="nav-link">Departments</Link>
    //     </nav>
    // </div>


    <Sidebar rootStyles={{
      backgroundColor:'white',
      color:'black',
      height:'100vh'
    }}   >

      <div className="title_side">HRMS</div>
      <hr/>
        
    
  <Menu
    menuItemStyles={{
      button: {
        // the active class will be added automatically by react router
        // so we can use it to style the active menu item
        [`&.active`]: {
          backgroundColor: 'blue',
          color: '#fff',
        },
      },
    }}
  >
    <MenuItem component={<Link to="/dashboard" className="nav-link"></Link>}> Dashboard</MenuItem>
    <MenuItem component={<Link to="/employees" className="nav-link" />}> Employees</MenuItem>
    <MenuItem component={<Link to="/departments" className="nav-link" />}> Departments</MenuItem>
  
  <MenuItem component={<Link to="/attendance" className="nav-link"></Link>}> Attendance</MenuItem>
    <MenuItem component={<Link to="/leaves" className="nav-link" />}> Leaves</MenuItem>
    <MenuItem component={<Link to="/login" className="nav-link" />}> Login</MenuItem>
    </Menu>
</Sidebar>
);

export default Sidebar1;
