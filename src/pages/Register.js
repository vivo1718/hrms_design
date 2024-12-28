import "./Register.css";
import React from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { auth, db, storage } from "../components/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FloatingLabel, Form, Card, Button } from "react-bootstrap";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Storage functions

export default function Register() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Clear previous success messages
    console.log(`submitted ${firstName}`);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      let imageUrl = "";
      // if (image) {
      //   const imageRef = ref(storage, `profileImages/${user.uid}`);
      //   await uploadBytes(imageRef, image);
      //   imageUrl = await getDownloadURL(imageRef);
      // }
      await updateProfile(user, {
        firstName: `${firstName}`, // Assuming you have firstName and lastName from your form
        photoURL: "", // Replace with an actual photo URL or leave it empty
      });
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          uid: user.uid,
          email: user.email,
          firstName: `${firstName}`,
          photo: imageUrl,
        });
      }
      setSuccess("Registration successful!");
      toast.success("Registered Successfully.", {
        position: "top-right",
      });
      window.location.href = "/Dashboard";
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
  const back_login = () => {
    window.location.href = "./login";
  };

  return (
    <div className="regi_dash">
      <Card className="card_regi">
        <div className="card_t">
          {" "}
          <p className=" title2">HR Manage</p>{" "}
        </div>
        <Form onSubmit={handleRegister}>
          {/* <Form.Group className="mb-3">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group> */}
          <FloatingLabel
            controlId="floatingInput"
            label="First Name"
            style={{ borderColor: "grey" }}
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Last Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
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
          <div className="or1" onClick={back_login}>
            <p className="al">Already have an account?</p>
          </div>

          <div
            className="d-flex justify-content-center align-self-stretch"
            style={{}}
          >
            <Button
              className="reg_button"
              size="lg"
              type="submit"
              style={{ width: "100%" }}
            >
              Create Account
            </Button>
          </div>
        </Form>

        <ToastContainer />
        {/* <Button  className='log_otp1' size='lg' onClick={googleLogin} >Sign in with Google</Button>

<Button className='log_otp2' size='lg' >Login using OTP</Button> */}
      </Card>
    </div>
  );
}
