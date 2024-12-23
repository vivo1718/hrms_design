import React from 'react';
import { useState } from 'react';
import { FloatingLabel,Form, Card , Button } from 'react-bootstrap';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { GoogleAuthProvider, getAuth , signInWithPopup , RecaptchaVerifier , signInWithEmailAndPassword , signInWithPhoneNumber , PhoneAuthProvider , signInWithCredential} from 'firebase/auth';
import { auth,db } from '../components/firebase';
import 'react-toastify/dist/ReactToastify.css';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Login() {
  const[login, setlogin] = useState(false);
  function googleLogin(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider).then(async(result)=>{
     console.log(result);
     const user = result.user;
     if(user){
      await setDoc(doc(db,"Users", user.uid),{
        email: user.email,
        firstName: user.displayName,
        photo: user.photoURL,
      }

      );
      toast.success("user logged in successfully",{
        position:"top-center"
      });
      setlogin(!login);
      window.location.href="/Dashboard"
     }
    });
  }
 const [showLoginButton, setShowLoginButton] = useState(false);
 const [isLoginMode, setIsLoginMode] = useState(true);
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');

  const handleToggleLoginButton = () => {
    setShowLoginButton(!showLoginButton);
  };
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
   
   
  const bac_reg = ()=>{
    window.location.href= './register';
  }

  //Login using OTP
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const auth = getAuth();
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
      window.location.href="/Dashboard";
      toast.success("Login successful!", { position: "top-right" });
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        toast.error("No user found with this email.", { position: "top-right" });
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password.", { position: "top-right" });
      }
      else if (err.code === "auth/popup-closed-by-user") {
        toast.error("Sign in pop-up was closed by user.", { position: "top-right" });
      }
       else {
        toast.error("Login failed. Please try again.", { position: "top-right" });
      }
    }
  };
  const navigate = useNavigate();

  const opt = ()=>{
    navigate('/login_with_otp');
  }

  const toggleFormMode = () => {
    setIsLoginMode(!isLoginMode);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };


  return (
    <div className='login_dash'>

      
         
          
          <Card className="card_login">

<div className='card_t mt-2'> <p className=" title2">HR Manage</p> </div>
<Form onSubmit={handleLogin}>
 <FloatingLabel
 controlId="floatingInput"       
 label="Email address"
 className="mb-3"
>
 <Form.Control type="email" placeholder="enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
</FloatingLabel>
<FloatingLabel controlId="floatingPassword" label="Password">
 <Form.Control type="password" placeholder="Enter your password"  value={password} onChange={(e) => setPassword(e.target.value)} />
</FloatingLabel>
<br></br>
</Form>
<ToastContainer/>
<div className="or1"><p onClick={bac_reg} >Dont have an account?</p></div>
<Button className='log_button' size='lg' onClick={handleLogin}>Login</Button>
<div style={{
  height:'1px',
  width:'100%',
  marginTop:'10px',
  backgroundColor:'gray'
}} ></div>
<div className=' g-log d-flex flex-row justify-content-center align-items-center  ' 
style={{
  columnGap:'10px',
  width:'100%',
  height:'3rem',
  backgroundColor:'#fff',
  fontFamily: '"Poppins", sans-serif',
  color:'black',
  fontWeight:'bold',
  cursor:'pointer',
  borderRadius:'10px'
}}
onClick={googleLogin}>
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>

  Sign in with Google
</div>
<div className='d-flex justify-content-center mt-2 mb-2' ><Button className='log_otp3' style={{
  width:'100%',
  height:'3rem'
}}  size='lg' onClick={opt} >Login using OTP</Button></div>

 </Card>
          
        

    </div>
  )
}

export default Login