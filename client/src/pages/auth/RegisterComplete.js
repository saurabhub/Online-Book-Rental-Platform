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
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";
import { loggedInUser } from "../../features/auth/authSlice";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleRegisterComplete = () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          if (result.user.emailVerified) {
            window.localStorage.removeItem("emailForSignIn");
            setEmail(result.user.email);

            const user = auth.currentUser;

            updatePassword(user, password)
              .then(() => {
                // Update successful.
              })
              .catch((error) => {
                toast.error(error.message);
              });

              const idTokenResult = await user.getIdTokenResult()

            createOrUpdateUser(idTokenResult.token)
              .then((res) => {
                dispatch(
                  loggedInUser({
                    name: res.data.name,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id: res.data._id,
                  })
                );
              })
              .catch((error) => {
                console.log("CREATE error: ", error);
              });

            toast.success("register successful");
            navigate("/login");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegisterComplete();
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
              disabled
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="password" hidden>
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="8-digit password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

export default RegisterComplete;
