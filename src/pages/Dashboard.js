import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import {Card, Button, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faCog, faEnvelope, faClipboardUser, faPersonWalking, faUserPen, faUserPlus, faPersonSnowboarding } from "@fortawesome/free-solid-svg-icons";
import Stack from 'react-bootstrap/Stack';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import {PieChart, Pie, Cell} from "recharts"
import { auth } from '../components/firebase';
import { faNfcDirectional } from '@fortawesome/free-brands-svg-icons';
import image from '../assets/man.jpg';
import { toast } from 'react-toastify';
import imageName from '../assets/outdoor.png';

function Dashboard() {
  const data = [
    { day: "Monday", Attendance: 25 },
    { day: "Tuesday", Attendance: 30 },
    { day: "Wednesday", Attendance: 28 },
    { day: "Thursday", Attendance: 32 },
    { day: "Friday", Attendance: 35 },
  ];
  const data2 = [
    { name: "Male", value: 40 },
    { name: "Female", value: 30 },
  ];
  const COLORS = ["#000", "#FF8042"];
  //firebase user loginin details after successfully logged in
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async()=>{
    auth.onAuthStateChanged(async(user)=>{
      console.log(user);
      setUserDetails(user);
    });
  };
  useEffect(()=>{
   fetchUserData();
  },[]);
  async function handleLoggedOut(){
   try{
    await auth.signOut();
    window.location.href= './Login';
    console.log("Logged out successfully");
    toast.success("Logged out successfully");
   } catch(error){
    console.log("Error logging out".error.message);
   }
  }

  return(
  <div className="dashboard-container">
  {/* Sidebar Placeholder */}
  {/* Main Content */}

   {
    userDetails ? (
      <>
      <div className='dash_row'>
  <div className='r1'>
  <div className="icon">
  </div>
  <div className='text'>Welcome to the dashboard, {userDetails.displayName}
  <p className='sub'>Lets manage your employees in one place</p>
  </div>
  </div>
  <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}><Button onClick={handleLoggedOut} variant='warning'>Log out</Button></div>
  
</div>
<Row className='row_parent ' >
  <Col >
  <Col style={{marginLeft:'10px',marginRight:'10px', marginBottom:'10px'}}>
  <Row>
  <Card className='dash_card '>
    <div className='icon_bar'><FontAwesomeIcon icon={faUsers} className="icon_back"></FontAwesomeIcon></div>
    <p className='emp'>1232</p>
    <Card.Title className='card_title'>Total Employees</Card.Title>
  </Card>
 
  </Row>
  </Col>
  <Col style={{marginLeft:'10px',marginRight:'10px', marginBottom:'10px'}}>
  <Row>
  <Card className='dash_card'>
    <div className='icon_bar'><FontAwesomeIcon icon={faUserPlus} className="icon_back"></FontAwesomeIcon></div>
    <p className='emp'>1232</p>
    <Card.Title className='card_title'> Employess Added</Card.Title>
  </Card>
 
  </Row>
  </Col></Col>
  <Col>
  <Col style={{marginLeft:'10px',marginRight:'10px', marginBottom:'10px'}}>
  <Row>
  <Card className='dash_card'>
    <div className='icon_bar'><FontAwesomeIcon icon={faPersonWalking} className="icon_back"></FontAwesomeIcon></div>
    <p className='emp'>1232</p>
    <Card.Title className='card_title'>Total Leaves</Card.Title>
  </Card>
 
  </Row>
  </Col>
  <Col style={{marginLeft:'10px',marginRight:'10px', marginBottom:'10px'}}>
  <Row>
  <Card className='dash_card'>
    <div className='icon_bar'><FontAwesomeIcon icon={faPersonSnowboarding} className="icon_back"></FontAwesomeIcon></div>
    <p className='emp'>1232</p>
    <Card.Title className='card_title'>Payroll</Card.Title>
  </Card>
 
  </Row>
  </Col>
  </Col>
  <Col>
  <Card className='attend'>
    <Card.Subtitle className='stitle_attend'>Your Attendance</Card.Subtitle>
    <Card.Title className='title_attend'>02:15:10</Card.Title>
    
      <div className='div_attend'>
      <Row>
        <Col><p className='timing'>Break Time:</p></Col>
        <Col><p className='timing'>01:00 PM - 01:45PM(45 min)</p></Col>
      </Row>
      <Row>
      <Col><p className='timing'>Target Hours:</p></Col>
      <Col><p className='timing'>08 H: 15M(Per Day)</p></Col>
      </Row>
     
      </div>
      <div className='buttons ' >
        <Button className='b1'>Break</Button>
        <Button className='b2'>Clock Out</Button>
        
        </div> 
    
  </Card>
  </Col>
  
</Row>
<Row>
  <Col style={{backgroundColor:'white', marginLeft:'10px', marginTop:'10px'}}>
  <h6 style={{fontWeight:'bold', marginTop:'10px', fontFamily: '"Poppins", sans-serif'}}>Attendance Overview</h6>
  <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
        
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" 
        stroke='#A59D84'
        tick={{fontSize:'12px'}}
        />
        <YAxis 
        stroke='#A59D84'
        tick={{fontSize:'12px'}}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="Attendance" fill="#82ca9d" barSize={15} />
      </BarChart>
    </ResponsiveContainer>
  </Col>
  <Col style={{backgroundColor:'white', marginLeft:'15px', marginRight:'15px', marginTop:'10px'}}>
  <h6 style={{fontWeight:'bold', marginTop:'10px', fontFamily: '"Poppins", sans-serif'}}>Gender By Employees</h6>
  <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data2}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={150}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={'cell-${index}'} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </Col>
</Row>
<div style={{
  marginTop:'10px',
  backgroundColor:'#fff',
  paddingBottom:'10px'
}}><h6 style={{fontWeight:'bold', marginTop:'10px',marginLeft:'10px', fontFamily: '"Poppins", sans-serif'}}>Top Performing Emplouees</h6>
<Row style={{marginTop:'20px'}}>
  <Col className = "stars">
  <div  className ="emp1" style={{height:'5rem', width:'5rem', backgroundColor:'green', borderRadius:'2.5rem'}}></div>
  <p style={{fontWeight:'bold', marginTop:'5px' }}>Jone ebar</p>
  <h6 style={{fontWeight:'bolder', marginTop:'-5px', color:'#FF8042'}}>80%</h6>
  </Col>
  <Col className = "stars">  <div  className ="emp1" style={{height:'5rem', width:'5rem', backgroundColor:'green', borderRadius:'2.5rem'}}></div>
  <p style={{fontWeight:'bold', marginTop:'5px' }}>Jone ebar</p>
  <h6 style={{fontWeight:'bolder', marginTop:'-5px', color:'#FF8042'}}>80%</h6>
  
  </Col>
  <Col className = "stars">  <div  className ="emp1" style={{height:'5rem', width:'5rem', backgroundColor:'green', borderRadius:'2.5rem'}}></div>
  <p style={{fontWeight:'bold', marginTop:'5px' }}>Jone ebar</p>
  <h6 style={{fontWeight:'bolder', marginTop:'-5px', color:'#FF8042'}}>80%</h6>
  
  </Col>
  <Col className = "stars">  <div  className ="emp1" style={{height:'5rem', width:'5rem', backgroundColor:'green', borderRadius:'2.5rem'}}></div>
  <p style={{fontWeight:'bold', marginTop:'5px' }}>Jone ebar</p>
  <h6 style={{fontWeight:'bolder', marginTop:'-5px', color:'#FF8042'}}>80%</h6>
  
  </Col>
  <Col className = "stars">  <div  className ="emp1" style={{height:'5rem', width:'5rem', backgroundColor:'green', borderRadius:'2.5rem'}}></div>
  <p style={{fontWeight:'bold', marginTop:'5px' }}>Jone ebar</p>
  <h6 style={{fontWeight:'bolder', marginTop:'-5px', color:'#FF8042'}}>80%</h6>
  
  </Col>
</Row>
</div>
      </>
    ):(<div className='loads'><img src={imageName} style={{height:'10rem',width:'10rem', marginBottom:'5px'}} ></img><p>Please Login to enter dashboard</p></div>)
   }

  </div>

  )
};

export default Dashboard;
