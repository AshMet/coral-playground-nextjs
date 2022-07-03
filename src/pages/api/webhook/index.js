/* eslint-disable default-case */
/* eslint-disable no-console */
import { buffer } from "micro";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const fulfillOrder = (session) => {
  // TODO: fill me in
  console.log("Fulfilling order", session);
};

const createUser = (customerId) => {
  // If user is logged in
  // add stripe customerId
  // otherwise create a new user with that customerId
  console.log("Customer Id", customerId);
};

const createBooking = (session) => {
  // create booking on moralis using metadata passed from session
  // Including sessionId

  // Email customer confirmation
  console.log("Creating order", session);
};

const emailCustomerAboutFailedPayment = (session) => {
  // TODO: fill me in
  console.log("Emailing customer", session);
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    let event;

    try {
      // 1. Retrieve the event by verifying the signature using the raw body and secret
      const rawBody = await buffer(req);
      const signature = req.headers["stripe-signature"];

      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event
    console.log("✅ Success:", event.id);

    switch (event.type) {
      case "checkout.session.completed": {
        console.log(`💰  Payment received!`);
        console.log("event", event);
        const session = event.data.object;
        const customerId = event.data.object.customer;
        // Save an order in your database, marked as 'awaiting payment'
        createUser(customerId);
        createBooking(session);

        // Check if the order is paid (for example, from a card payment)
        //
        // A delayed notification payment will have an `unpaid` status, as
        // you're still waiting for funds to be transferred from the customer's
        // account.
        if (session.payment_status === "paid") {
          fulfillOrder(session);
        }
        break;
      }

      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;
        // Fulfill the purchase...
        fulfillOrder(session);
        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object;
        // Send an email to the customer asking them to retry their order
        emailCustomerAboutFailedPayment(session);
        break;
      }
    }

    // 3. Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
