import React from "react";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { showAverage } from "../../functions/rating";

const HomeProductCard = ({ product }) => {
  const { title, description, images, slug } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <Card
        hoverable
        className="bg-secondary border border-secondary"
        cover={
          <img
            alt={`${title} front cover`}
            src={images && images.length ? images[0].url : ""}
            style={{ height: "250px", objectFit: "contain" }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`} className="text-primary">
            <EyeOutlined />
            <br /> View Product
          </Link>,
          <div className="text-success">
            <ShoppingCartOutlined />
            <br /> Add to Cart
          </div>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 100)}...`}
        />
      </Card>
    </>
  );
};

export default HomeProductCard;
