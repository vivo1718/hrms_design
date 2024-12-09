import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link , useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faServer, faUsersLine, faBuilding, faClipboardUser, faArrowRightToBracket, faPeopleRoof, faPersonWalking, faGears } from '@fortawesome/free-solid-svg-icons';
import './Sidebar2.css';

const Sidebar2 = () => {
  
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg text-white vh-100 d-flex flex-column p-2"  >
      <div className='title_set'>
        <div className='title_setl'><h3 className="text-title mb-4">HRMS</h3></div>
        
      </div>
      <Link to="/login" className={`text-whit ${location.pathname === '/login' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faArrowRightToBracket} className="me-2" /> Login
        </Link>
        {/* <Link to="/register" className={`text-whit ${location.pathname === '/register' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faArrowRightToBracket} className="me-2" /> Register
        </Link> */}
    <Link to="/dashboard" className={`text-whit ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faServer} className="me-2" /> Dashboard
        </Link>
        <Link to="/employees" className={`text-whit ${location.pathname === '/employees' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faUsersLine} className="me-2" /> Employees
        </Link>
        <Link to="/departments" className={`text-whit ${location.pathname === '/departments' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faBuilding} className="me-2" /> Department
        </Link>
        <Link to="/attendance" className={`text-whit ${location.pathname === '/attendance' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faClipboardUser} className="me-2" /> Attendance
        </Link>
        <Link to="/payroll" className={`text-whit ${location.pathname === '/payroll' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faPersonWalking} className="me-2" /> Payroll
        </Link>
        <Link to="/setting" className={`text-whit ${location.pathname === '/setting' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faGears} className="me-2" /> Settings
        </Link>
        
    
    </div>
  );
};

export default Sidebar2;