import ModalImage from "react-modal-image";
import React from "react";
import { Input } from "reactstrap";
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const ProductCardInCheckout = ({ product }) => {
  const dispatch = useDispatch();
  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    // console.log("quantity", product.quantity)

    if (count > product.quantity) {
      toast(`Max available quantity: ${product.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== undefined) {
      if (localStorage.getItem("cart"))
        cart = JSON.parse(window.localStorage.getItem("cart"));

      cart.map((localProduct, index) => {
        if (localProduct._id == product._id) {
          cart[index].count = count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(addToCart(cart));
    }
  };

  const handleRemove = () => {
    let cart = [];

    if (typeof window !== undefined) {
      if (localStorage.getItem("cart"))
        cart = JSON.parse(localStorage.getItem("cart"));

      cart.map((localProduct, index) => {
        if (localProduct._id == product._id) {
          cart.splice(index, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(addToCart(cart));
    }
  };

  return (
    <tbody className="h-auto">
      <tr className="h-auto">
        <td>
          <div style={{ width: "50px"}} className="h-auto">
            {product.images.length ? (
              <ModalImage
                small={product.images[0].url}
                large={product.images[0].url}
                alt={product.title}
              />
            ) : (
              <p className="text-danger">NO image available</p>
            )}
          </div>
        </td>
        <th scope="row">{product.title}</th>
        <td>₹{product.price}</td>
        <td>{product.author?.name}</td>
        <td>{product.publisher?.name}</td>
        <td>
          <Input
            type="number"
            value={product.count}
            name="quantity"
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center">
          {product.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CheckCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          {" "}
          <CloseCircleOutlined
            className="text-danger"
            onClick={handleRemove}
            style={{ cursor: "pointer" }}
          />{" "}
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
