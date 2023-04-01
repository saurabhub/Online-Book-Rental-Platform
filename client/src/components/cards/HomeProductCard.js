import React, { useState } from "react";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Card, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux"
import { addToCart } from "../../features/cart/cartSlice";
import { setVisible } from "../../features/cart/drawerSlice";

const HomeProductCard = ({ product }) => {
  const { title, description, images, slug, price, quantity } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  const {cart} = useSelector((state)=>({...state}))
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    setTooltip("Added");
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.push({ ...product, count: 1 });

      let unique = _.uniqWith(cart, _.isEqual);
      // console.log("card unique: ", unique)

      localStorage.setItem("cart", JSON.stringify(unique));

      dispatch(addToCart(unique))
      dispatch(setVisible(true))
    }
  };

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
          <Tooltip title={quantity >= 1 && tooltip}>
            <a onClick={quantity >= 1 && handleAddToCart} className="text-success" disabled={quantity < 1}>
              <ShoppingCartOutlined />
              <br /> {quantity < 1 ? <span className="text-danger">Out of Stock</span>: "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - ₹${price}`}
          description={`${description && description.substring(0, 100)}...`}
        />
      </Card>
    </>
  );
};

export default HomeProductCard;
