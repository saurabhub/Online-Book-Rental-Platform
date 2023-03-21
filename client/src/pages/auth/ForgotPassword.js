import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const {user} = useSelector((state)=>({...state}))

  useEffect(() => {
    if(user && user.token){
      navigate("/")
    }
  }, [user])
  
  
  const handleForgotPassword =  () => {
    const actionCodeSettings = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    sendPasswordResetEmail(auth, email, actionCodeSettings)
  .then(() => {
    setEmail('')
        toast.success("Password reset link has been sent to your email.")
  })
  .catch((error) => {
    toast.error(error.message)
  });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleForgotPassword();
  };

  return (
    <Container className="form-container d-flex align-items-center">
      <Col
        className="bg-light border p-3"
        md={{
          offset: 3,
          size: 6,
        }}
        sm="12"
      >
        <h4 className="mb-3">Reset your Password</h4>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email" className="text-dark">
              Enter your Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="example@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>{" "}
          <Button type="submit" className="btn-primary">
            Reset Password
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default ForgotPassword;
