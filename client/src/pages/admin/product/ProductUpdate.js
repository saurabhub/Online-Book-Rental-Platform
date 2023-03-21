import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Button, Col, Container, Form, Row, Spinner } from "reactstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProduct, updateProduct } from "../../../functions/product";
import { getAllCategory, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { useNavigate, useParams } from "react-router-dom";
import UpdateProductFormInput from "../../../components/forms/UpdateProductFormInput";
import { getAllAuthor } from "../../../functions/author";
import { getAllPublisher } from "../../../functions/publisher";

const ProductUpdate = () => {
  const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    publisher: "",
    author: "",
  };

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [selectedSubs, setSelectedSubs] = useState([]);

  const { slug } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

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
      options: publishers,
    },
    {
      id: "7",
      type: "select",
      name: "author",
      placeholder: "Select Author",
      label: "Author",
      options: authors,
    },
    {
      id: "8",
      type: "select",
      name: "category",
      placeholder: "Select Category",
      label: "Category",
      options: categories,
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
    loadProduct();
    loadCategories();
    loadPublishers();
    loadAuthors();
  }, []);

  const loadProduct = async () => {
    await getProduct(slug)
      .then((product) => {
        // console.log("Product", product)
        setValues({ ...values, ...product.data });
        getCategorySubs(product.data.category._id)
          .then((res) => {
            setSubOptions(res.data);
          })
          .catch((err) => {
            toast(err.message);
          });
        let opt = product.data.subs;
        let selectedValues = [];
        for (var i = 0, l = opt.length; i < l; i++) {
          selectedValues.push(opt[i]._id);
        }
        setSelectedSubs(selectedValues);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const loadCategories = async () => {
    await getAllCategory()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const loadAuthors = async () => {
    await getAllAuthor()
      .then((res) => {
        setAuthors(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const loadPublishers = async () => {
    await getAllPublisher()
      .then((res) => {
        setPublishers(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onChange = (e) => {
    if (e.target.name === "category") {
      if (e.target.value !== "") {
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value)
          .then((res) => {
            setSubOptions(res.data);
          })
          .catch((err) => {
            toast(err.message);
          });
      }
    } else if (e.target.name === "subs") {
      let opt = e.target.options;
      let selectedValues = [];
      for (var i = 0, l = opt.length; i < l; i++) {
        if (opt[i].selected) {
          selectedValues.push(opt[i].value);
        }
      }
      setSelectedSubs(selectedValues);
      setValues({ ...values, subs: selectedValues });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  console.log("Values: ", values)
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    updateProduct(values, slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} UPDATED!`);
        navigate("/admin/products");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.error);
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
                <h4 className="mb-3">Update Product</h4>
                <FileUpload
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                  loading={loading}
                />
                {inputs.map((input) => (
                  <UpdateProductFormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                    categories={categories}
                    publishers={publishers}
                    authors={authors}
                    values={values}
                    selectedSubs={selectedSubs}
                  />
                ))}

                {loading ? (
                  <Button color="danger" disabled>
                    <Spinner size="sm">Loading...</Spinner>
                    <span> Loading</span>
                  </Button>
                ) : (
                  <Button type="submit" color="success">
                    Update Product
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

export default ProductUpdate;

// "Premchand",
//       "Robert T. Kiosaki",
//       "David Eagleman",
//       "James Clear",
//       "Mark Manson",
//       "Neeraj Jha",
