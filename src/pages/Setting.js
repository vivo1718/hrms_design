import React from "react";
import Accordion from "react-bootstrap/Accordion";
import './Setting.css';
const Setting = () => {
  const headingStyle = {
    color: "#2d6a4f",
     // Dark green
  };

  const listItemStyle = {
    padding: "10px 15px",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
    marginBottom: "8px",
    border: "1px solid #e0e0e0",
  };
  const accordionHeaderStyle = {
    backgroundColor: "#ff8042", // Default background color
    color: "#fff", // White text color
    border: "1px solidrgba(255, 129, 66, 0.49)", // Border color matches background
    borderRadius: "5px",
  };

  const accordionBodyStyle = {
    border: "1px solid #132d19", // Body border color
    borderTop: "none", // Remove duplicate top border
  };

  return (
    <div className="d-flex flex-column" style={{ padding: "20px" ,
     height:'100vh',
     width:'100%',
     }}>
      <h2 style={headingStyle} className="mb-4">
        Settings
      </h2>
      <Accordion>
        {/* General Settings */}
        <Accordion.Item eventKey="0" stye={{
          marginBottom:'10px'
        }} >
          <Accordion.Header style={accordionHeaderStyle} >General Settings</Accordion.Header>
          <Accordion.Body style={accordionBodyStyle} >
            <ul className="list-group p-3">
              <li style={listItemStyle}>Company Details</li>
              <li style={listItemStyle}>Branch Management</li>
              <li style={listItemStyle}>Localization</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* User Management */}
        <Accordion.Item className="mt-1" eventKey="1">
          <Accordion.Header style={accordionHeaderStyle} >User Management</Accordion.Header>
          <Accordion.Body   style={accordionBodyStyle} >  
            <ul className="list-group p-3">
              <li style={listItemStyle}>Roles and Permissions</li>
              <li style={listItemStyle}>User Access Control</li>
              <li style={listItemStyle}>Activity Logs</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* Attendance Settings */}
        <Accordion.Item   className="mt-1" eventKey="2" >
          <Accordion.Header style={accordionHeaderStyle} >Attendance Settings</Accordion.Header>
          <Accordion.Body style={accordionBodyStyle} >
            <ul className="list-group p-3">
              <li style={listItemStyle}>Working Hours</li>
              <li style={listItemStyle}>Shifts</li>
              <li style={listItemStyle}>Attendance Rules</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* Payroll Settings */}
        <Accordion.Item   className="mt-1" eventKey="3">
          <Accordion.Header style={accordionHeaderStyle}>Payroll Settings</Accordion.Header>
          <Accordion.Body style={accordionBodyStyle} >
            <ul className="list-group p-3">
              <li style={listItemStyle}>Tax Configuration</li>
              <li style={listItemStyle}>Salary Components</li>
              <li style={listItemStyle}>Pay Cycle</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Setting;
