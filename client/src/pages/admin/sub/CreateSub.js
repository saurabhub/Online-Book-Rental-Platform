import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { createSub, getAllSub, removeSub } from "../../../functions/sub";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { getAllCategory } from "../../../functions/category";

const CreateSub = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [parentCategory, setParentCategory] = useState([]);
  const [subs, setSubs] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () => {
    getAllCategory()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const loadSubs = () => {
    getAllSub()
      .then((res) => {
        setSubs(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createSub({ name, parentCategory }, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.name} Sub created successfully`);
        setName("");
        loadSubs();
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

  const handleRemove = async (slug) => {
    if (window.confirm("Confirm Delete?")) {
      removeSub(slug, user.token)
        .then((res) => {
          toast.success(`${res.data.name} deleted successfully`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };

  const searchResult = (keyword) => (sub) =>
    sub.name.toLowerCase().includes(keyword);

  return (
    <>
      <Row className="m-0">
        <Col xs="2" className="p-0">
          <AdminNav />
        </Col>
        <Col className="p-0 py-3 mx-auto" xs="6">
          <Container className="m-0 p-0" fluid>
            <Col className="bg-light border p-3 mb-4" xs="auto" sm="12">
              <h4 className="mb-3">Create Sub Category</h4>
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
                    {categories.length > 0 &&
                      categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
                <CategoryForm
                  name={name}
                  setName={setName}
                  btnName="Create Sub-Category"
                  loading={loading}
                />
              </Form>
            </Col>
            <h4>Sub Categories List</h4>
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            {subs.filter(searchResult(keyword)).map((sub) => (
              <ListGroup className="my-1" key={sub._id}>
                <ListGroupItem
                  className="d-flex align-items-center"
                  color="info"
                >
                  <span className="me-auto">{sub.name}</span>
                  <Link to={`/admin/sub/${sub.slug}`}>
                    <EditOutlined className="px-1 text-warning" />
                  </Link>
                  <span>
                    <DeleteOutlined
                      onClick={() => handleRemove(sub.slug)}
                      className="px-1 text-danger"
                    />
                  </span>
                </ListGroupItem>
              </ListGroup>
            ))}
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default CreateSub;
