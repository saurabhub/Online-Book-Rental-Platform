import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import HomeProductCard from "../cards/HomeProductCard";
import { getSub } from "../../functions/sub";

const SubHome = () => {
  const { slug } = useParams();
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
        // console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);


  return (
    <Container className="" fluid>
      <div className="my-5 display-4 text-black bg-secondary">
        <h4 className="text-center py-3">
          {products.length} {products.length === 1 ? "Product" : "Products"} in "{sub.name}" Sub-category
        </h4>
      </div>
      <Row className="p-0 mx-3 mt-4">
        {products.length > 0 && products.map((product) => (
          <Col key={product._id} xs="4" className="mb-4">
            {<HomeProductCard product={product} />}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SubHome;
