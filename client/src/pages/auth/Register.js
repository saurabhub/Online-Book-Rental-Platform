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
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate()
  const {user} = useSelector((state)=>({...state}))


  useEffect
  (() => {
    if(user && user.token){
      navigate("/")
    }
  }, [user])

  const handleRegister = async () => {
    // console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL)
    const actionCodeSettings = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        setEmail("")
        toast.success(`Verify your email by clicking the URL sent to ${email}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
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
        <h4 className="mb-3">Create your Account</h4>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email" hidden>
              Email
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
            Create Account
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default Register;
