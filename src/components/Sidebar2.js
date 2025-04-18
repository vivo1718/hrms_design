
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faServer, faUserFriends, faBuilding, faClipboardUser, faArrowRightToBracket, faPersonWalking, faToolbox, faQuestion, faBackwardStep, faBackward, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './Sidebar2.css';
import { useNavigate } from 'react-router-dom';
const Sidebar2 = () => {
  const location = useLocation();

  // Function to check if the path is active
  // const isActive = (path) => location.pathname === path;
  const isActive = (path) => location.pathname.startsWith(path);
  const navigate = useNavigate();
  const handleChat = () => { 
    navigate('/chat');
   }
   const backHome = () => { 
    navigate('/');
   }


  return (
    <div className="bg text-white vh-100 d-flex flex-column p-2">
      <div className="d-flex flex-row justify-content-center title_set">
        <FontAwesomeIcon  className='me-3' icon={faChevronLeft} onClick={backHome} ></FontAwesomeIcon>
        <div className="title_setl">
          <h3 className="text-title mb-4">HRMS</h3>
        </div>
      </div>

      {/* Navigation Links */}
      <Link
        to="/login"
        className={`text-whit ${isActive('/login') ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faArrowRightToBracket} className="me-2" style={{ paddingRight: '10px' }} /> Login
      </Link>
      
      <Link
        to="/dashboard"
        className={`text-whit ${isActive('/dashboard') ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faServer} className="me-2" style={{ paddingRight: '10px' }} /> Dashboard
      </Link>

      <Link
        to="/employees"
        className={`text-whit ${isActive('/employees') ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faUserFriends} className="me-2" style={{ paddingRight: '10px' }} /> Employees
      </Link>

  

      <Link
        to="/attendance"
        className={`text-whit ${isActive('/attendance') ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faClipboardUser} className="me-2" style={{ paddingRight: '10px' }} /> Attendance
      </Link>

      <Link
        to="/payroll"
        className={`text-whit ${isActive('/payroll') ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faPersonWalking} className="me-2" style={{ paddingRight: '10px' }} /> Payroll
      </Link>

      <Link
        to="/setting"
        className={`text-whit ${isActive('/setting') ? 'active' : ''}`}
      >
        <FontAwesomeIcon icon={faToolbox} className="me-2" style={{ paddingRight: '10px' }} /> Settings
      </Link>

      {/* Help Section */}
      <div className="d-flex flex-column p-2 justify-content-center align-items-center mt-2">
        <Card
          className=" aler p-2 justify-content-center align-items-center"
          style={{
            margin: '10px',
            justifyContent: 'center',
            borderRadius: '20px',
          }}
        >
          <Card.Body>
            <div
              className="d-flex justify-content-center align-items-center mb-3"
              style={{
                backgroundColor: 'orange',
                height: '3rem',
                marginTop: '-3rem',
                width: '3rem',
                overflow: 'hidden',
                color: '#fff',
                borderRadius: '1.5rem',
                background: 'linear-gradient(to bottom, #ff7e5f, #feb47b)',
              }}
            >
              <FontAwesomeIcon icon={faQuestion} />
            </div>
          </Card.Body>
          <Button
           onClick={handleChat}
            style={{
              backgroundColor: '#ff8042',
              borderColor: '#ff8042',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: 'smaller',
            }}
          >
            Need Help
          </Button>
          <br />
          {/* Footer Section */}
          <Card.Footer className="text-muted text-center">
            <small  style={{
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              color: '#fff6',
            }} >© 2024 HRMS System</small>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar2;
