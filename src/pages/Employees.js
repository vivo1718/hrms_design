import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../components/firebase";
import { toast, ToastContainer } from 'react-toastify';
import { Card , Button , Row , Col , Form , FloatingLabel} from "react-bootstrap";
import './Employees.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";


function Employees() {

  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // Current user state

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
    department: ""
  });

  const employeesCollection = collection(db, "Employees");
  
  // Fetch employees from Firestore
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getDocs(employeesCollection);
        setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        console.error("Error fetching employees: ", err);
      }
    };

    fetchEmployees();
  }, []);
  const filteredEmployees = employees.filter((employee) =>
    employee.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (filteredEmployees.length === 0 && searchTerm) {
    toast.warning("No employees found matching your search.", {
      position: "top-right",
    });
  }
  // Add new employee to Firestore
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await addDoc(employeesCollection, newEmployee);
      setEmployees([...employees, { ...newEmployee }]); // Update state
      setNewEmployee({ name: "", email: "", position: "", department: "" }); // Reset form
      alert("Employee added successfully!");
    } catch (err) {
      console.error("Error adding employee: ", err);
    }
  };

  return (
    <div className="employees_main">

        <Row  xs={12} sm={12} md={2} lg={3} className="employee_bar">
            <Col xs={12} sm={12} md={3} lg={4}><p className="emp_title">Employees</p></Col>
            <Col xs={12} sm={12} md={9} lg={8} ><Form.Group className="mb-4 mt-2  " style={{borderColor:'#FF8042',width:'100%', marginRight:'10px',borderWidth:'3px'}}>
        <Form.Control
          type="text"
          style={{borderRadius:'20px',borderColor:'#FF8042',borderWidth:'2px'}}
          placeholder="Search employees by name or email..."
          value={searchTerm}
          className="form-control"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group></Col>
            {/* <Col xs={12} sm={12} md={2} lg={3}><div className="emp_t"><p className="emp_title2">Time goes here</p>
            
            </div></Col> */}
        </Row>
        <Row xs={12} sm={12} md={2} lg={4} className="row1 g-3  ">
        {(filteredEmployees.length > 0 ? filteredEmployees : employees).map(
          (employee, index) => (
            <Col key={index} className="col1 "  >
              <Card >
                {/* Employee Photo */}
                <Card.Img
                  variant="top"
                  style={{height:'10rem'}}

                  src={employee.photoURL || "https://via.placeholder.com/150"}
                />
                <Card.Body>
                  <Card.Title className="fontf1">{employee.name}</Card.Title>
                  <hr style={{
                    border:'1px dashed green'
                  }}/>
                  <Card.Text className="fontf">
                    <strong>Email:</strong> {employee.email}
                  </Card.Text>
                  <Card.Text className="fontf">
                    <strong>Position:</strong> {employee.position}
                  </Card.Text>
                  <Card.Text className="fontf">
                    <strong>Department:</strong> {employee.department}
                  </Card.Text >
                  <div className="emp_btn"><Button  className="view" style={{width:'100%', color:'green'}} variant="success">View Profile</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>

      {/* No Results Message */}
      {filteredEmployees.length === 0 && searchTerm && (
        
        <ToastContainer></ToastContainer>
      )}
    

      {/* Add New Employee Form */}
      <h2>Add New Employee</h2>
      <Card style={{padding:'20px',width:'18rem'}}>
      <Form onSubmit={handleAddEmployee}>
       <FloatingLabel
       controlId="floatingInput"       
       label="First Name"
       style={{borderColor:'grey'}}
       className="mb-3"
       > <Form.Control
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, name: e.target.value })
          }
          required
        ></Form.Control>
        </FloatingLabel>
        <FloatingLabel
        controlId="floatingInput"       
        label="Enter email"
        style={{borderColor:'grey'}}
        className="mb-3"
        ><Form.Control
          type="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, email: e.target.value })
          }
          required></Form.Control>
        </FloatingLabel>
        <FloatingLabel
        controlId="floatingInput"       
        label="Enter position"
        style={{borderColor:'grey'}}
        className="mb-3"
        ><Form.Control
          type="text"
          placeholder="Position"
          value={newEmployee.position}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, position: e.target.value })
          }
          required
        ></Form.Control>
        </FloatingLabel>
        <FloatingLabel
        controlId="floatingInput"       
        label="Enter department"
        style={{borderColor:'grey'}}
        className="mb-3"
        ><Form.Control
          type="text"
          placeholder="Department"
          value={newEmployee.department}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, department: e.target.value })
          }
          required
        ></Form.Control>
        </FloatingLabel>
        <Button type="submit">Add Employee</Button>
      </Form>
      </Card>
    </div>
  );
}

export default Employees;

