import { HeartOutlined, ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Card, Tabs, Tooltip } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ProductListItem from "./ProductListItem";
import StarRatings from "react-star-ratings";
import RatingModal from "../modals/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, description, images, _id } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate()

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

  const handleAddToCart = () => {
    setTooltip("Added");
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.push({ ...product, count: 1 });
      // console.log(_.uniqWith(cart, _.isEqual))
      // console.log("cart without applying unique: ", cart)

      let unique = _.uniqWith(cart, _.isEqual);
      const itemone = cart[0]
      const itemtwo = cart[1]
      const itemthree = cart[2]
      // console.log("one: ", itemone)
      // console.log("two:   ", itemtwo)
      // console.log("three: ", itemthree)
      // console.log("difference: ", _.differenceWith(cart, _.isEqual))
      // console.log("comparing first and second cart items", _.isEqual(itemone, itemtwo))
      // console.log("comparing second and third cart items", _.isEqual(itemtwo, itemthree))
      console.log("unique", unique)
      // console.log("is unique and cart equal", JSON.stringify(unique) === JSON.stringify(cart))
      // console.log(unique)

      localStorage.setItem("cart", JSON.stringify(unique));
      dispatch(addToCart(unique));
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault()
    addToWishlist(product._id, user.token).then(res=>{
      console.log("added to wishlist", res.data)
      toast.success("Added to wishlist")
      navigate("/user/wishlist")
    })
  }

  return (
    <>
      <Row className="m-0">
        <Col xs="7">
          {images && images.length && (
            <Carousel showArrows={true} autoPlay infiniteLoop>
              {images &&
                images.map((image) => (
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
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart} className="text-success">
                  <ShoppingCartOutlined />
                  <br /> Add to Cart
                </a>
              </Tooltip>,
                <a onClick={handleAddToWishlist} className="text-danger">
                <HeartOutlined />
                <br /> Add to Wishlist
                </a>,
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
