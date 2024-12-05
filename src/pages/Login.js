import React from 'react';
import { useState } from 'react';
import { FloatingLabel,Form, Card , Button } from 'react-bootstrap';
import './Login.css';
function Login() {

 const [showLoginButton, setShowLoginButton] = useState(false);
 const [isLoginMode, setIsLoginMode] = useState(true);
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');

  const handleToggleLoginButton = () => {
    setShowLoginButton(!showLoginButton);
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
        <Card className="card_login">

       <div className='card_t'> <p className=" title2">HR Manage</p> </div>

        <FloatingLabel
        controlId="floatingInput"       
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="enter your email" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Enter your password" />
      </FloatingLabel>
      <br></br>
      {!isLoginMode && (<FloatingLabel controlId="floatingPassword" label="Confirm password">
        <Form.Control type="password" placeholder="Confirm password" />
      </FloatingLabel>)}
      
      <div className="or1"><p onClick={toggleFormMode} >{isLoginMode ? 'Dont have an account signup?':'Already have an account?' }</p></div>
      <Button className='log_button' size='lg' >{isLoginMode ? 'Login' : 'Sign Up'}</Button>
      <div className="or"><p>Or</p></div>
      <Button className='log_otp' size='lg' >Login using OTP</Button>

        </Card>

    </div>
  )
}

export default Login