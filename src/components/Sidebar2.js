import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link , useLocation} from 'react-router-dom';
import {Card , ListGroup, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faServer, faUsersLine, faBuilding, faClipboardUser, faArrowRightToBracket, faPeopleRoof, faPersonWalking, faGears, faUserNurse, faUserFriends, faQuestion } from '@fortawesome/free-solid-svg-icons';
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
          <FontAwesomeIcon icon={faUserFriends} className="me-2" /> Employees
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
        <hb/>
        <div className="d-flex flex-column p-2 justify-content-center align-items-center mt-2 ">
        <Card className=" p-2 justify-content-center align-items-center  "
        style={{
          margin:'10px',
          backgroundColor:'#fff',
          justifyContent:'center' ,
          borderRadius:'20px'
        }}
        >
        <Card.Body>
        <div className="d-flex  justify-content-center align-items-center mb-3"
      style={{backgroundColor:'orange',
        height:'3rem',
        marginTop:'-3rem',
        width:'3rem',
        overflow:'hidden',
       // boxShadow: " 5px 5px 5px 5px green ",
        color:'#fff',
        borderRadius:'1.5rem',
        background: 'linear-gradient(to bottom, #ff7e5f, #feb47b)'


      }}
      
      >
        <FontAwesomeIcon icon={faQuestion} ></FontAwesomeIcon>
          </div>
          
          
        </Card.Body>
        <Button style={{
          backgroundColor:'#ff8042',
          borderColor:'#ff8042',
          borderRadius:'20px',
          fontWeight:'bold',
          fontSize:'smaller'
        }}>Need Help</Button>
        <br></br>
        {/* Footer Section */}
        <Card.Footer className="text-muted text-center">
          <small>© 2024 HRMS System</small>
        </Card.Footer>
      </Card></div>
    
    </div>
  );
};

export default Sidebar2;