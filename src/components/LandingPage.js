import AOS from "aos";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import image17 from "../assets/it.png";
import { Row, Col } from "react-bootstrap";
import image12 from "../assets/erp.png";
import image13 from "../assets/web.png";
import image14 from "../assets/mobile.png";
import image16 from "../assets/digital.png";
import image15 from "../assets/software.png";
import image11 from "../assets/analytics.png";
import Skeleton from "react-loading-skeleton";
import image18 from "../assets/automation.png";
import { useLocation } from "react-router-dom";
import image10 from "../assets/payroll_img.png";
import image19 from "../assets/third-party.png";
import image9 from "../assets/attendace_img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./LandingPage.css"; // Import custom CSS for animations and colors
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Form,
  CardFooter,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  faArrowRight,
  faChevronDown,
  faChevronLeft,
  faPeopleArrows,
  faTimes,
  faBars,
  faCheckDouble,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "aos/dist/aos.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const handleLoginRedirect = () => {
    navigate("/login");
  };
  const services = [
    {
      category: "ERP Solutions",
      items: [
        "Custom ERP Development",
        "Industry-Specific ERP",
        "ERP Integration Services",
        "ERP Maintenance & Support",
        "Cloud-Based ERP Solutions",
      ],
      image: image12, // Replace with your image path
    },
    {
      category: "Website Development",
      items: [
        "Custom Website Design",
        "E-commerce Development",
        "CMS Development",
        "Website Maintenance",
        "UI/UX Design Services",
      ],
      image: image13, // Replace with your image path
    },
    {
      category: "Mobile App Development",
      items: [
        "iOS and Android App Development",
        "Cross-Platform App Development",
        "App Maintenance",
      ],
      image: image14, // Replace with your image path
    },
    {
      category: "Software Development",
      items: [
        "Custom Software Solutions",
        "SaaS Development",
        "Enterprise Software Development",
      ],
      image: image15, // Replace with your image path
    },
    {
      category: "Digital Marketing Services",
      items: [
        "Search Engine Optimization (SEO)",
        "Social Media Marketing",
        "Pay-Per-Click (PPC) Advertising",
        "Content Marketing",
      ],
      image: image16, // Replace with your image path
    },

    {
      category: "IT Consulting Services",
      items: [
        "Technology Strategy Consulting",
        "Digital Transformation",
        "Cybersecurity Solutions",
      ],
      image: image17, // Replace with your image path
    },
    {
      category: "Business Process Automation",
      items: ["Workflow Automation", "Robotic Process Automation (RPA)"],
      image: image18, // Replace with your image path
    },
    {
      category: "Third-Party Software Solutions",
      items: [
        "CRM Software",
        "Accounting Software",
        "Project Management Tools",
        "HRMS Solutions",
      ],
      image: image19, // Replace with your image path
    },
  ];
  //modal open and close
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  // Modal Handlers
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setSuccess(false); // Reset success message on open
    setShow(true);
  };

  const handlehrms = () => {
    navigate("./login");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://formspree.io/f/mnnnodeq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setSuccess(true);
          setFormData({ name: "", email: "", message: "" }); // Reset fields
        } else {
          alert("Failed to send the message, please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error sending your message.");
      });
  };

  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Ensures the animation occurs only once when it scrolls into view
    });
  }, []);

  const location = useLocation();

  return (
    <div className="landing-page">
      {/* Navbar */}
      <Navbar
        className=" ps-4 pe-4 mb-2 "
        expand="lg"
        bg="black"
        variant="dark"
        fixed="top"
      >
        <Navbar.Brand style={{ fontWeight: "bold" ,fontFamily:'Poppins'}} href="#">
          ADSOFT
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(!expanded)} // Toggle state
        >
          <FontAwesomeIcon
            icon={expanded ? faBars : faTimes} // Switch between icons
            style={{ color: "#fff", fontSize: "1.5rem" }}
          />{" "}
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="#features"
              className={location.hash === "#features" ? "active" : ""}
              style={{ color: "#fffc" }}
            >
              Features <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
            </Nav.Link>
            <Nav.Link
              href="#showcase"
              className={location.hash === "#showcase" ? "active" : ""}
              style={{ color: "#fffc" }}
            >
              Showcase <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
            </Nav.Link>
            <Nav.Link
              href="#services"
              className={location.hash === "#services" ? "active" : ""}
              style={{ color: "#fffc" }}
            >
              Services <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
            </Nav.Link>
            <Nav.Link
              href="#testimonials"
              className={location.hash === "#testimonials" ? "active" : ""}
              style={{ color: "#fffc" }}
            >
              Testimonials{" "}
              <FontAwesomeIcon size="sm" icon={faChevronDown}></FontAwesomeIcon>
            </Nav.Link>
            <Nav.Link
              href="#contact"
              className={location.hash === "#contact" ? "active" : ""}
              style={{ color: "#fffc" }}
            >
              Contact <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


      {/* Hero Section */}
      <section className="hero d-flex justify-content-center align-items-center text-white">
        <div className="container1 ">
          <h1 className="display-4 text-shadow">
            Empower Your Workforce with Our HRMS Solutions
          </h1>
          <p className="lead mt-3 text-shadow">
            Streamline payroll, attendance, and employee management with
            cutting-edge technology.
          </p>
          <Button className="contact-btn2" onClick={handlehrms}>
            <div style={{ width: "100%" }}>Get started</div>
            <div
              className="d-flex justify-content-center align-items-center m-1"
              style={{
                backgroundColor: "#ffc",
                color: "#1f1f1f",
                height: "40px",
                borderRadius: "20px",
                width: "50%",
              }}
            >
              <FontAwesomeIcon size="1x" icon={faArrowRight}></FontAwesomeIcon>
            </div>
          </Button>
        </div>
        <svg
          class="hero-curve"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,224C120,192,240,160,360,181.3C480,203,600,277,720,288C840,299,960,245,1080,202.7C1200,160,1320,128,1440,160L1440,320L0,320Z"
            fill="#ffffff"
          ></path>
        </svg>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="features py-5 text-center "
        style={{ backgroundColor: "#fff" }}
      >
        <div className="d-flex flex-column  ms-3 me-3 justify-content-center align-items-center">
          <h2
            className="text-center text-dark mb-5"
            style={{
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            Features
          </h2>
          <div className="row">
            <div className="col-md-4 text-center">
              <div
                className="feature-card p-4"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <img className="mb-2" src={image9} loading="lazy"></img>

                <h6 style={{ color: "#1f1f1f" }}>Attendance Tracking</h6>
                <p style={{ color: "grey" }}>
                  Track employee attendance with geolocation and biometric
                  integration.
                </p>
              </div>
            </div>
            <div
              className="col-md-4 text-center"
              style={{
                borderColor: "#000",
                borderWidth: "2px",
              }}
            >
              <div
                className="feature-card p-4 "
                data-aos="fade-left"
                data-aos-delay="400"
              >
                <img className="mb-2" loading="lazy" src={image10}></img>
                <h6 style={{ color: "#1f1f1f" }}>Payroll Management</h6>
                <p style={{ color: "grey" }}>
                  Automate salary calculations and generate pay slips
                  effortlessly.
                </p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div
                className="feature-card p-4"
                data-aos="fade-left"
                data-aos-delay="600"
              >
                <img className="mb-2" src={image11} loading="lazy"></img>
                <h6 style={{ color: "#1f1f1f" }}>Analytics & Reports</h6>
                <p style={{ color: "grey" }}>
                  Gain insights into employee performance and organizational
                  efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section
        id="showcase"
        className="showcase py-5 "
        style={{
          backgroundColor: "#1f1f1f",
        }}
      >
        <div className=" d-flex flex-column justify-content-center align-items-center align-content-stretch text-center">
          <h2 className="text-center  text-white mb-3">Why Choose Us?</h2>
          <div className="image-cards-container ">
            {/* Left Card: Comprehensive HR Management */}
            <div className="image-cards-container py-5">
              {/* Left Card: Comprehensive HR Management */}
              <div
                className="image-card small-card left-card"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <div className="card-content">
                  <h4>Comprehensive HR Management</h4>
                  <hr className="card-divider" />

                  <ul>
                    <li>
                      <FontAwesomeIcon
                        className="check-icon"
                        icon={faCheckDouble}
                      ></FontAwesomeIcon>{" "}
                      Complete HR lifecycle: From hiring to performance
                      management.
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className="check-icon"
                        icon={faCheckDouble}
                      ></FontAwesomeIcon>{" "}
                      Centralized platform for all HR needs.
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className="check-icon"
                        icon={faCheckDouble}
                      ></FontAwesomeIcon>{" "}
                      Streamline onboarding, payroll, leave, and more.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Large Card: User-Friendly Interface */}
              <div
                className="image-card large-card"
                data-aos="fade-left"
                data-aos-delay="400"
              >
                <div className="card-content">
                  <h4>User-Friendly Interface</h4>
                  <hr className="card-divider" />

                  <ul>
                    <li>
                      <FontAwesomeIcon
                        className="check-icon"
                        icon={faCheckDouble}
                      ></FontAwesomeIcon>{" "}
                      Intuitive, easy-to-navigate design for all users.
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className="check-icon"
                        icon={faCheckDouble}
                      ></FontAwesomeIcon>{" "}
                      Customizable dashboards for personalized workflows.
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className="check-icon"
                        icon={faCheckDouble}
                      ></FontAwesomeIcon>{" "}
                      No steep learning curve for HR teams.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Card: Advanced Analytics & Reporting */}
              <div
                className="image-card small-card right-card"
                data-aos="fade-left"
                data-aos-delay="600"
              >
                <div className="card-content">
                  <h4>Advanced Analytics & Reporting</h4>
                  <hr className="card-divider" />

                  <ul>
                    <li>
                      <FontAwesomeIcon
                        className="check-icon"
                        icon={faCheckDouble}
                      ></FontAwesomeIcon>{" "}
                      Real-time, data-driven insights for informed decisions.
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className="check-icon"
                        icon={faCheckDouble}
                      ></FontAwesomeIcon>{" "}
                      Powerful reporting tools for key HR metrics.
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className="check-icon"
                        icon={faCheckDouble}
                      ></FontAwesomeIcon>{" "}
                      Track performance, payroll, absenteeism, and more.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <p
            data-aos="fade-left"
            data-aos-delay="200"
            style={{
              color: "#E0E0E0",
            }}
          >
            Our HRMS provides an all-in-one platform to manage recruitment,
            payroll, attendance, performance, and more. Simplify every aspect of
            your HR operations in one place.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <div className="d-flex flex-column  ms-4 me-4 my-5">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="row g-4">
            {services.map((service, index) => (
              <div className="col-lg-3 col-md-6 " key={index}>
                <div
                  className="feature-card d-flex flex-column justify-content-center align-items-center p-4"
                  data-aos="fade-left"
                  data-aos-delay="200"
                >
                  <img
                    className="mb-2"
                    src={service.image}
                    loading="lazy"
                  ></img>
                  <p style={{ color: "#1f1f1f" }}>{service.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="testimonials ps-3 pe-3 py-5"
        style={{ backgroundColor: "#fff", fontFamily: '"Poppins", sans-serif' }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center text-dark mb-5">What Our Clients Say</h2>
          <div
            className="row "
            style={{
              display: "flex",
              justifyContent: "center",
              columnGap: "1rem",
              alignItems: "center",
            }}
          >
            <div
              data-aos="fade-left"
              data-aos-delay="200"
              className="col-md-4 mb-2"
              style={{
                border: "1px solid #1f1f1f",
              }}
            >
              <div
                className="testimonial p-4 text-center"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <p>
                  “The HRMS system has streamlined our processes and improved
                  efficiency across the board.”
                </p>
                <h5 className="owner">- Jane Doe, CEO</h5>
              </div>
            </div>
            <div
              data-aos="fade-left"
              data-aos-delay="400"
              className="col-md-4 mb-2"
              style={{
                border: "1px solid #1f1f1f",
              }}
            >
              <div
                className="testimonial p-4 text-center"
                style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}
              >
                <p>
                  “A game-changer for payroll management. Highly recommended!”
                </p>
                <h5 className="owner">- John Smith, HR Manager</h5>
              </div>
            </div>
            <div
              data-aos="fade-left"
              data-aos-delay="600"
              className="col-md-4 mb-2"
              style={{
                border: "1px solid #1f1f1f",
              }}
            >
              <div
                className="testimonial p-4 text-center"
                style={{ backgroundColor: "#FFFFFF", borderRadius: "8px" }}
              >
                <p>“User-friendly and feature-rich. Exactly what we needed!”</p>
                <h5 className="owner">- Lisa Brown, COO</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer id="contact" className="footer bg-dark py-4">
        <Row>
          <Col md={3} sm={6} className="mb-4 ">
            <h5>Contact Us</h5>
            <p>
              <strong>Phone:</strong> +123 456 7890
            </p>
            <p>
              <strong>Email:</strong> support@yourcompany.com
            </p>
            <p>
              <strong>Address:</strong> 123 Main Street, City, Country
            </p>
            <Button className="contact-btn" onClick={handleShow}>
              <div style={{ width: "100%" }}>Contact Form</div>
              <div
                className="d-flex justify-content-center align-items-center m-1"
                style={{
                  backgroundColor: "#ffc",
                  color: "#1f1f1f",
                  height: "40px",
                  borderRadius: "20px",
                  width: "50%",
                }}
              >
                <FontAwesomeIcon
                  size="1x"
                  icon={faChevronRight}
                ></FontAwesomeIcon>
              </div>
            </Button>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <h5>Our Services</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <a href="/services/web-development">Web Development Support</a>
              </li>
              <li>
                <a href="/services/bug-fixing">Bug Fixing</a>
              </li>
              <li>
                <a href="/services/website-optimization">
                  Performance Optimization
                </a>
              </li>
              <li>
                <a href="/services/security-updates">Security Updates</a>
              </li>
              <li>
                <a href="/services/cms-support">CMS Support</a>
              </li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <h5>Follow Us</h5>
            <div className="d-flex flex-column footer-links">
              <a
                href="https://facebook.com/ADSOFT"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://linkedin.com/company/ADSOFT"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/ADSOFT"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <h5>Legal</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-conditions">Terms & Conditions</a>
              </li>
              <li>
                <a href="/cookie-policy">Cookie Policy</a>
              </li>
            </ul>
          </Col>
        </Row>

        <Row
          className="mt-4"
          style={{ backgroundColor: "#ffc", height: "100%" }}
        >
          <Col className="text-center">
            <p className="mb-0">© 2025 ADSOFT. All rights reserved.</p>
          </Col>
        </Row>
      </footer>
      <Modal
        show={show}
        onHide={handleClose}
        style={{
          margin: "auto",
          fontFamily: '"Poppins", sans-serif',
          fontSize: "small",
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "small" }}>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success ? (
            <div className="text-center">
              <h5>Thank you for your message!</h5>
              <p>We will get back to you shortly.</p>
              <Button variant="success" onClick={handleClose}>
                Close
              </Button>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group controlId="formMessage" className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  value={formData.message}
                  rows={3}
                  required
                  name="message"
                  onChange={handleChange}
                  placeholder="Enter your message"
                />
              </Form.Group>

              <div>
                <Button
                  className="contact-btn3 w-100"
                  style={{
                    backgroundColor: "#ff5733",
                    color: "#ffc",
                    borderColor: "#ff5733",
                    borderRadius: "20px",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LandingPage;
