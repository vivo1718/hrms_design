import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db , auth } from "../components/firebase";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import img from '../assets/man.jpg';
const EmployeeDescription = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [userId, setUserId] = useState(null);
 const[loading,setLoading] = useState(true);
  // Get the current user from Firebase Authentication
  useEffect(() => {
    //const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid); // Set the userId from the authenticated user
    } else {
      // Handle the case when the user is not authenticated
      console.log("No user authenticated.");
    }
  }, []);
  const [employeeData, setEmployeeData] = useState({
    personalInfo: {
      name: "John Doe",
      dob: "1990-01-01",
      gender: "Male",
      email: "john.doe@example.com",
      phone: "+123 456 789",
    },
    employmentInfo: {
      empId: "12345",
      jobTitle: "Software Engineer",
      department: "IT",
      manager: "Jane Smith",
      doj: "2020-03-01",
    },
    salaryInfo: {
      salary: "$80,000/year",
      bonus: "10% annually",
      bankAccount: "Ending in 1234",
    },
    leaveInfo: {
      leaveBalance: "12 days",
      sickLeave: "5 days",
      vacationDays: "7 days",
    },
    performanceInfo: {
      lastReviewDate: "2024-12-01",
      rating: "4.5/5",
      goals: "Improve coding efficiency, Participate in team projects",
    },
    documents: {
      profilePicture: "profile.jpg",
      documents: "Resume, Offer Letter, Contract",
    },
  });

  // Handle input change
  const handleInputChange = (section, key, value) => {
    setEmployeeData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value,
      },
    }));
  };

  // Fetch employee details dynamically using userId and employee ID from URL
  useEffect(() => {
    if (userId && id) {
      const fetchEmployeeDetails = async () => {
        try {
          const employeeRef = doc(db, "users", userId, "employees", id);
          const docSnap = await getDoc(employeeRef);
          if (docSnap.exists()) {
            setEmployee(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching employee details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployeeDetails();
    }
  }, [userId, id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <p>Loading employee details...</p>;
  }
  return (
    <Container fluid >
      <Row  className="p-2 m-2 justify-content-center" style={{backgroundColor:'#f8f9fa'}}>
        <Col  ><img src={img} style={{height:'60px', width:'60px'}}  ></img></Col>
        <Col>Man.jpg</Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        {/* Left Column */}
        <Col xs={12} lg={6}>
          {/* Personal Information */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-secondary text-white">
              Personal Information
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={employeeData.personalInfo.name}
                      onChange={(e) =>
                        handleInputChange("personalInfo", "name", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      value={employeeData.personalInfo.dob}
                      onChange={(e) =>
                        handleInputChange("personalInfo", "dob", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      type="text"
                      value={employeeData.personalInfo.gender}
                      onChange={(e) =>
                        handleInputChange("personalInfo", "gender", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={employeeData.personalInfo.email}
                      onChange={(e) =>
                        handleInputChange("personalInfo", "email", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={employeeData.personalInfo.phone}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "phone", e.target.value)
                  }
                />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Employment Information */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-secondary text-white">
              Employment Information
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={employeeData.employmentInfo.empId}
                      onChange={(e) =>
                        handleInputChange(
                          "employmentInfo",
                          "empId",
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={employeeData.employmentInfo.jobTitle}
                      onChange={(e) =>
                        handleInputChange(
                          "employmentInfo",
                          "jobTitle",
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      value={employeeData.employmentInfo.department}
                      onChange={(e) =>
                        handleInputChange(
                          "employmentInfo",
                          "department",
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Manager</Form.Label>
                    <Form.Control
                      type="text"
                      value={employeeData.employmentInfo.manager}
                      onChange={(e) =>
                        handleInputChange(
                          "employmentInfo",
                          "manager",
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Date of Joining</Form.Label>
                <Form.Control
                  type="date"
                  value={employeeData.employmentInfo.doj}
                  onChange={(e) =>
                    handleInputChange("employmentInfo", "doj", e.target.value)
                  }
                />
              </Form.Group>
            </Card.Body>
          </Card>
          <Card className="mb-4 shadow-sm">
  <Card.Header className="bg-info text-white">
    Performance & Appraisal
  </Card.Header>
  <Card.Body>
    <Row>
      <Col xs={6}>
        <Form.Group>
          <Form.Label>Last Review Date</Form.Label>
          <Form.Control
            type="date"
            value={employeeData.performanceInfo.lastReviewDate}
            onChange={(e) =>
              handleInputChange("performanceInfo", "lastReviewDate", e.target.value)
            }
          />
        </Form.Group>
      </Col>
      <Col xs={6}>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="text"
            value={employeeData.performanceInfo.rating}
            onChange={(e) =>
              handleInputChange("performanceInfo", "rating", e.target.value)
            }
          />
        </Form.Group>
      </Col>
    </Row>
    <Form.Group>
      <Form.Label>Goals</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={employeeData.performanceInfo.goals}
        onChange={(e) =>
          handleInputChange("performanceInfo", "goals", e.target.value)
        }
      />
    </Form.Group>
  </Card.Body>
</Card>
        </Col>

        {/* Right Column */}
        <Col xs={12} lg={6}>
          {/* Salary & Compensation */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-success text-white">
              Salary & Compensation
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Salary</Form.Label>
                    <Form.Control
                      type="text"
                      value={employeeData.salaryInfo.salary}
                      onChange={(e) =>
                        handleInputChange("salaryInfo", "salary", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Bonus</Form.Label>
                    <Form.Control
                      type="text"
                      value={employeeData.salaryInfo.bonus}
                      onChange={(e) =>
                        handleInputChange("salaryInfo", "bonus", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Bank Account</Form.Label>
                    <Form.Control
                      type="text"
                      value={employeeData.salaryInfo.bankAccount}
                      onChange={(e) =>
                        handleInputChange(
                          "salaryInfo",
                          "bankAccount",
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-4 shadow-sm">
  <Card.Header className="bg-warning text-white">
    Leave & Attendance
  </Card.Header>
  <Card.Body>
    <Row>
      <Col xs={6}>
        <Form.Group>
          <Form.Label>Leave Balance</Form.Label>
          <Form.Control
            type="text"
            value={employeeData.leaveInfo.leaveBalance}
            onChange={(e) =>
              handleInputChange("leaveInfo", "leaveBalance", e.target.value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Sick Leave</Form.Label>
          <Form.Control
            type="text"
            value={employeeData.leaveInfo.sickLeave}
            onChange={(e) =>
              handleInputChange("leaveInfo", "sickLeave", e.target.value)
            }
          />
        </Form.Group>
      </Col>
      <Col xs={6}>
        <Form.Group>
          <Form.Label>Vacation Days</Form.Label>
          <Form.Control
            type="text"
            value={employeeData.leaveInfo.vacationDays}
            onChange={(e) =>
              handleInputChange("leaveInfo", "vacationDays", e.target.value)
            }
          />
        </Form.Group>
      </Col>
    </Row>
  </Card.Body>
</Card>
<Card className="mb-4 shadow-sm">
  <Card.Header className="bg-secondary text-white">
    Documents
  </Card.Header>
  <Card.Body>
    <Row>
      <Col xs={6}>
        <Form.Group>
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="text"
            value={employeeData.documents.profilePicture}
            onChange={(e) =>
              handleInputChange("documents", "profilePicture", e.target.value)
            }
          />
        </Form.Group>
      </Col>
      <Col xs={6}>
        <Form.Group>
          <Form.Label>Documents</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={employeeData.documents.documents}
            onChange={(e) =>
              handleInputChange("documents", "documents", e.target.value)
            }
          />
        </Form.Group>
      </Col>
    </Row>
  </Card.Body>
</Card>
        </Col>
        
      </Row>

      {/* Save Button */}
      <div className="text-center mt-4">
        <Button variant="primary" className="mr-3 px-4 py-2">
          Save Changes
        </Button>
      </div>
    </Container>
     
  );
};

export default EmployeeDescription;
