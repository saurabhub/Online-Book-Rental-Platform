import { HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Card, Tabs } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ProductListItem from "./ProductListItem";
import StarRatings from "react-star-ratings";
import RatingModal from "../modals/RatingModal";
import { showAverage } from "../../functions/rating";

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, description, images, _id } = product;

  const items = [
    {
      key: "1",
      label: `Description`,
      children: description && description,
    },
    // {
    //   key: '2',
    //   label: `More`,
    //   children: `Content of Tab Pane 2`,
    // },
  ];

  return (
    <>
      <Row className="m-0">
        <Col xs="7">
          {images && images.length && (
            <Carousel showArrows={true} autoPlay infiniteLoop>
              {images && images.map((image) => (
                <img
                  key={image.public_id}
                  src={image.url}
                  className="border-bottom border-secondary py-2"
                />
              ))}
            </Carousel>
          )}
        </Col>
        <Col xs="5">
          <h2 className="bg-info p-3 text-center text-black">{title}</h2>
          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <div className="text-center pt-1 pb-3">No rating yet</div>
          )}
          <Card
            hoverable
            actions={[
              <Link className="text-primary">
                <ShoppingOutlined />
                <br /> Add to Cart
              </Link>,
              <Link className="text-danger">
                <HeartOutlined />
                <br /> Add to Wishlist
              </Link>,
              <RatingModal>
                <StarRatings
                  rating={star}
                  starRatedColor="red"
                  numberOfStars={5}
                  name={_id}
                  changeRating={onStarClick}
                />
              </RatingModal>,
            ]}
          >
            <ProductListItem product={product} />
          </Card>
        </Col>
        <Col className="border-top border-secondary mx-auto">
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
      </Row>
    </>
  );
};

export default SingleProduct;
