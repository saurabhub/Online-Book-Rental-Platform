import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Button, Col, Container, Form, Row, Spinner } from "reactstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "../../../components/forms/FormInput";
import { createProduct } from "../../../functions/product";
import { getAllCategory, getCategorySubs } from "../../../functions/category";
import { getAllPublisher } from "../../../functions/publisher";
import { getAllAuthor } from "../../../functions/author";
import FileUpload from "../../../components/forms/FileUpload";

const CreateProduct = () => {
  const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    publishers: [],
    authors: [],
    publisher: "",
    author: "",
  };

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const inputs = [
    {
      id: "1",
      type: "text",
      name: "title",
      placeholder: "Title",
      label: "Title",
    },
    {
      id: "2",
      type: "textarea",
      name: "description",
      placeholder: "Description",
      label: "Description",
    },
    {
      id: "3",
      type: "number",
      name: "price",
      placeholder: "Price",
      label: "Price",
    },
    {
      id: "4",
      type: "select",
      name: "shipping",
      label: "Shipping",
      options: ["Yes", "No"],
    },
    {
      id: "5",
      type: "number",
      name: "quantity",
      placeholder: "Quantity",
      label: "Quantity",
    },
    {
      id: "6",
      type: "select",
      name: "publisher",
      placeholder: "Select Pulisher",
      label: "Publisher",
      options: values.publishers,
    },
    {
      id: "7",
      type: "select",
      name: "author",
      placeholder: "Select Author",
      label: "Author",
      options: values.authors,
    },
    {
      id: "8",
      type: "select",
      name: "category",
      placeholder: "Select Category",
      label: "Category",
      options: values.categories,
    },
    {
      id: "9",
      type: "select",
      name: "subs",
      label: "Sub Category",
      options: subOptions,
    },
  ];

  useEffect(() => {
    const loadCategories = () => {

      getAllCategory()
        .then((res) => setValues(values=>({ ...values, categories: res.data })))
        .catch((err) => {
          toast.error(err.message);
        });
    };
    const loadPublishers = () => {
      getAllPublisher()
        .then((res) => setValues(values=>({ ...values, publishers: res.data })))
        .catch((err) => {
          toast.error(err.message);
        });
    };
    const loadAuthors = () => {
      getAllAuthor()
        .then((res) => setValues(values=>({ ...values, authors: res.data })))
        .catch((err) => {
          toast.error(err.message);
        });
    };

    loadCategories();
    loadPublishers();
    loadAuthors();
  }, []);

  const onChange = (e) => {

    if (e.target.name === "category") {
      setValues({ ...values, category: e.target.value });
      getCategorySubs(e.target.value)
        .then((res) => {
          setSubOptions(res.data);
        })
        .catch((err) => {
          toast(err.message);
        });
    } else if (e.target.name === "subs") {
      let opt = e.target.options;
      let selectedValues = [];
      for (var i = 0, l = opt.length; i < l; i++) {
        if (opt[i].selected) {
          selectedValues.push(opt[i].value);
        }
      }
      setValues({ ...values, subs: selectedValues });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };
  console.log("Author: ", values.author);
  console.log("Category: ", values.category);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createProduct(values, user.token)
      .then((res) => {
        setLoading(false);
        window.alert(`${res.data.title} Product created successfully`);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
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
              <Form onSubmit={handleSubmit}>
                <h4 className="mb-3">Create Product</h4>
                <FileUpload
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                  loading={loading}
                />
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}
                {loading ? (
                  <Button color="danger" disabled>
                    <Spinner size="sm">Loading...</Spinner>
                    <span> Loading</span>
                  </Button>
                ) : (
                  <Button type="submit" color="success">
                    Create Product
                  </Button>
                )}
              </Form>
            </Col>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default CreateProduct;
