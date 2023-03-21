import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {
  Col,
  Container,
  Form,
  Input,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import {
  createCategory,
  getAllCategory,
  removeCategory,
} from "../../../functions/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.name} category created successfully`);
        setName("");
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
        toast.error(err.message);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Confirm Delete?")) {
      removeCategory(slug, user.token)
        .then((res) => {
          toast.success(`${res.data.name} deleted successfully`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };

  const searchResult = (keyword) => (category) =>
    category.name.toLowerCase().includes(keyword);

  return (
    <>
      <Row className="m-0">
        <Col xs="2" className="p-0">
          <AdminNav />
        </Col>
        <Col className="p-0 py-3 mx-auto" xs="6">
          <Container className="m-0 p-0" fluid>
            <Col className="bg-light border p-3 mb-4" xs="12">
              <h4 className="mb-3">Create Category</h4>
              <Form onSubmit={handleSubmit}>
                <CategoryForm
                  name={name}
                  setName={setName}
                  btnName="Create Category"
                  loading={loading}
                />
              </Form>
            </Col>
            <h4>Categories List</h4>
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            {categories.filter(searchResult(keyword)).map((category) => (
              <ListGroup className="my-1" key={category._id}>
                <ListGroupItem
                  className="d-flex align-items-center"
                  color="info"
                >
                  <span className="me-auto">{category.name}</span>
                  <Link to={`/admin/category/${category.slug}`}>
                    <EditOutlined className="px-1 text-warning" />
                  </Link>
                  <span>
                    <DeleteOutlined
                      onClick={() => handleRemove(category.slug)}
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

export default CreateCategory;
