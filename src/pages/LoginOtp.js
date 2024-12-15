import React, { useState } from "react";
import {  RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { Button, FloatingLabel ,Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
const LoginOtp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  // Set up reCAPTCHA verifier
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal", // Use "invisible" or "normal" based on your UI
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
          },
          'expired-callback': () => {
            console.log("reCAPTCHA expired. Please resolve again.");
          },
        },
        auth
      );
    }
  };

  const sendOtp = () => {
    if (!phoneNumber.startsWith("+")) {
      alert("Please include your country code (e.g., +1234567890)");
      return;
    }

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
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }
    const credential = PhoneAuthProvider.credential(verificationId, otp);

    signInWithCredential(auth, credential)
      .then((result) => {
        console.log("User signed in successfully:", result.user);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
      });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center  "
    style={{
      height:'100vh'
    }}
    >
      <h5 style={{
            fontFamily: '"Poppins", sans-serif'

      }} >Verify Your Phone</h5> 
      <div id="recaptcha-container"></div>

      {!isOtpSent ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
         <div className="d-flex justify-content-center align-items-center " style={{
          backgroundColor:'#fff',
          height:'6rem',
          borderRadius:'3rem',
          marginBottom:'20px',
          width:'6rem'
         }}> 
         <FontAwesomeIcon icon={faCertificate} style={{color:'#B197FC',
          height:'3rem',
          width:'3rem'
         }} ></FontAwesomeIcon>
         </div>
<Form className="d-flex flex-column" style={{width:'20rem'}}>
            <FloatingLabel >
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            style={{
              color:'#000'
            }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}>
            </Form.Control></FloatingLabel></Form>
          <div className="d-flex justify-content-center align-self-stretch mt-2" ><Button style={{width:'100%'}} onClick={sendOtp}>Send OTP</Button></div>
        </div>
      ) : (
        <div>
          <FloatingLabel >
          <Form.Control
            type="text"
            placeholder="Verify OTP"
            style={{
              color:'#000'
            }}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}>
            </Form.Control></FloatingLabel>
            <div className="d-flex justify-content-center align-self-stretch mt-2" ><Button style={{width:'100%'}} onClick={verifyOtp}>Send OTP</Button></div>

        </div>
      )}
    </div>
  );
};

export default LoginOtp;
