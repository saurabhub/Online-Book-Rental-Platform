import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "../../features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (location.state?.from) {
      return;
    } else {
      if (user && user.token) {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const roleBasedRedirect = (res) => {
    toast.success("login successful");

    // console.log(location.state?.from)
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/history");
      }
    }
    // console.log(res.data.role);
  };

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            // console.log("CREATE res: ", res);
            dispatch(
              loggedInUser({
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              })
            );
            roleBasedRedirect(res);
            setLoading(false);
          })
          .catch((error) => {
            console.log("CREATE error: ", error);
          });

        // navigate("/");
        // toast.success("login successful");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        const user = result.user;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            // console.log("CREATE res: ", res);
            setLoading(false);
            dispatch(
              loggedInUser({
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              })
            );
            roleBasedRedirect(res);
          })
          .catch((error) => {
            setLoading(false);
            console.log("CREATE error: ", error);
          });
        // navigate("/");
        setLoading(false);
        // toast.success("login successful");
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        toast.error(errorMessage);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("error: ", error, "credential: ", credential);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
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
        <h4 className="mb-3">Login to your Account</h4>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email" className="text-dark">
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
          <FormGroup>
            <Label for="password" className="text-dark">
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
          <Col sm="6" className="d-grid gap-2 mx-auto mb-3">
            {loading ? (
              <Button color="danger" disabled>
                <Spinner size="sm">Loading...</Spinner>
                <span> Loading</span>
              </Button>
            ) : (
              <>
                <Button
                  color="primary"
                  className="d-flex align-items-center justify-content-center gap-2"
                  disabled={!email || password.length < 8 || loading}
                >
                  <MailOutlined />
                  <span>Login with Email/Password</span>
                </Button>
                <Button
                  onClick={handleGoogleLogin}
                  color="danger"
                  className="d-flex align-items-center justify-content-center gap-2"
                >
                  <GoogleOutlined />
                  <span>Login with Google</span>
                </Button>
              </>
            )}
          </Col>
          <Link to="/forgot/password" className="">
            Forgot Password?
          </Link>
        </Form>
      </Col>
    </Container>
  );
};

export default Login;
