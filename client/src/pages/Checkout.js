import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Col,
  Button,
  Container,
  Form,
  Row,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import { addToCart } from "../features/cart/cartSlice";
import {
  applyCoupon,
  createCashOrderForUser,
  emptyUserCart,
  getUserCart,
  saveUserAddress,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { couponApplied } from "../features/cart/couponSlice";
import { useNavigate } from "react-router-dom";
import { COD } from "../features/cart/CODSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const { user, isCOD, isCoupon } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState(""); // this is coupon name
  const [loading, setLoading] = useState(false);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log("User cart From DB: ", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // remove cart from localStorage
    if (typeof window !== undefined) localStorage.removeItem("cart");

    // remove cart from redux
    dispatch(addToCart([]));

    // remove backend DB
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      setDiscountError("");
      toast.success("Cart is empty now. Continue Shopping.");
    });
  };

  const saveAddressToDB = () => {
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved successfully");
      }
    });
  };

  const handleApplyCouponDiscount = (e) => {
    e.preventDefault();
    applyCoupon(coupon, user.token).then((res) => {
      // console.log("res after applying coupon", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch(couponApplied(true));
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch(couponApplied(false));
      }
    });
  };

  const showApplyCoupon = () => (
    <Form onSubmit={handleApplyCouponDiscount}>
      <FormGroup>
        <Label for="name" className="text-dark" hidden>
          Coupon
        </Label>
        <Input
          id="coupon"
          name="coupon"
          placeholder="apply your coupon here"
          type="text"
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError("");
          }}
          autoFocus
          required
        />
        {discountError && (
          <span className="text-danger fs-12 py-2">{discountError}!</span>
        )}
      </FormGroup>{" "}
      {loading ? (
        <Button color="danger" disabled>
          <Spinner size="sm">Loading...</Spinner>
          <span> Loading</span>
        </Button>
      ) : (
        <Button type="submit" color="success">
          Apply Coupon
        </Button>
      )}
    </Form>
  );

  const createCashOrder = () =>{
    createCashOrderForUser(user.token, isCOD, isCoupon).then(res=>{
      if (res.data.ok) {
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        dispatch(addToCart([]));
        dispatch(couponApplied(false));
        dispatch(COD(false))
        emptyUserCart(user.token);
        setTimeout(() => {
          navigate("/user/history")
        }, 1000);
      }
    })
  }

  return (
    <Container fluid>
      <Row className="m-0 mt-5">
        <Col md="5" className="mx-auto">
          <h4>Delivery Address</h4>
          <br />
          <ReactQuill theme="snow" value={address} onChange={setAddress} />
          <Button
            color="primary"
            className="mt-3 d-flex align-items-center justify-content-center"
            onClick={saveAddressToDB}
          >
            Save
          </Button>
          <br />
          <hr />
          <br />
          <h4>Got Coupon?</h4>
          <br />
          {showApplyCoupon()}
        </Col>
        <Col md="5" className="mx-auto">
          <h4>Order Summary</h4>
          <hr />
          <p>Total Products: {products.length}</p>
          <hr />
          {products.map((p, i) => (
            <div key={i}>
              <p>
                {p.product.title} x {p.count} = ₹{p.product.price * p.count}
              </p>
            </div>
          ))}
          <hr />
          <p>
            <strong>Cart total: ₹{total}</strong>{" "}
          </p>
          {totalAfterDiscount > 0 && (
            <p className="text-success fw-bold">
              Discount Applied! 😀 <br />
              Total Payable: ₹{totalAfterDiscount}
            </p>
          )}
          <hr />
          <Row>
            <Col md="6">
              {isCOD ? (
                <Button
                  color="primary"
                  className="d-flex align-items-center justify-content-center gap-2"
                  disabled={!addressSaved || !products.length}
                  onClick={createCashOrder}
                >
                  Place Order
                </Button>
              ) : (
                <Button
                  color="primary"
                  className="d-flex align-items-center justify-content-center gap-2"
                  disabled={!addressSaved || !products.length}
                  onClick={() => {
                    navigate("/payment");
                  }}
                >
                  Place Order
                </Button>
              )}
            </Col>
            <Col md="6">
              <Button
                color="primary"
                className="d-flex align-items-center justify-content-center gap-2"
                disabled={!products.length}
                onClick={emptyCart}
              >
                Empty Cart
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
