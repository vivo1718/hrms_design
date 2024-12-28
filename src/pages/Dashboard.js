import "./Dashboard.css";
// import image from '../assets/man.jpg';
import Stack from "react-bootstrap/Stack";
import { PieChart, Pie, Cell } from "recharts";
import imageName from "../assets/outdoor.png";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { auth, db } from "../components/firebase";
import React, { useEffect, useState } from "react";
import img4 from "../assets/loads3.svg";
import { toast, ToastContainer } from "react-toastify";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button, Row, Col, ProgressBar } from "react-bootstrap";
import { faNfcDirectional } from "@fortawesome/free-brands-svg-icons";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  faHome,
  faUsers,
  faCog,
  faEnvelope,
  faClipboardUser,
  faPersonWalking,
  faUserPen,
  faUserPlus,
  faPersonSnowboarding,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const data = [
    { day: "Monday", Present: 25, Absent: 10, Late: 10 },
    { day: "Tuesday", Present: 20, Absent: 5, Late: 30 },
    { day: "Wednesday", Present: 10, Absent: 20, Late: 5 },
    { day: "Thursday", Present: 30, Absent: 4, Late: 12 },
    { day: "Friday", Present: 7, Absent: 11, Late: 12 },
  ];
  const processData = data.map((item) => ({
    ...item,
    gap1: 2,
    gap2: 2,
  }));
  const data2 = [
    { name: "Male", value: 40 },
    { name: "Female", value: 30 },
  ];
  const COLORS = ["#000", "#FF8042"];
  const navigate = useNavigate();

  //firebase user loginin details after successfully logged in
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch the authenticated user directly
    const currentUser = getAuth().currentUser;

    if (currentUser) {
      setUserId(currentUser.uid); // Set the user ID from Firebase Auth
    } else {
      console.log("User not authenticated");
    }
  }, []);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (!user) {
        console.log("User not logged in");
        setUserDetails(null);
        return;
      }
      // setUserDetails(user);
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          // setLoading(false);
          console.log("Datas Below");
          console.log(docSnap.data());
        } else {
          //setLoading(true);
          setUserDetails(null);
          console.log("User not logged in");
        }
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    });
  };

  const [totalEmployees, setTotalEmployees] = useState(0);
  //const [loading, setLoading] = useState(true);

  // Fetch the total number of employees for a specific userId
  useEffect(() => {
    if (!userId) {
      return; // Return early if no userId is set
    }

    const fetchEmployeeCount = async () => {
      try {
        // Get the employees subcollection of the specific user
        const employeesRef = collection(db, "users", userId, "employees");
        const snapshot = await getDocs(employeesRef);

        // Check if the snapshot is empty
        if (snapshot.empty) {
          console.log("No employees found");
          setTotalEmployees(0);
        } else {
          setTotalEmployees(snapshot.size); // Get the number of documents in the collection
        }
      } catch (error) {
        console.error("Error fetching employee count: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchEmployeeCount(); // Call the function to fetch the count
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDetails(user.uid);
        // setLoading(false);// Set the current user's ID
      } else {
        // navigate("/login");
        // Redirect to login if not authenticated
      }
    });
    return () => unsubscribe(); // Cleanup the subscription
  }, [auth, navigate]);

  if (!userDetails) {
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

  async function handleLoggedOut() {
    try {
      await auth.signOut();
      setUserDetails(null);
      navigate("/login");
      toast.success("Logged out successfully");
      // window.location.href= './Login';
      console.log("Logged out successfully");
    } catch (error) {
      console.log("Error logging out".error.message);
    }
  }

  return (
    <div className="dashboard-container">
      <ToastContainer />
      {/* Sidebar Placeholder */}
      {/* Main Content */}

      {userDetails ? (
        <>
          <div className="dash_row">
            <div className="r1">
              <div className="icon">
                <img height="100%" width="100%" src={userDetails.photo}></img>
              </div>
              <div className="text">
                Welcome to the dashboard, {userDetails.firstName}
                <p className="sub">Lets manage your employees in one place</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                className="logout"
                onClick={handleLoggedOut}
                variant="warning"
              >
                Log out
              </Button>
            </div>
          </div>
          <Row className="row_parent ">
            <Col sm={12} lg={4}>
              <Col
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
              >
                <Row>
                  <Card className="dash_card ">
                    <div className="icon_bar">
                      <FontAwesomeIcon
                        icon={faUsers}
                        className="icon_back"
                      ></FontAwesomeIcon>
                    </div>
                    <p className="emp">{totalEmployees}</p>
                    <Card.Title className="card_title">
                      Total Employees
                    </Card.Title>
                  </Card>
                </Row>
              </Col>
              <Col
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
              >
                <Row>
                  <Card className="dash_card">
                    <div className="icon_bar">
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        className="icon_back"
                      ></FontAwesomeIcon>
                    </div>
                    <p className="emp">1232</p>
                    <Card.Title className="card_title">
                      {" "}
                      Employess Added
                    </Card.Title>
                  </Card>
                </Row>
              </Col>
            </Col>
            <Col>
              <Col
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
              >
                <Row>
                  <Card className="dash_card">
                    <div className="icon_bar">
                      <FontAwesomeIcon
                        icon={faPersonWalking}
                        className="icon_back"
                      ></FontAwesomeIcon>
                    </div>
                    <p className="emp">1232</p>
                    <Card.Title className="card_title">Total Leaves</Card.Title>
                  </Card>
                </Row>
              </Col>
              <Col
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
              >
                <Row>
                  <Card className="dash_card">
                    <div className="icon_bar">
                      <FontAwesomeIcon
                        icon={faPersonSnowboarding}
                        className="icon_back"
                      ></FontAwesomeIcon>
                    </div>
                    <p className="emp">1232</p>
                    <Card.Title className="card_title">Payroll</Card.Title>
                  </Card>
                </Row>
              </Col>
            </Col>
            <Col sm={12} lg={4}>
              <Card className="attend">
                <Card.Subtitle className="stitle_attend">
                  Your Attendance
                </Card.Subtitle>
                <Card.Title className="title_attend">02:15:10</Card.Title>

                <div className="div_attend">
                  <Row>
                    <Col>
                      <p className="timing">Break Time:</p>
                    </Col>
                    <Col>
                      <p className="timing">01:00 PM - 01:45PM(45 min)</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="timing">Target Hours:</p>
                    </Col>
                    <Col>
                      <p className="timing">08 H: 15M(Per Day)</p>
                    </Col>
                  </Row>
                </div>
                <div className="buttons ">
                  <Button className="b1">Break</Button>
                  <Button className="b2">Clock Out</Button>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col
              sm={12}
              lg={5}
              style={{
                backgroundColor: "white",
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "10px",
              }}
            >
              <h6
                style={{
                  fontWeight: "bold",
                  marginTop: "10px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Attendance Overview
              </h6>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={processData}
                  margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="day"
                    stroke="#A59D84"
                    tick={{
                      fontSize: "12px",
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: "bold",
                    }}
                  />
                  <YAxis
                    stroke="#A59D84"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: "12px",
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: "bold",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Present"
                    stackId="a"
                    fill="#82dc8d"
                    barSize={15}
                  />
                  <Bar
                    dataKey="gap1"
                    stackId="a"
                    fill="transparent"
                    barSize={15}
                  />
                  <Bar
                    dataKey="Absent"
                    stackId="a"
                    fill="#8274f8"
                    barSize={15}
                  />
                  <Bar
                    dataKey="gap2"
                    stackId="a"
                    fill="transparent"
                    barSize={15}
                  />
                  <Bar dataKey="Late" stackId="a" fill="#ff8042" barSize={15} />
                </BarChart>
              </ResponsiveContainer>
            </Col>
            <Col
              sm={12}
              lg={5}
              style={{
                backgroundColor: "white",
                marginTop: "10px",
                marginLeft: "15px",
                marginRight: "15px",
                padding: "20px",
              }}
            >
              <h6
                style={{
                  fontWeight: "bold",
                  marginTop: "10px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Gender By Employees
              </h6>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={data2}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    fill="#8884d8"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={"cell-${index}"}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Col>
          </Row>
          <div
            style={{
              marginTop: "10px",
              backgroundColor: "#fff",
              paddingBottom: "10px",
            }}
          >
            <h6
              style={{
                fontWeight: "bold",
                marginTop: "10px",
                marginLeft: "10px",
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              Top Performing Emplouees
            </h6>
            <Row style={{ marginTop: "20px" }}>
              <Col sm={6} lg={3} className="stars">
                <div
                  className="emp1"
                  style={{
                    height: "5rem",
                    width: "5rem",
                    backgroundColor: "green",
                    borderRadius: "2.5rem",
                  }}
                ></div>
                <p style={{ fontWeight: "bold", marginTop: "5px" }}>
                  Jone ebar
                </p>
                <h6
                  style={{
                    fontWeight: "bolder",
                    marginTop: "-5px",
                    color: "#FF8042",
                  }}
                >
                  80%
                </h6>
              </Col>
              <Col sm={6} lg={3} className="stars">
                {" "}
                <div
                  className="emp1"
                  style={{
                    height: "5rem",
                    width: "5rem",
                    backgroundColor: "green",
                    borderRadius: "2.5rem",
                  }}
                ></div>
                <p style={{ fontWeight: "bold", marginTop: "5px" }}>
                  Jone ebar
                </p>
                <h6
                  style={{
                    fontWeight: "bolder",
                    marginTop: "-5px",
                    color: "#FF8042",
                  }}
                >
                  80%
                </h6>
              </Col>
              <Col sm={6} lg={3} className="stars">
                {" "}
                <div
                  className="emp1"
                  style={{
                    height: "5rem",
                    width: "5rem",
                    backgroundColor: "green",
                    borderRadius: "2.5rem",
                  }}
                ></div>
                <p style={{ fontWeight: "bold", marginTop: "5px" }}>
                  Jone ebar
                </p>
                <h6
                  style={{
                    fontWeight: "bolder",
                    marginTop: "-5px",
                    color: "#FF8042",
                  }}
                >
                  80%
                </h6>
              </Col>
              <Col sm={6} lg={3} className="stars">
                {" "}
                <div
                  className="emp1"
                  style={{
                    height: "5rem",
                    width: "5rem",
                    backgroundColor: "green",
                    borderRadius: "2.5rem",
                  }}
                ></div>
                <p style={{ fontWeight: "bold", marginTop: "5px" }}>
                  Jone ebar
                </p>
                <h6
                  style={{
                    fontWeight: "bolder",
                    marginTop: "-5px",
                    color: "#FF8042",
                  }}
                >
                  80%
                </h6>
              </Col>
              <Col sm={6} lg={3} className="stars">
                {" "}
                <div
                  className="emp1"
                  style={{
                    height: "5rem",
                    width: "5rem",
                    backgroundColor: "green",
                    borderRadius: "2.5rem",
                  }}
                ></div>
                <p style={{ fontWeight: "bold", marginTop: "5px" }}>
                  Jone ebar
                </p>
                <h6
                  style={{
                    fontWeight: "bolder",
                    marginTop: "-5px",
                    color: "#FF8042",
                  }}
                >
                  80%
                </h6>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <div className="d-flex mt-3 mb-3 justify-content-center align-items-center ">
          <p>Please Login to come here</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
