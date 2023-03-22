import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { getAllCategory, getCategory, updateCategory } from "../../../functions/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import { getSub, updateSub } from "../../../functions/sub";

const UpdateSub = () => {
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [parentCategory, setParentCategory] = useState([]);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    loadCategory();
    loadCategories()
  }, []);

  const loadCategory = () => {
    getSub(slug)
      .then((res) => {
        setName(res.data.sub.name);
        setParentCategory(res.data.sub.parentCategory)
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const loadCategories = () => {
    getAllCategory()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateSub({ name, parentCategory }, slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`Updated to ${res.data.name} successfully`);
        setName("");
        navigate("/admin/sub");
      })
      .catch((err) => {
        setLoading(false);
        // if (err.response.status === 400) {
        //   toast.error(err.response.data);
        // }
        // toast.error(err.message);
        toast.error(err.response.data.error);
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
              <h4 className="mb-3">Update Sub-Category</h4>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="parentCategory" className="text-dark">
                    Select Parent Category
                  </Label>
                  <Input
                    id="parentCategory"
                    name="parent"
                    type="select"
                    onChange={(e) => setParentCategory(e.target.value)}
                    required
                  >
                    <option value="">Please Select</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id} selected={category._id === parentCategory}>
                        {category.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <CategoryForm
                  name={name}
                  setName={setName}
                  btnName="Update Sub Category"
                  loading={loading}
                />
              </Form>
            </Col>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default UpdateSub;
