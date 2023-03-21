import { LoadingOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import {
  getProductsByCondition,
  getProductsCount,
} from "../../functions/product";
import HomeProductCard from "../cards/HomeProductCard";
import LoadingCard from "../cards/LoadingCard";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);

    getProductsByCondition("sold", "desc", page)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("GET ALL PRODUCTS BY CONDITION ERROR: ", error);
      });
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "page") {
      return <>{loading ? <LoadingOutlined /> : originalElement}</>;
    }
    return originalElement;
  };

  return (
    <Container className="" fluid>
      <div className="my-5 display-4 text-black bg-secondary">
        <h4 className="text-center py-3">Best Sellers</h4>
      </div>
      <Row className="p-0 mx-3 mt-4">
        {products.map((product) => (
          <Col key={product._id} xs="4" className="mb-4">
            {<HomeProductCard product={product} />}
          </Col>
        ))}
        <div className="mb-3 d-flex justify-content-center gap-3 text-black">
          <Pagination
            defaultCurrent={page}
            current={page}
            total={productsCount}
            pageSize={3}
            onChange={(value) => setPage(value)}
            itemRender={itemRender}
          />
        </div>
      </Row>
    </Container>
  );
};

export default BestSellers;
