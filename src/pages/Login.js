import "./Login.css";
import React from "react";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../components/firebase";
import { toast, ToastContainer } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FloatingLabel, Form, Card, Button } from "react-bootstrap";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  browserLocalPersistence,
  signInWithCredential,
  setPersistence,
  onAuthStateChanged,
  GithubAuthProvider,
} from "firebase/auth";

function Login() {
  const [login, setlogin] = useState(false);

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
        });
        toast.success("user logged in successfully", {
          position: "top-center",
        });
        setlogin(!login);
        window.location.href = "/dashboard";
      }
    });
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setlogin(true); // User is logged in
      } else {
        setlogin(false); // User is logged out
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  
  
  const githubProvider = new GithubAuthProvider();
   const githubsignin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);

      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      console.log("GitHub user details:", user);
        window.location.href = "/dashboard";
      // Perform additional actions, like saving user info to a database
    } catch (error) {
      console.error("GitHub sign-in error:", error);
    }
  };

  const [showLoginButton, setShowLoginButton] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleToggleLoginButton = () => {
    setShowLoginButton(!showLoginButton);
  };
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const bac_reg = () => {
    window.location.href = "./register";
  };

  //Login using OTP
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  // const auth = getAuth();
  // Set up reCAPTCHA verifier
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA verified");
        },
      },
      auth
    );
  };

  const sendOtp = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setIsOtpSent(true);
        console.log("OTP sent successfully");
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  const verifyOtp = () => {
    const credential = PhoneAuthProvider.credential(verificationId, otp);

    signInWithCredential(auth, credential)
      .then((result) => {
        console.log("User signed in successfully:", result.user);
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/dashboard";
      toast.success("Login successful!", { position: "top-right" });
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        toast.error("No user found with this email.", {
          position: "top-right",
        });
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password.", { position: "top-right" });
      } else if (err.code === "auth/popup-closed-by-user") {
        toast.error("Sign in pop-up was closed by user.", {
          position: "top-right",
        });
      } else {
        toast.error("Login failed. Please try again.", {
          position: "top-right",
        });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully!", { position: "top-right" });
    } catch (err) {
      toast.error("Logout failed. Please try again.", {
        position: "top-right",
      });
    }
  };
  const navigate = useNavigate();

  const opt = () => {
    navigate("/login_with_otp");
  };

  const toggleFormMode = () => {
    setIsLoginMode(!isLoginMode);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login_dash">
      {login ? (
        <Card className="card_login">
          <div className="card_t mt-2">
            <p className="title2">HR Manage</p>
          </div>
          <hr style={{ backgroundColor: "#000" }} />
          <div className="text-center">
            <p>You are already logged in!</p>
            <Button
              className="log_button"
              size="lg"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
            <Button
              className="log_button mt-3"
              size="lg"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="card_login">
          <div className="card_t mt-3">
            {" "}
            <p className=" title2">HR Manage</p>{" "}
          </div>
          <Form onSubmit={handleLogin}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-2"
            >
              <Form.Control
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
            <br></br>
          </Form>
          <ToastContainer />
          <div className="or1">
            <p onClick={bac_reg}>Dont have an account?</p>
          </div>
          <Button className="log_button" size="lg" onClick={handleLogin}>
            Login
          </Button>

          <div
            className=" g-log d-flex flex-row justify-content-center align-items-center  "
            style={{
              columnGap: "10px",
              width: "100%",
              marginTop: "1rem",
              height: "3rem",
              backgroundColor: "#fff",
              fontFamily: '"Poppins", sans-serif',
              color: "black",
              fontWeight: "bold",
              border: "1px solid #000",
              cursor: "pointer",
            }}
            onClick={googleLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Sign in with Google
          </div>
          <div
            className=" g-log d-flex flex-row justify-content-center align-items-center  "
            style={{
              columnGap: "10px",
              width: "100%",
              marginTop: "1rem",
              height: "3rem",
              backgroundColor: "#1f1f1f",
              fontFamily: '"Poppins", sans-serif',
              color: "#fff",
              fontWeight: "bold",
              border: "1px solid #000",
              cursor: "pointer",
            }}
            onClick={githubsignin}
          >
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48">
<linearGradient id="SVGID_1__D5XsEXNbhkMI_gr1" x1="37.087" x2="10.76" y1="10.967" y2="37.294" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6560fe"></stop><stop offset=".033" stop-color="#6f6afe"></stop><stop offset=".197" stop-color="#9a97fe"></stop><stop offset=".362" stop-color="#bfbdff"></stop><stop offset=".525" stop-color="#dbdaff"></stop><stop offset=".687" stop-color="#efeeff"></stop><stop offset=".846" stop-color="#fbfbff"></stop><stop offset="1" stop-color="#fff"></stop></linearGradient><circle cx="23.924" cy="24.13" r="18.615" fill="url(#SVGID_1__D5XsEXNbhkMI_gr1)"></circle><path fill="none" stroke="#8251fe" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M35.054,38.836C31.97,41.137,28.144,42.5,24,42.5C13.783,42.5,5.5,34.217,5.5,24	c0-2.917,0.675-5.676,1.878-8.13"></path><path fill="none" stroke="#8251fe" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13.869,8.518C16.779,6.61,20.26,5.5,24,5.5c10.217,0,18.5,8.283,18.5,18.5c0,2.941-0.686,5.721-1.907,8.19"></path><path fill="#8251fe" d="M34,23c0-1.574-0.576-3.038-1.558-4.275c0.442-1.368,0.93-3.771-0.242-5.648c-2.251,0-3.73,1.545-4.436,2.514	C26.602,15.213,25.333,15,24,15s-2.602,0.213-3.764,0.591c-0.706-0.969-2.184-2.514-4.436-2.514c-1.328,2.126-0.526,4.45-0.073,5.43	C14.638,19.788,14,21.334,14,23c0,3.78,3.281,6.94,7.686,7.776c-1.309,0.673-2.287,1.896-2.587,3.38h-1.315	c-1.297,0-1.801-0.526-2.502-1.415c-0.692-0.889-1.437-1.488-2.331-1.736c-0.482-0.051-0.806,0.316-0.386,0.641	c1.419,0.966,1.516,2.548,2.085,3.583C15.168,36.161,16.229,37,17.429,37H19v5.942h10v-7.806c0-1.908-1.098-3.544-2.686-4.36	C30.719,29.94,34,26.78,34,23z"></path>
</svg>            Sign in with Github
          </div>
          <div className="d-flex justify-content-center mt-2 mb-2">
            <Button
              className="log_otp3"
              style={{
                width: "100%",
                height: "3rem",
              }}
              size="lg"
              onClick={opt}
            >
              Login using OTP
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default Login;
