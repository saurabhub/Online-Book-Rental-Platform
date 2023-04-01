import axios from "axios";

export const createPaymentIntent = async (authtoken, isCoupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    {couponApplied: isCoupon},
    {
      headers: {
        authtoken,
      },
    }
  );
