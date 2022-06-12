/* eslint-disable no-undef */
import { loadStripe } from "@stripe/stripe-js";

export default async function checkout({ lineItems }) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
  };

  const checkoutOptions = {
    lineItems,
    mode: "payment",
    successUrl: `${window.location.origin}/activities/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/activities/learn`,
  };

  const stripe = await getStripe();
  await stripe.redirectToCheckout(checkoutOptions);
  // const { error } = await stripe.redirectToCheckout(checkoutOptions);
  // if (error) console.log("Stripe checkout error", error.message);
}
