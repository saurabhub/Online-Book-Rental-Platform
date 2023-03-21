import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProduct,
  getRelatedProduct,
  setProductRating,
} from "../functions/product";
import { Col, Container, Row } from "reactstrap";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import HomeProductCard from "../components/cards/HomeProductCard";

const Product = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState({});
  const { slug } = useParams();
  const [star, setStar] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (rating) => rating.postedBy.toString() === user._id.toString()
      );
      if (existingRatingObject && user) {
        existingRatingObject && setStar(existingRatingObject.star);
      }
    }
  }, [product, user]);

  const loadProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);

      getRelatedProduct(res.data._id).then((res) =>
        setRelatedProducts(res.data)
      );
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    // console.table(newRating, name)
    setProductRating(name, newRating, user.token).then((res) => {
      console.log("Rating added", res.data);
      loadProduct();
    });
  };

  return (
    <>
      <Container fluid>
        <Row className="m-0 pt-4">
          <Col className="p-0">
            <SingleProduct
              product={product}
              onStarClick={onStarClick}
              star={star}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mt-5 pb-5">
            <hr />
            <h4 className="text-center text-black fw-bold">Related Products</h4>
            <hr />
            <Row className="p-0 mx-3 mt-4">
              {relatedProducts.length ? relatedProducts.map((product) => (
                <Col key={product._id} xs="4" className="mb-4">
                  {<HomeProductCard product={product} />}
                </Col>
              )): <h5 className="text-center text-danger">No Products Found!</h5> }
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Product;
