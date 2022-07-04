/* eslint-disable no-undef */
/* eslint-disable object-shorthand */
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export default async function checkout({
  lineItems,
  diverName,
  diverEmail,
  custMetadata,
  sessionMetadata,
}) {
  let stripePromise = null;

  // Create Stripe customer
  const {
    data: { id: custId },
  } = await axios.post(`${window.location.origin}/api/stripe_customers`, {
    name: diverName,
    email: diverEmail,
    metadata: custMetadata,
  });
  // Create Stripe checkout
  const {
    data: { id },
  } = await axios.post(`${window.location.origin}/api/checkout_sessions`, {
    items: lineItems,
    metadata: sessionMetadata,
    customer: custId,
  });

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
  };

  // const checkoutOptions = {
  //   lineItems,
  //   mode: "payment",
  //   successUrl: `${window.location.origin}/diving/booking/success?session_id={CHECKOUT_SESSION_ID}`,
  //   cancelUrl: `${window.location.origin}/diving/learn`,
  // };

  // const stripe = await getStripe();
  // await stripe.redirectToCheckout(checkoutOptions);
  // const { error } = await stripe.redirectToCheckout(checkoutOptions);
  // if (error) console.log("Stripe checkout error", error.message);

  // Redirect to checkout
  const stripe = await getStripe();
  await stripe.redirectToCheckout({ sessionId: id });
}
