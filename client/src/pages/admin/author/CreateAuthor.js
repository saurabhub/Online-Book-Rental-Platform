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
  createAuthor,
  getAllAuthor,
  removeAuthor,
} from "../../../functions/author";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CreateAuthor = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = () => {
    getAllAuthor()
      .then((res) => {
        setAuthors(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createAuthor({ name }, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.name} author created successfully`);
        setName("");
        loadAuthors();
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
      removeAuthor(slug, user.token)
        .then((res) => {
          toast.success(`${res.data.name} deleted successfully`);
          loadAuthors();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };

  const searchResult = (keyword) => (author) =>
    author.name.toLowerCase().includes(keyword);

  return (
    <>
      <Row className="m-0">
        <Col xs="2" className="p-0">
          <AdminNav />
        </Col>
        <Col className="p-0 py-3 mx-auto" xs="6">
          <Container className="m-0 p-0" fluid>
            <Col className="bg-light border p-3 mb-4" xs="12">
              <h4 className="mb-3">Create Author</h4>
              <Form onSubmit={handleSubmit}>
                <CategoryForm
                  name={name}
                  setName={setName}
                  btnName="Create Author"
                  loading={loading}
                  labelName="Author"
                />
              </Form>
            </Col>
            <h4>Authors List</h4>
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            {authors.filter(searchResult(keyword)).map((author) => (
              <ListGroup className="my-1" key={author._id}>
                <ListGroupItem
                  className="d-flex align-items-center"
                  color="info"
                >
                  <span className="me-auto">{author.name}</span>
                  <Link to={`/admin/author/${author.slug}`}>
                    <EditOutlined className="px-1 text-warning" />
                  </Link>
                  <span>
                    <DeleteOutlined
                      onClick={() => handleRemove(author.slug)}
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

export default CreateAuthor;
