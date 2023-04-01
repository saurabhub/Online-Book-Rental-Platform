import React from "react";
import { Badge } from "reactstrap";

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  return (
    <div>
      <p>
        <span> Order Id: {order.paymentIntent.id}</span> |
        <span>
          {" "}
          Amount:{" "}
          {(order.paymentIntent.amount / 100).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </span>{" "}
        |<span> Currency: {order.paymentIntent.currency.toUpperCase()}</span> |
        <span> Method: {order.paymentIntent.payment_method_types[0]}</span> |
        <span> Payment: {order.paymentIntent.status.toUpperCase()}</span> |
        <span>
          {" "}
          Ordered on:{" "}
          {order.paymentIntent.payment_method_types[0] == "cash"
            ? new Date(order.paymentIntent.created).toLocaleString("en-IN")
            : new Date(order.paymentIntent.created * 1000).toLocaleString(
                "en-IN"
              )}
        </span>
        {showStatus && (
          <Badge className="mx-2"> Status: {order?.orderStatus}</Badge>
        )}
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
