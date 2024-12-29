import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Import custom CSS for animations and colors
import image5 from '../assets/hrms.jpg';
import image6 from '../assets/login.jpg';
import image7 from '../assets/manage.jpg';
import image8 from '../assets/register.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronDown, faChevronLeft, faPeopleArrows, faTimes,faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false); 
  const handleLoginRedirect = () => {
    navigate("/login");
  
    
  };

  const location  = useLocation();

  return (
    <div className="landing-page">
      {/* Navbar */}
      <Navbar  className=" ps-4 pe-4 " expand="lg" bg="black" variant="dark"  fixed="top">
          <Navbar.Brand style={{fontWeight:'bold'}} href="#">ADSOFT</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" 
                onClick={() => setExpanded(!expanded)} // Toggle state
            ><FontAwesomeIcon
            icon={expanded ? faTimes : faBars} // Switch between icons
            style={{ color: "#fff", fontSize: "1.5rem" }}
          /> </Navbar.Toggle>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#features"  className={location.hash === "#features" ? "active" : ""}
 style={{color:'#fffc'}} >Features <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></Nav.Link>
              <Nav.Link href="#showcase"             className={location.hash === "#showcase" ? "active" : ""}
    style={{color:'#fffc'}}>Showcase <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></Nav.Link>
              <Nav.Link href="#testimonials"             className={location.hash === "#testimonials" ? "active" : ""}
    style={{color:'#fffc'}}>Testimonials <FontAwesomeIcon  size='sm' icon={faChevronDown}></FontAwesomeIcon></Nav.Link>
              <Nav.Link href="#contact"              className={location.hash === "#contact" ? "active" : ""}
   style={{color:'#fffc'}}>Contact <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>

      {/* Hero Section */}
      <section className="hero d-flex justify-content-center align-items-center text-white" >
        <div className="container1 " >
          <h1 className="display-4 text-shadow"   >Empower Your Workforce with Our HRMS Solutions</h1>
          <p className="lead mt-3 text-shadow">Streamline payroll, attendance, and employee management with cutting-edge technology.</p>
          {/* <div
            onClick={handleLoginRedirect}
            className="btn1 "
          >Get Started
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }} >
            <FontAwesomeIcon icon={faArrowRight}  />
            </div>
          </div> */}
          <Button variant="success " onClick={handleLoginRedirect} className="rounded me-2" >
        Get Started<FontAwesomeIcon icon={faArrowRight} className="ms-2" />
      </Button>
        </div>
        <svg class="hero-curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,224C120,192,240,160,360,181.3C480,203,600,277,720,288C840,299,960,245,1080,202.7C1200,160,1320,128,1440,160L1440,320L0,320Z" fill="#ffffff"></path>
    </svg>
      </section>

      {/* Features Section */}
      <section id="features" className="features py-5 text-center " style={{ backgroundColor: "#fff" }}>
        <div className="d-flex flex-column  ms-3 me-3 justify-content-center align-items-center">
          <h2 className="text-center text-dark mb-5" style={{
            fontFamily: '"Poppins", sans-serif'
          }} >Features</h2>
          <div className="row">
            <div className="col-md-4 text-center">
              <div className="feature-card p-4" >
                <i className="bi bi-clock-history display-4 text-info mb-3"></i>
                <h6 style={{color:'#1f1f1f'}} >Attendance Tracking</h6>
                <p style={{color:'grey'}} >Track employee attendance with geolocation and biometric integration.</p>
              </div>
            </div>
            <div className="col-md-4 text-center" style={{
                borderColor:'#000',
                borderWidth:'2px',

              }} >
              <div className="feature-card p-4"
              
               >
                <i className="bi bi-cash-stack display-4 text-info mb-3"></i>
                <h6 style={{color:'#1f1f1f'}}>Payroll Management</h6>
                <p style={{color:'grey'}}>Automate salary calculations and generate pay slips effortlessly.</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="feature-card p-4" >
                <i className="bi bi-bar-chart-line display-4 text-info mb-3"></i>
                <h6 style={{color:'#1f1f1f'}} >Analytics & Reports</h6>
                <p style={{color:'grey'}} >Gain insights into employee performance and organizational efficiency.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="showcase py-5 " style={{
          backgroundColor: "#1f1f1f",
          
        }} >
        <div className=" d-flex flex-column justify-content-center align-items-center align-content-stretch text-center"
        
        >
          <h2 className="text-center  text-white mb-5">Why Choose Us?</h2>
          <div className="image-cards-container d-flex justify-content-center align-items-center py-5">
      <div className="image-card small-card left-card">
        <img src={image6} alt="Card 1" className="img-fluid rounded" />
      </div>
      <div className="image-card large-card">
        <img src={image7} alt="Card 2" className="img-fluid rounded" />
      </div>
      <div className="image-card small-card right-card">
        <img src={image8} alt="Card 3" className="img-fluid rounded" />
      </div>
    </div>
    <p  style={{
            color: "#E0E0E0",
    }} >Our HRMS provides an all-in-one platform to manage recruitment, payroll, attendance, performance, and more. Simplify every aspect of your HR operations in one place.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials ps-3 pe-3 py-5" style={{ backgroundColor: "#fff", fontFamily: '"Poppins", sans-serif' }}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center text-dark mb-5">What Our Clients Say</h2>
          <div className="row " style={{
            display: "flex",
            justifyContent: "center",
            columnGap: "1rem",
            alignItems: "center",
          }}>
            <div className="col-md-4 mb-2"  style={{
              border:'1px solid #1f1f1f',
                        }} >
              <div className="testimonial p-4 text-center" style={{ backgroundColor: "#FFFFFF"}}>
                <p>“The HRMS system has streamlined our processes and improved efficiency across the board.”</p>
                <h5 className="owner">- Jane Doe, CEO</h5>
              </div>
            </div>
            <div className="col-md-4 mb-2" style={{
              border:'1px solid #1f1f1f',
            }}>
              <div className="testimonial p-4 text-center" style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
                <p>“A game-changer for payroll management. Highly recommended!”</p>
                <h5 className="owner" >- John Smith, HR Manager</h5>
              </div>
            </div>
            <div className="col-md-4 mb-2" style={{
              border:'1px solid #1f1f1f',
            }}>
              <div className="testimonial p-4 text-center" style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}>
                <p>“User-friendly and feature-rich. Exactly what we needed!”</p>
                <h5 className="owner">- Lisa Brown, COO</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact py-5 bg-dark text-white">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center mb-5">Get in Touch</h2>
          <form>
            <div className="row">
              <div className="col-md-6 mb-3" style={{color:'white'}} >
                <input type="text" className="form-control border-secondary bg-dark text-white name" placeholder="Your Name" required />
              </div>
              <div className="col-md-6 mb-3" style={{color:'white'}} >
                <input type="email" className="form-control border-secondary bg-dark text-white email" placeholder="Your Email" required />
              </div>
            </div>
            <div className="mb-3" style={{color:'white'}} >
              <textarea className="form-control border-secondary bg-dark text-white" rows="5" placeholder="Your Message" required  ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-info">Send Message</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-4 bg-dark text-white text-center">
        <p>&copy; 2024 ADSOFT Softwares. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
