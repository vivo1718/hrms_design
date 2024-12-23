import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Spinner , Row, Col, Form, Table, Modal } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { db } from '../components/firebase'; // Firebase config
import { collection, addDoc, getDocs, updateDoc, doc  } from 'firebase/firestore';
import { onAuthStateChanged , getAuth } from 'firebase/auth';
import {ToastContainer , toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Attendance.css';
const Attendance = ({ employeeId }) => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [leaveModalShow, setLeaveModalShow] = useState(false);
  const [leaveReason, setLeaveReason] = useState("");
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [adminView, setAdminView] = useState(false);
  const [userId, setUserId] = useState(null);
   
  const navigate = useNavigate();
  const auth = getAuth();

  // Check for authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the current user's ID
      } else {
        toast.warning("Please Login to View Attendance");
        navigate("/login"); // Redirect to login if not authenticated
      }
    });
    return () => unsubscribe(); // Cleanup the subscription
  }, [auth, navigate]);


  const fetchAttendance = async () => {
    if (!userId) return;

    try {
      const attendanceRef = collection(db, "users", userId, "employees");
      const querySnapshot = await getDocs(attendanceRef);
      const history = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAttendanceHistory(history);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // Load data when userId is set
  useEffect(() => {
    //fetchEmployees();
    fetchAttendance();
  }, [userId]);

  // Handle clock-in
  const handleClockIn = async () => {
    const clockIn = new Date();
    setClockInTime(clockIn.toISOString());
    setIsClockedIn(true);

    await addDoc(collection(db, 'attendance'), {
      employeeId,
      clockInTime: clockIn.toISOString(),
      clockOutTime: null,
      status: 'Present',
      date: clockIn.toLocaleDateString(),
      isLate: clockIn.getHours() > 9 ? true : false, // Mark late if clock-in after 9 AM
    });
  };

  // Handle clock-out
  const handleClockOut = async () => {
    const clockOut = new Date();
    setClockOutTime(clockOut.toISOString());
    setIsClockedIn(false);

    const todayRecord = attendanceHistory.find(record => record.date === clockOut.toLocaleDateString());
    if (todayRecord) {
      const overtime = Math.max(0, (clockOut - new Date(todayRecord.clockInTime)) / (1000 * 60 * 60) - 8);
      setOvertimeHours(overtime);

      const recordDoc = doc(db, 'attendance', todayRecord.id);
      await updateDoc(recordDoc, {
        clockOutTime: clockOut.toISOString(),
        overtimeHours: overtime,
      });
    }
  };

  // Apply for leave
  const applyForLeave = async () => {
    const leaveDate = new Date().toLocaleDateString();
    await addDoc(collection(db, 'attendance'), {
      employeeId,
      date: leaveDate,
      status: 'Leave',
      leaveReason,
    });
    setLeaveModalShow(false);
    setLeaveReason("");
  };

  // Export CSV
  const exportAttendanceCSV = () => {
    const data = attendanceHistory.map(record => ({
      Name: record.name,
      "Clock In": record.clockInTime || "N/A",
      "Clock Out": record.clockOutTime || "N/A",
      "Hours Worked": record.overtimeHours || "N/A",
      Status: record.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, "Attendance.csv");
  };

  return (
    <div style={{
      height:'100vh',
      padding:'20px',
      fontFamily: '"Poppins", sans-serif',

    }}>
      <h5 className="text-start " style={{
        fontWeight:'bold',
        marginBottom:'20px'
      }}>Attendance</h5>

      <div  className='st' style={{
        borderRadius:'10px',
        marginbottom:'10px',
        padding:'20px'
      }} >
      <Row className="mb-4 justify-content-center">
        <Col className=" mb-2 " md={4} lg={4}>
          <Button
            style={{fontSize:"12px"}}
            variant={isClockedIn ? 'danger' : 'success'}
            onClick={isClockedIn ? handleClockOut : handleClockIn}
            className="w-100"
          >
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </Button>
        </Col>
        <Col className=" mb-2 " md={4} lg={4}>
          <Form.Control
            type="text"
            placeholder="Search by Date"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col className=" mb-2 " md={4} lg={4} >
          <Button  variant='success' style={{
            
            fontSize:'12px'
          }} onClick={() => setLeaveModalShow(true)} className="w-100">
            Apply for Leave
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Button style={{
            backgroundColor:'#ff7e5f',
            borderColor:'#ff7e57',
            fontSize:'12px',
            color:'#fff'
          }} onClick={() => setAdminView(!adminView)} className="w-100">
            {adminView ? "Employee View" : "Admin View"}
          </Button>
        </Col>
        {adminView && (
          <Col>
            <Button 
            style={{
              fontSize:'12px'
            }}
            variant="success" onClick={exportAttendanceCSV} className="w-100">
              Export as CSV
            </Button>
          </Col>
        )}
      </Row>
      </div>

      {adminView ? (
        <>
          <h6 className=" mt-3 mb-3 " style={{
          fontFamily: '"Poppins", sans-serif ',


          }} >Admin Dashboard</h6>
          <Table striped bordered hover>
            <thead style={{
                  fontFamily: '"Poppins", sans-serif ',
                  fontSize:'15px'

            }}>
              <tr >
                <th>Name</th>
                <th>Emmployee email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Reason (if Leave)</th>
              </tr>
            </thead>
            <tbody style={{
                  fontFamily: '"Poppins", sans-serif ',
                  fontSize:'12px',

            }}>
              {attendanceHistory.map((record, index) => (
                <tr key={index}>
                  <td>{record.name}</td>
                  <td>{record.email}</td>
                  <td>{record.department}</td>
                  <td>{record.position || "N/A"}</td>
                  <td>{record.leaveReason || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <>
          <h6 className='mb-3 mt-3' >Attendance History</h6>
          <Row className='d-flex justify-content-center '>
            {attendanceHistory.length === 0 ? (
              <div className=" d-flex flex-column justify-content-center align-items-center " style={{width:'100%'}}><Spinner animation='border' size='sm'  role="status">
                </Spinner><p>Loading data</p>
                </div>
            ) : (
              attendanceHistory.map((record, index) => (
                <Col key={index} xs={12} sm={6} md={6} lg={4}>
                  <Card className=" col_out mb-3">
                    <Card.Body>
                      <Card.Title className="font2">{record.name}</Card.Title>
                      <hr style={{backgroundColor:'#000'}}/>
                      <Card.Text className="fontf3"><strong>email:</strong> {record.email}</Card.Text>
                      <Card.Text className="fontf3"><strong>Department:</strong> {record.department || "N/A"}</Card.Text>
                       <Card.Text className="fontf3"><strong>Position:</strong> {record.position}</Card.Text>
                      <Button style={{width:'100%', fontSize:'12px'}} variant="warning">Total working days : 30</Button>
                      <div className="d-flex flex-row justify-content-center align-self-stretch mt-2 " style={{columnGap:'10px'}} ><Button  style={{width:'100%', fontSize:'12px'}} variant="success">Present: 27</Button>
                      <Button style={{width:'100%', fontSize:'12px'}} variant="danger">Absent Days: 3</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </>
      )}

      {/* Leave Modal */}
      <Modal style={{
      }} show={leaveModalShow} onHide={() => setLeaveModalShow(false)}>
        <Modal.Header  closeButton>
          <Modal.Title >Apply for Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Reason for Leave</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="error" onClick={() => setLeaveModalShow(false)}>Cancel</Button>
          <Button variant="success" onClick={applyForLeave}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Attendance;

// import React, { useState, useEffect } from 'react';
// import { Button, Card, Container, Spinner, Row, Col, Form, Table, Modal } from 'react-bootstrap';
// import * as XLSX from 'xlsx';
// import { db } from '../components/firebase'; // Firebase config
// import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
// import { onAuthStateChanged, getAuth } from 'firebase/auth';
// import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import './Attendance.css';

// const Attendance = ({ employeeId }) => {
//   const [attendanceHistory, setAttendanceHistory] = useState([]);
//   const [clockInTime, setClockInTime] = useState(null);
//   const [isClockedIn, setIsClockedIn] = useState(false);
//   const [search, setSearch] = useState("");
//   const [leaveModalShow, setLeaveModalShow] = useState(false);
//   const [leaveReason, setLeaveReason] = useState("");
//   const [adminView, setAdminView] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [presentDays, setPresentDays] = useState(0);
//   const [absentDays, setAbsentDays] = useState(0);
//   const [totalWorkingDays, setTotalWorkingDays] = useState(0);

//   const navigate = useNavigate();
//   const auth = getAuth();

//   // Authenticate user
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid);
//       } else {
//         toast.warning("Please login to view attendance");
//         navigate("/login");
//       }
//     });
//     return () => unsubscribe();
//   }, [auth, navigate]);

//   // Fetch attendance and fill missing days
//   const fetchAttendance = async () => {
//     if (!userId) return;

//     try {
//       const attendanceRef = collection(db, 'users', userId, 'attendance');
//       const querySnapshot = await getDocs(attendanceRef);
//       let history = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       // Fill missing weekdays with default "Absent"
//       const today = new Date();
//       const year = today.getFullYear();
//       const month = today.getMonth();
//       let weekdays = [];

//       for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
//         const current = new Date(year, month, day);
//         if (current.getDay() !== 0 && current.getDay() !== 6) {
//           weekdays.push(current.toLocaleDateString());
//         }
//       }

//       weekdays.forEach(date => {
//         if (!history.some(record => record.date === date)) {
//           history.push({
//             date,
//             status: 'Absent',
//             clockInTime: null,
//             clockOutTime: null,
//           });
//         }
//       });

//       setAttendanceHistory(history);
//       calculateAttendanceStats(history);
//     } catch (error) {
//       console.error("Error fetching attendance:", error);
//     }
//   };

//   // Calculate attendance stats
//   const calculateAttendanceStats = (history) => {
//     const present = history.filter(record => record.status === 'Present').length;
//     const leave = history.filter(record => record.status === 'Leave').length;
//     const absent = history.filter(record => record.status === 'Absent').length;

//     setPresentDays(present);
//     setAbsentDays(absent);
//     setTotalWorkingDays(present + leave + absent);
//   };

//   useEffect(() => {
//     fetchAttendance();
//   }, [userId]);

//   // Handle Clock-In
//   const handleClockIn = async () => {
//     const clockIn = new Date();
//     setClockInTime(clockIn.toISOString());
//     setIsClockedIn(true);

//     try {
//       const today = clockIn.toLocaleDateString();
//       const attendanceRef = collection(db, 'users', userId, 'attendance');
//       const existingRecordSnapshot = await getDocs(attendanceRef);
//       const existingRecord = existingRecordSnapshot.docs.find(
//         doc => doc.data().date === today
//       );

//       if (existingRecord) {
//         await updateDoc(doc(db, 'users', userId, 'attendance', existingRecord.id), {
//           clockInTime: clockIn.toISOString(),
//           status: 'Present',
//         });
//       } else {
//         await addDoc(attendanceRef, {
//           employeeId,
//           clockInTime: clockIn.toISOString(),
//           clockOutTime: null,
//           status: 'Present',
//           date: today,
//           isLate: clockIn.getHours() > 9, // Late if after 9 AM
//         });
//       }
//       toast.success("Clocked In!");
//       fetchAttendance();
//     } catch (error) {
//       console.error("Error during clock-in:", error);
//       toast.error("Failed to clock in.");
//     }
//   };

//   // Apply for Leave
//   const applyForLeave = async () => {
//     const leaveDate = new Date().toLocaleDateString();

//     try {
//       const attendanceRef = collection(db, 'users', userId, 'attendance');
//       const existingRecordSnapshot = await getDocs(attendanceRef);
//       const existingRecord = existingRecordSnapshot.docs.find(
//         doc => doc.data().date === leaveDate
//       );

//       if (existingRecord) {
//         await updateDoc(doc(db, 'users', userId, 'attendance', existingRecord.id), {
//           status: 'Leave',
//           leaveReason,
//         });
//       } else {
//         await addDoc(attendanceRef, {
//           employeeId,
//           date: leaveDate,
//           status: 'Leave',
//           leaveReason,
//         });
//       }

//       toast.success("Leave Applied!");
//       setLeaveModalShow(false);
//       setLeaveReason("");
//       fetchAttendance();
//     } catch (error) {
//       console.error("Error applying for leave:", error);
//       toast.error("Failed to apply for leave.");
//     }
//   };

//   // Export CSV
//   const exportAttendanceCSV = () => {
//     const data = attendanceHistory.map(record => ({
//       Name: record.name || "N/A",
//       "Clock In": record.clockInTime || "N/A",
//       "Clock Out": record.clockOutTime || "N/A",
//       "Status": record.status,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
//     XLSX.writeFile(workbook, "Attendance.csv");
//   };

//   return (
//     <div style={{ height: '100vh', padding: '20px', fontFamily: '"Poppins", sans-serif' }}>
//       <h5 className="text-start" style={{ fontWeight: 'bold', marginBottom: '20px' }}>Attendance</h5>

//       <Row className="mb-4 justify-content-center">
//         <Col md={4}>
//           <Button
//             variant={isClockedIn ? 'danger' : 'success'}
//             onClick={isClockedIn ? () => setIsClockedIn(false) : handleClockIn}
//             className="w-100"
//           >
//             {isClockedIn ? 'Clock Out' : 'Clock In'}
//           </Button>
//         </Col>
//         <Col md={4}>
//           <Form.Control
//             type="text"
//             placeholder="Search by Date"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </Col>
//         <Col md={4}>
//           <Button variant="success" onClick={() => setLeaveModalShow(true)} className="w-100">
//             Apply for Leave
//           </Button>
//         </Col>
//       </Row>

//       <Row className="mb-4">
//         <Col>
//           <Button
//             style={{ fontSize: '12px' }}
//             variant="success"
//             onClick={exportAttendanceCSV}
//             className="w-100"
//           >
//             Export as CSV
//           </Button>
//         </Col>
//       </Row>

//       {/* Attendance Table */}
//       <h6>Attendance History</h6>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Clock In</th>
//             <th>Clock Out</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceHistory.map((record, index) => (
//             <tr key={index}>
//               <td>{record.date}</td>
//               <td>{record.status}</td>
//               <td>{record.clockInTime || 'N/A'}</td>
//               <td>{record.clockOutTime || 'N/A'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Leave Modal */}
//       <Modal show={leaveModalShow} onHide={() => setLeaveModalShow(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Apply for Leave</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Reason for Leave</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={leaveReason}
//                 onChange={(e) => setLeaveReason(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setLeaveModalShow(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={applyForLeave}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Attendance;













