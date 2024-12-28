import "./Employees.css";
import * as XLSX from "xlsx";
import man from "../assets/man.jpg";
import back from "../assets/back.jpg";
import { db } from "../components/firebase";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import img4 from "../assets/loads3.svg";
import { toast, ToastContainer } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import {
  faBell,
  faAdd,
  faThList,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
  });
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();

  // Check for authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the current user's ID
      } else {
        toast.warning("Please Login to see employees");
        // navigate("/login"); // Redirect to login if not authenticated
      }
    });
    return () => unsubscribe(); // Cleanup the subscription
  }, [auth, navigate]);

  // Fetch employees
  const fetchEmployees = async () => {
    if (!userId) return;

    try {
      const employeesRef = collection(db, "users", userId, "employees");
      const q = query(employeesRef, orderBy("name")); // Sort by name
      const querySnapshot = await getDocs(q);
      const employeeList = querySnapshot.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),
      }));
      setEmployees(employeeList);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const [showSingleEmployeeForm, setShowSingleEmployeeForm] = useState(false);
  const [showMultipleEmployeeForm, setShowMultipleEmployeeForm] =
    useState(false);

  // Toggle visibility of the single employee form

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  // Add multiple employees
  const handleFileUpload = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON

        try {
          // Add multiple employees to Firestore
          const employeesRef = collection(db, "users", userId, "employees");
          const batchPromises = jsonData.map(async (employee) => {
            return addDoc(employeesRef, {
              name: employee.name || "",
              email: employee.email || "",
              position: employee.position || "",
              department: employee.department || "",
            });
          });

          await Promise.all(batchPromises);
          toast.success("Employees added successfully!");
          fetchEmployees();
        } catch (error) {
          console.error("Error adding employees: ", error);
          toast.error("Error adding employees");
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handle_emp = (id) => {
    navigate(`/employee_details/${id}`);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      // Delete employee from Firebase
      const employeeDoc = doc(db, "users", userId, "employees", id);
      await deleteDoc(employeeDoc);

      // Update state to remove the deleted employee
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
      toast.success("Employee removed successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to remove employee.");
    }
  };
  // Add single employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const employeesRef = collection(db, "users", userId, "employees");
      await addDoc(employeesRef, newEmployee);
      fetchEmployees(); // Refresh the list
      setNewEmployee({ name: "", email: "", position: "", department: "" }); // Reset form
      toast.success("Employee Added successfully");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Filter employees
  //   const filteredEmployees = employees.filter((employee) =>
  //     employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredEmployees.length === 0 && searchTerm) {
    toast.warning("No employees found matching your search.", {
      position: "top-right",
    });
    //alert("No employees found ")
  }

  useEffect(() => {
    fetchEmployees();
  }, [userId]); // Fetch employees when userId changes

  if (!userId) {
    return (
      <div className="d-flex flex-column mt-3 mb-3 justify-content-center align-items-center "
      style={{
        height: "100vh",
        width: "100%",
      }}
      >
        <img src={img4}  style={{
          height:'15rem',
          width:'15rem',
        }}/>
        <p style={{fontFamily:
          '"Poppins", sans-serif',
          fontSize: "1rem",
          color: "black",
          fontWeight: "bold",
          marginTop: "10px",
        }} >Please Login to come here</p>
        

      </div>
    );
  }

  return (
    <div className="employees_main">
      <ToastContainer></ToastContainer>
      <Row xs={12} sm={12} md={2} lg={3} className="employee_bar">
        <Col xs={12} sm={12} md={3} lg={4}>
          <p className="emp_title">Employees</p>
        </Col>
        <Col xs={12} sm={12} md={9} lg={8}>
          <Form.Group
            className="mb-4 mt-2  "
            style={{
              borderColor: "#FF8042",
              width: "100%",
              marginRight: "10px",
              borderWidth: "3px",
            }}
          >
            <Form.Control
              type="text"
              style={{
                borderRadius: "20px",
                borderColor: "#FF8042",
                borderWidth: "2px",
              }}
              placeholder="Search employees by name or email..."
              value={searchTerm}
              className="form-control"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
        {/* <Col xs={12} sm={12} md={2} lg={3}><div className="emp_t"><p className="emp_title2">Time goes here</p>
            
            </div></Col> */}
      </Row>
      <Row className=" d-flex g-3 justify-content-center align-items-center ">
        {(filteredEmployees.length > 0 ? filteredEmployees : employees).map(
          (employee, index) => (
            <Col
              key={index}
              xs={12}
              sm={
                filteredEmployees.length > 0 && filteredEmployees.length <= 3
                  ? 12
                  : 6
              }
              md={
                filteredEmployees.length > 0 && filteredEmployees.length <= 3
                  ? 12
                  : 6
              }
              lg={
                filteredEmployees.length > 0 && filteredEmployees.length <= 2
                  ? 6
                  : 3
              }
              className="d-flex justify-content-center "
            >
              <Card className="col_out" style={{ width: "16rem" }}>
                {/* Employee Photo */}
                <Card.Img variant="top" style={{ height: "8rem" }} src={back} />
                <Card.Body>
                  <div
                    className="img_div d-flex  justify-content-center align-items-center mb-3"
                    style={{
                      backgroundColor: "#fff",
                      height: "4rem",
                      marginTop: "-3rem",
                      width: "4rem",
                      padding: "10px",
                      overflow: "hidden",
                      // boxShadow: " 5px 5px 5px 5px green ",
                      borderRadius: "1rem",
                    }}
                  >
                    <img
                      src={man}
                      style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "1rem",
                        objectFit: "cover",
                      }}
                    ></img>
                    {/* <FontAwesomeIcon size='lg' icon={faAdd}></FontAwesomeIcon> */}
                  </div>
                  <Card.Title className="fontf1">{employee.name}</Card.Title>
                  <hr
                    style={{
                      border: "1px dashed green",
                    }}
                  />
                  <Card.Text className="fontf">
                    <strong>Email:</strong> {employee.email}
                  </Card.Text>
                  <Card.Text className="fontf">
                    <strong>Position:</strong> {employee.position}
                  </Card.Text>
                  <Card.Text className="fontf">
                    <strong>Department:</strong> {employee.department}
                  </Card.Text>
                  <div className="emp_btn">
                    <Button
                      onClick={() => handle_emp(employee.id)}
                      className="view"
                      style={{ width: "100%", color: "green" }}
                      variant="success"
                    >
                      View Profile
                    </Button>
                    <Button
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="view2"
                      style={{ width: "100%", color: "red" }}
                      variant="danger"
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>

      {/* No Results Message */}
      {filteredEmployees.length === 0 && searchTerm && <div></div>}

      {/* Add New Employee Form */}
      <div
        className="  d-flex flex-column mt-3 mb-3 justify-content-center align-items-center "
        style={{
          width: "100%",
          paddingTop: "20px",
        }}
      >
        <div className="d-flex flex-column  justify-content-center align-items-center">
          <Button
            className="d-flex  justify-content-center align-items-center"
            style={{
              backgroundColor: "orange",
              height: "3rem",
              width: "3rem",
              color: "#fff",
              borderColor: "orange",
              borderRadius: "1.5rem",
              background: "linear-gradient(to bottom, #ff7e5f, #feb47b)",
            }}
          >
            <FontAwesomeIcon size="lg" icon={faAdd}></FontAwesomeIcon>
          </Button>
          <p className="fontf mt-2">Add Employees</p>
        </div>

        <Row
          className=" d-flex justify-content-center align-self-center"
          style={{ backgroundColor: "#fff", width: "100%", padding: "20px" }}
        >
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={6}
            className=" d-flex justify-content-center align-items-center mb-3"
          >
            {" "}
            <Card style={{ padding: "20px", width: "80%" }}>
              <Form className="d-flex flex-column" onSubmit={handleAddEmployee}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="First Name"
                  style={{ borderColor: "grey" }}
                  className="fontf mb-3"
                >
                  {" "}
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    className="fontf"
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
                  style={{ borderColor: "grey" }}
                  className="fontf mb-3"
                >
                  <Form.Control
                    type="email"
                    className="fontf"
                    placeholder="Email"
                    value={newEmployee.email}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, email: e.target.value })
                    }
                    required
                  ></Form.Control>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter position"
                  style={{ borderColor: "grey" }}
                  className="fontf mb-3"
                >
                  <Form.Control
                    type="text"
                    className="fontf"
                    placeholder="Position"
                    value={newEmployee.position}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        position: e.target.value,
                      })
                    }
                    required
                  ></Form.Control>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter department"
                  style={{ borderColor: "grey" }}
                  className="fontf mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Department"
                    className="fontf"
                    value={newEmployee.department}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        department: e.target.value,
                      })
                    }
                    required
                  ></Form.Control>
                </FloatingLabel>
                <div className="d-flex justify-content-center align-self-stretch">
                  <Button
                    onClick={handleAddEmployee}
                    style={{ width: "100%" }}
                    variant="success"
                  >
                    Add Employee
                  </Button>
                </div>
              </Form>
            </Card>{" "}
          </Col>

          <Col
            xs={12}
            sm={12}
            md={12}
            lg={6}
            className=" d-flex justify-content-center align-items-center"
          >
            <Form className="p-3">
              {/* File Upload with Floating Label */}
              <Form.Group className="form-floating mb-3 ">
                <Form.Control
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  id="uploadExcel"
                  placeholder="Upload Excel File"
                />
              </Form.Group>

              {/* Submit Button */}
              <div className=" d-flex justify-content-center align-items-center align-self-stretch">
                <Button
                  variant="success"
                  style={{ width: "100%" }}
                  onClick={handleFileUpload}
                >
                  Upload Excel
                </Button>
              </div>
              <br></br>
              <p className="fontf">
                Kindly maintain the excel format as name , position,department
                and email
              </p>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Employees;
