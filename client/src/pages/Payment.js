import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Col, Container } from "reactstrap";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <Container fluid>
      <h4 className="py-3 text-center">Complete your purchase</h4>
      <Elements stripe={stripePromise}>
        <Col md="6" className="mx-auto" >
          <StripeCheckout />
        </Col>
      </Elements>
    </Container>
  );
};

export default Payment;
