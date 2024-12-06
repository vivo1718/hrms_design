import React from 'react';
import { useState } from 'react';
import { FloatingLabel,Form, Card , Button } from 'react-bootstrap';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { GoogleAuthProvider, signInWithPopup , createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../components/firebase';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
function Login() {
  const[login, setlogin] = useState(false);
  function googleLogin(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider).then(async(result)=>{
     console.log(result);
     if(result.user){
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess("");
     // Clear previous success messages
     if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-right" });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Registration successful!");
      window.location.href="/Dashboard"
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.warning("Email is already registered.", {
          position: "top-right",
        });
      } else {
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
        });
      }
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-right" });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href="/Dashboard";
      toast.success("Login successful!", { position: "top-right" });
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        toast.error("No user found with this email.", { position: "top-right" });
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password.", { position: "top-right" });
      } else {
        toast.error("Login failed. Please try again.", { position: "top-right" });
      }
    }
  };

  const toggleFormMode = () => {
    setIsLoginMode(!isLoginMode);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };


  return (
    <div className='login_dash'>

        <p className=" title">Kindly Login or Sign up if you dont have an Account</p>
        <p className=" title">Copyright reserved 2024</p>

        <br></br>
        { !login  ? (
          <>
          <Card className="card_login">

<div className='card_t'> <p className=" title2">HR Manage</p> </div>
<Form onSubmit={handleRegister}>
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
{!isLoginMode && (<FloatingLabel controlId="floatingPassword" label="Confirm password">
 <Form.Control type="password" placeholder="Confirm password" />
</FloatingLabel>)}</Form>
<ToastContainer/>
<div className="or1"><p onClick={toggleFormMode} >{isLoginMode ? 'Dont have an account signup?':'Already have an account?' }</p></div>
<Button className='log_button' size='lg' onClick={handleRegister , handleLogin}>{isLoginMode ? 'Login' : 'Sign Up'}</Button>
<div className="or"><p>Or</p></div>
<Button  className='log_otp' size='lg' onClick={googleLogin} >Sign in with Google</Button>

<Button className='log_otp' size='lg' >Login using OTP</Button>

 </Card>
          </>
        ):(<div>You are  Logged In</div>)}

    </div>
  )
}

export default Login