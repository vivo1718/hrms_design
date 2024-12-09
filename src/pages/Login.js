import React from 'react';
import { useState } from 'react';
import { FloatingLabel,Form, Card , Button } from 'react-bootstrap';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { GoogleAuthProvider, signInWithPopup , createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { auth,db } from '../components/firebase';
import 'react-toastify/dist/ReactToastify.css';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
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

      
         
          
          <Card className="card_login">

<div className='card_t'> <p className=" title2">HR Manage</p> </div>
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
<p className="or">Or</p>
<Button  className='log_otp1' size='lg' onClick={googleLogin} >Sign in with Google</Button>

<Button className='log_otp2' size='lg' >Login using OTP</Button>

 </Card>
          
        

    </div>
  )
}

export default Login