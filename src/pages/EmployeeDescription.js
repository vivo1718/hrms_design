import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db , auth } from "../components/firebase";
import { Card, Tabs, Tab, Button } from "react-bootstrap";

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
    <div>
    
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center">
          <img
            src={employee.profilePicture || "default-profile.png"}
            alt="Profile"
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px" }}
          />
          <div>
            <h5>{employee.name}</h5>
            <p className="text-muted">{employee.jobTitle}</p>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Tabs defaultActiveKey="personal" id="employee-details-tabs">
          <Tab eventKey="personal" title="Personal Details">
            <p><strong>Phone:</strong> {employee.phone}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Address:</strong> {employee.address}</p>
          </Tab>
          <Tab eventKey="job" title="Job Details">
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Joining Date:</strong> {employee.joiningDate}</p>
            <p><strong>Employment Type:</strong> {employee.employmentType}</p>
          </Tab>
          <Tab eventKey="payroll" title="Payroll Information">
            <p><strong>Basic Pay:</strong> {employee.payroll.basicPay}</p>
            <p><strong>Allowances:</strong> {employee.payroll.allowances}</p>
            <p><strong>Bank Account:</strong> ****{employee.payroll.accountNumber.slice(-4)}</p>
          </Tab>
          <Tab eventKey="attendance" title="Attendance">
            <p><strong>Days Present:</strong> {employee.attendance.daysPresent}</p>
            <p><strong>Overtime Hours:</strong> {employee.attendance.overtimeHours}</p>
          </Tab>
        </Tabs>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">Edit Details</Button>
        <Button variant="danger" className="ms-2">Terminate</Button>
      </Card.Footer>
    </Card>
    </div> 
  );
};

export default EmployeeDescription;
