import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "reactstrap";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { COD } from "../features/cart/CODSlice";
import { userCart } from "../functions/user";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const handleLoginToCheckout = (e) => {
    e.preventDefault();
    navigate("/login", { state: { from: location } });
  };

  const saveOrderToDB = () => {
    // alert("Saving order to DB.");
    userCart(cart, user.token)
      .then((res) => {
        // console.log("user cart res::", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((error) => {
        console.log("Cart Save ERROR", error);
      });
  };

  const saveCashOrderToDB = () => {
    // alert("Saving order to DB.");
    dispatch(COD(true))
    userCart(cart, user.token)
      .then((res) => {
        // console.log("user cart res::", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((error) => {
        console.log("Cart Save ERROR", error);
      });
  };

  return (
    <>
      <Container fluid className="pt-2">
        <Row className="m-0">
          <h4>Cart / {cart.length} products</h4>
        </Row>
        <Row>
          <Col md="8">
            {!cart.length ? (
              <h4>
                NO products in CART <Link to="/shop">continue shopping?</Link>
              </h4>
            ) : (
              <>
                <Table responsive hover>
                  <thead>
                    <tr className="table-secondary">
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Author</th>
                      <th>Publisher</th>
                      <th>Quantity</th>
                      <th>Shipping</th>
                      <th>Remove</th>
                    </tr>
                  </thead>

                  {cart.map((product) => (
                    <ProductCardInCheckout
                      key={product._id}
                      product={product}
                    />
                  ))}
                </Table>
              </>
            )}
          </Col>
          <Col md="4">
            <h4>Order Summary</h4>
            <hr />
            <p>Products</p>
            {cart.map((item, index) => (
              <div key={index}>
                <p>
                  {item.title} x {item.count} = ₹{item.price * item.count}
                </p>
              </div>
            ))}
            <hr />
            Total: <b>₹{getTotal()}</b>
            <hr />
            {user ? (
              <>
              <Button
                color="primary"
                className="d-flex align-items-center justify-content-center gap-2"
                disabled={!cart.length}
                onClick={saveOrderToDB}
              >
                <span>Proceed to Checkout</span>
              </Button>
              <hr />
              <Button
                color="warning"
                className="d-flex align-items-center justify-content-center gap-2"
                disabled={!cart.length}
                onClick={saveCashOrderToDB}
              >
                <span>Pay Cash On Delivery</span>
              </Button>
              </>
            ) : (
              <Button
                color="primary"
                className="d-flex align-items-center justify-content-center gap-2"
                onClick={handleLoginToCheckout}
              >
                Login to Checkout
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
