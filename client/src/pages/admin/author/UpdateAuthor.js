import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Col, Container, Form, Row } from "reactstrap";
import { getAuthor, updateAuthor } from "../../../functions/author";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";

const UpdateAuthor = () => {
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    loadAuthor();
  }, []);

  const loadAuthor = () => {
    getAuthor(slug)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateAuthor({ name }, slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`Updated to ${res.data.name} successfully`);
        setName("");
        navigate("/admin/author");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
        toast.error(err.message);
      });
  };

  return (
    <>
            <Row className="m-0">
        <Col xs="2" className="p-0">
          <AdminNav />
        </Col>
        <Col className="p-0 py-3 mx-auto" xs="6">
          <Container className="m-0 p-0" fluid>
            <Col className="bg-light border p-3 mb-4" xs="auto" sm="12">
              <h4 className="mb-3">Update Author</h4>
              <Form onSubmit={handleSubmit}>
                <CategoryForm
                  name={name}
                  setName={setName}
                  btnName="Update Author"
                  loading={loading}
                  labelName="Author"
                />
              </Form>
            </Col>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default UpdateAuthor;
