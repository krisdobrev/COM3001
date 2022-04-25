import React from "react";
import PaymentStatus from "./PaymentStatus";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PaymentCompleted = () => (
  <div className="Stripe">
    <Elements stripe={stripePromise}>
      <PaymentStatus />
    </Elements>
  </div>
);

export default PaymentCompleted;
