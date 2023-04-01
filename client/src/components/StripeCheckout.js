import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../functions/stripe";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "reactstrap";
import { Link } from "react-router-dom";
import { CheckOutlined, DollarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { createOrder, emptyUserCart } from "../functions/user";
import { couponApplied } from "../features/cart/couponSlice";
import { addToCart } from "../features/cart/cartSlice";

const StripeCheckout = () => {
  const { user, isCoupon } = useSelector((state) => ({ ...state }));
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  useEffect(() => {
    createPaymentIntent(user.token, isCoupon).then((res) => {
      // console.log("client secret: ", res.data);
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          dispatch(addToCart([]));
          dispatch(couponApplied(false));
          emptyUserCart(user.token);
        }
      });

      // console.log(JSON.stringify(payload, null, 4))
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <>
      {!succeeded && (
        <div>
          {isCoupon && totalAfterDiscount !== undefined ? (
            <div className="alert alert-success">{`Total After discount: ₹${totalAfterDiscount}`}</div>
          ) : (
            <div className="alert alert-danger">No coupon Applied</div>
          )}
        </div>
      )}
      <Card
        className="mb-3"
        hoverable
        actions={[
          <>
            <DollarOutlined className="text-info" />
            <br />{" "}
            <strong className="text-primary"> Total: ₹{cartTotal}</strong>
          </>,
          <>
            <CheckOutlined className="text-info" />
            <br />{" "}
            <strong className="text-success">
              Payable: ₹{(payable / 100).toFixed(2)}
            </strong>
          </>,
        ]}
      >
        <Meta title="Payment Info" className="text-center" />
      </Card>
      <Form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <p className={`${succeeded ? "result-message" : "result-message hidden"} text-center`}>
          <span className="text-success fw-bold text-uppercase">Payment Successful.</span>
          <Link to="/user/history"> See it in your purchase history.</Link>
        </p>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />

        <Button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </Button>
        {error && (
          <div className="card-error text-danger" role="alert">
            {error}
          </div>
        )}
      </Form>
    </>
  );
};

export default StripeCheckout;
