/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable default-case */
/* eslint-disable no-console */
import axios from "axios";
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

const createBooking = async (session) => {
  // create booking on moralis using metadata passed from session
  // Including sessionId
  const customer = await stripe.customers.retrieve(session.customer);
  console.log("webhook customer", customer);
  console.log("webhook session", session);

  // Add Email customer confirmation
  const getLineItems = () => {
    const dives = Object.values(session.metadata);
    const lineItems = dives.map((dive) => JSON.parse(dive));
    console.log("webhook dives", dives);
    console.log("webhook lineitems", lineItems);
    return lineItems.map((item) => ({
      dive_trip_id: item.id,
      user_selected_time: item.diveDate,
      // .setHours(
      //   item.diveTime.split(":")[0],
      //   item.diveTime.split(":")[1]
      // ),
      quantity: 1,
    }));
  };

  axios
    .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/orders`, {
      order: {
        diver_name: session.customer_details.name || "unknown",
        email: session.customer_details.email,
        diving_cert: customer.metadata?.diverCert,
        last_dive: customer.metadata?.lastDive,
        notes: customer.metadata?.notes,
        total_price: parseFloat(session.amount_total),
        currency: session.currency,
        status: session.payment_status,
        stripe_cust_id: session.customer,
        stripe_session_id: session.id,
        line_items_attributes: getLineItems(),
      },
    })
    .then(
      (order) => {
        console.log(`Booking Saved: ${order}`);
      },
      (error) => {
        // The save failed.
        // error is a Moralis.Error with an error code and message.
        console.log(`Booking Error: ${error}`);
      }
    );
  console.log("Creating order session", session);
};

const emailCustomerAboutFailedPayment = (session) => {
  // TODO: fill me in
  console.log("Emailing customer", session);
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    let event;

    // const parsedBody = req.isBase64Encoded
    //   ? Buffer.from(req.body, "base64").toString("utf-8")
    //   : req.body;

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
