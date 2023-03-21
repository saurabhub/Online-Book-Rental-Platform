import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
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
import { updatePassword } from "firebase/auth";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = () => {
    const user = auth.currentUser;
    updatePassword(user, password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password Updated Successfully");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    handlePasswordUpdate();
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <UserNav />
        </div>
        <Container className="d-flex align-items-center justify-content-center">
          <Col
            className="bg-light border p-3"
            md={{
              offset: 3,
              size: 5,
            }}
            sm="12"
          >
            <h4 className="mb-3">
              {loading ? (
                <h4 className="text-danger">Loading...</h4>
              ) : (
                <>Update Your Password</>
              )}
            </h4>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="password" className="text-dark">
                  Enter New Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="8-digit password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </FormGroup>{" "}
              <Button
                type="submit"
                className="btn-primary"
                disabled={!password || loading || password.length < 8}
              >
                Update Password
              </Button>
            </Form>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default Password;
