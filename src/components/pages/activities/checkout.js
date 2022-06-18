import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export default async function checkout({ lineItems, metadata }) {
  let stripePromise = null;

  // Create Stripe checkout
  const {
    data: { id },
  } = await axios.post(
    "https://www.coralplayground.com/api/checkout_sessions",
    {
      items: lineItems,
      metadata,
    }
  );

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
  };

  // const checkoutOptions = {
  //   lineItems,
  //   mode: "payment",
  //   successUrl: `${window.location.origin}/activities/booking/success?session_id={CHECKOUT_SESSION_ID}`,
  //   cancelUrl: `${window.location.origin}/activities/learn`,
  // };

  // const stripe = await getStripe();
  // await stripe.redirectToCheckout(checkoutOptions);
  // const { error } = await stripe.redirectToCheckout(checkoutOptions);
  // if (error) console.log("Stripe checkout error", error.message);

  // Redirect to checkout
  const stripe = await getStripe();
  await stripe.redirectToCheckout({ sessionId: id });
}
