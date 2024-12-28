import "./Payroll.css";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import img4 from "../assets/loads3.svg";  
import { db, auth } from "../components/firebase";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Button, Table, Modal, Form, Spinner } from "react-bootstrap";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";

const Payroll = () => {
  const [employees, setEmployees] = useState([]);
  const [payrollData, setPayrollData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [salary, setSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [deductions, setDeductions] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        console.log("User is not authenticated.");
        
         toast.warning("Please log in to view payroll details.");
        
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchEmployees();
    }
  }, [userId]);

  const fetchEmployees = async () => {
    if (!userId) return(<div className="d-flex flex-column mt-3 mb-3 justify-content-center align-items-center "
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
        

      </div>);

    setLoading(true);
    try {
      const employeesRef = collection(db, "users", userId, "employees");
      const q = query(employeesRef, orderBy("name"));
      const snapshot = await getDocs(q);

      const employeeList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEmployees(employeeList);
      setPayrollData(
        employeeList.map((employee) => ({
          id: employee.id,
          name: employee.name,
          baseSalary: employee.baseSalary || 0,
          bonus: employee.bonus || 0,
          deductions: employee.deductions || 0,
          netPay:
            (employee.baseSalary || 0) +
            (employee.bonus || 0) -
            (employee.deductions || 0),
          status: employee.status || "Pending",
        }))
      );
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Error fetching employees.");
    } finally {
      setLoading(false);
    }
  };

  const calculateNetPay = (salary, bonus, deductions) => {
    return salary + bonus - deductions;
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setSalary(employee.baseSalary);
    setBonus(employee.bonus);
    setDeductions(employee.deductions);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    const updatedEmployee = {
      ...selectedEmployee,
      [field]: parseFloat(value) || 0,
    };

    setSelectedEmployee(updatedEmployee);

    // Update in payrollData array in real-time
    setPayrollData((prevPayrollData) =>
      prevPayrollData.map((emp) =>
        emp.id === updatedEmployee.id
          ? {
              ...emp,
              [field]: updatedEmployee[field],
              netPay: calculateNetPay(
                updatedEmployee.baseSalary,
                updatedEmployee.bonus,
                updatedEmployee.deductions
              ),
            }
          : emp
      )
    );
  };
  const savePayroll = async () => {
    if (!selectedEmployee) return;

    try {
      // Prepare updated data with existing values if fields are empty
      const updatedData = {
        baseSalary: selectedEmployee.baseSalary || 0,
        bonus: selectedEmployee.bonus || 0,
        deductions: selectedEmployee.deductions || 0,
        netPay: calculateNetPay(
          selectedEmployee.baseSalary || 0,
          selectedEmployee.bonus || 0,
          selectedEmployee.deductions || 0
        ),
        status: "Paid",
      };

      const employeeDoc = doc(
        db,
        "users",
        userId,
        "employees",
        selectedEmployee.id
      );
      await updateDoc(employeeDoc, updatedData);

      toast.success("Payroll updated successfully.");
      setShowModal(false);
    } catch (error) {
      console.error("Error saving payroll:", error);
      toast.error("Error saving payroll.");
    }
  };

  // Generate downloadable pdf file
  const generateInvoice = (employee) => {
    const doc = new jsPDF();

    // Add title
    const gray = "#E4E4E4";
    const primaryColor = "#000000";

    // Add border at the top for theme
    doc.setFillColor(gray);
    doc.rect(0, 0, 210, 15, "F");

    // Add Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("INVOICE", 105, 30, { align: "center" });

    // Add Date
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);

    // Invoice No. Placeholder
    doc.text("Invoice No: 000001", 150, 40);

    // Add Billed To and From Sections
    doc.setFont("helvetica", "bold");
    doc.text("Billed to:", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${employee.name}`, 20, 55);
    doc.text(`Department: ${employee.department || "N/A"}`, 20, 60);

    doc.setFont("helvetica", "bold");
    doc.text("From:", 150, 50);
    doc.setFont("helvetica", "normal");
    doc.text("HRMS System", 150, 55);

    // Add Line Separator
    doc.setLineWidth(0.5);
    doc.setDrawColor(gray);
    doc.line(20, 70, 190, 70);

    // Table Header
    const startX = 20;
    const startY = 80;
    const rowHeight = 10;

    doc.setFillColor(gray);
    doc.rect(startX, startY, 170, rowHeight, "F");

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor);
    doc.text("Item", startX + 2, startY + 7);
    doc.text("Quantity", startX + 60, startY + 7);
    doc.text("Price", startX + 110, startY + 7);
    doc.text("Amount", startX + 150, startY + 7);

    // Table Rows (Salary Breakdown)
    const tableData = [
      {
        item: "Base Salary",
        quantity: 1,
        price: `$${employee.baseSalary.toFixed(2)}`,
        amount: `$${employee.baseSalary.toFixed(2)}`,
      },
      {
        item: "Bonus",
        quantity: 1,
        price: `$${employee.bonus.toFixed(2)}`,
        amount: `$${employee.bonus.toFixed(2)}`,
      },
      {
        item: "Deductions",
        quantity: 1,
        price: `-$${employee.deductions.toFixed(2)}`,
        amount: `-$${employee.deductions.toFixed(2)}`,
      },
    ];

    let currentY = startY + rowHeight;

    doc.setFont("helvetica", "normal");
    tableData.forEach((row) => {
      doc.text(row.item, startX + 2, currentY + 7);
      doc.text(row.quantity.toString(), startX + 70, currentY + 7, {
        align: "center",
      });
      doc.text(row.price, startX + 120, currentY + 7, { align: "right" });
      doc.text(row.amount, startX + 170, currentY + 7, { align: "right" });
      currentY += rowHeight;
    });

    // Add Total Row
    doc.setFont("helvetica", "bold");
    doc.text("Total", startX + 2, currentY + 7);
    doc.text("", startX + 70, currentY + 7, { align: "center" });
    doc.text("", startX + 120, currentY + 7, { align: "right" });
    doc.text(`$${employee.netPay.toFixed(2)}`, startX + 170, currentY + 7, {
      align: "right",
    });

    // Add Footer
    doc.setFontSize(10);
    doc.setTextColor(primaryColor);
    doc.text("Payment method: Bank Transfer", 20, currentY + 20);
    doc.text("Note: Thank you for using HRMS.", 20, currentY + 25);

    // Save the PDF
    doc.save(`Payroll_Invoice_${employee.name}.pdf`);
  };

  const exportToCSV = () => {
    const data = payrollData.map((employee) => ({
      Name: employee.name,
      Salary: employee.baseSalary,
      Bonus: employee.bonus,
      Deductions: employee.deductions,
      "Net Pay": employee.netPay,
      Status: employee.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll");
    XLSX.writeFile(workbook, "Payroll.csv");
  };

  return (
    <div
      className="payrol"
      style={{
        padding: "20px",
        fontFamily: '"Poppins", sans-serif',
        height: "100vh",
      }}
    >
      <h5 className="text-start mb-4" style={{ fontWeight: "bold" }}>
        Payroll Management
      </h5>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between flex-wrap align-items-center mb-3">
            <Button
              variant="success"
              onClick={exportToCSV}
              className="mb-3"
              style={{ fontSize: "14px" }}
            >
              Export Payroll as CSV
            </Button>
          </div>

          <div className="table-responsive">
            <Table striped bordered hover className="mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Base Salary</th>
                  <th>Bonus</th>
                  <th>Deductions</th>
                  <th>Net Pay</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payrollData.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>${employee.baseSalary.toFixed(2)}</td>
                    <td>+${employee.bonus.toFixed(2)}</td>
                    <td>-${employee.deductions.toFixed(2)}</td>
                    <td>=${employee.netPay.toFixed(2)}</td>
                    <td>{employee.status}</td>
                    <td>
                      <div
                        className="d-flex flex-row justify-content-space-between align-self-stretch "
                        style={{
                          columnGap: "10px",
                        }}
                      >
                        <Button
                          variant="warning"
                          size="sm"
                          style={{ width: "100%" }}
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setSalary(employee.baseSalary);
                            setBonus(employee.bonus);
                            setDeductions(employee.deductions);
                            setShowModal(true);
                            handleEditClick(employee);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="warning"
                          onClick={() => generateInvoice(employee)}
                          style={{
                            width: "100%",
                            backgroundColor: "green",
                            borderColor: "green",
                            color: "white",
                          }}
                          size="sm"
                          // onClick={() => {
                          //   // setSelectedEmployee(employee);
                          //   // setSalary(employee.baseSalary);
                          //   // setBonus(employee.bonus);
                          //   // setDeductions(employee.deductions);
                          //   // setShowModal(true);
                          //   // handleEditClick(employee);
                          // }}
                        >
                          <FontAwesomeIcon
                            icon={faFileArrowDown}
                          ></FontAwesomeIcon>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Payroll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Base Salary</Form.Label>
              <Form.Control
                type="number"
                value={salary}
                onChange={(e) => {
                  setSalary(e.target.value);
                  handleInputChange("baseSalary", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bonus</Form.Label>
              <Form.Control
                type="number"
                value={bonus}
                onChange={(e) => {
                  setBonus(e.target.value);
                  handleInputChange("bonus", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Deductions</Form.Label>
              <Form.Control
                type="number"
                value={deductions}
                onChange={(e) => {
                  setDeductions(e.target.value);
                  handleInputChange("deductions", e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button onClick={savePayroll} variant="success">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Payroll;
