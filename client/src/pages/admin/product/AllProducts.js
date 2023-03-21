import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../../../components/cards/ProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import {
  getAllProductsByCount,
  removeProduct,
} from "../../../functions/product";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getAllProductsByCount(12)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("GET ALL PRODUCTS ERROR: ", error);
      });
  };

  const handleRemoveProduct = (slug) => {
    const answer = window.confirm("Confirm Delete?");

    if (answer) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} deleted!`);
        })
        .catch((error) => {
          toast.error(error.response.data.error);
          console.log("DELETE PRODUCT ERR : ", error);
        });
    }
  };

  return (
    <>
      <Row className="m-0">
        <Col xs="2" className="p-0">
          <AdminNav />
        </Col>
        <Col className="p-0" xs="10">
          <Container className="" fluid>
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4 className="text-center mt-3">All Products</h4>
            )}
            <Row className="p-0 mx-3 mt-4">
              {products.map((product) => (
                <Col key={product._id} xs="4" className="mb-4">
                  {
                    <ProductCard
                      product={product}
                      handleRemoveProduct={handleRemoveProduct}
                    />
                  }
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default AllProducts;
