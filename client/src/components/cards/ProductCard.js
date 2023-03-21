import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, handleRemoveProduct }) => {
  const { title, description, images, slug } = product;
  return (
    <Card
      hoverable
      cover={
        <img
          alt={`${title} front cover`}
          src={images && images.length ? images[0].url : ""}
          style={{ height: "250px", objectFit: "contain" }}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-primary" />
        </Link>,
        <DeleteOutlined
          onClick={() => {
            handleRemoveProduct(slug);
          }}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 100)}...`}
      />
    </Card>
  );
};

export default ProductCard;
