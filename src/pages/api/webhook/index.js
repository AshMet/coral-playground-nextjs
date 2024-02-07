/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable default-case */
/* eslint-disable no-console */
import { buffer } from "micro";
import { PostHog } from "posthog-node";
import Stripe from "stripe";

import { getServiceSupabase } from "utils/initializers/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = getServiceSupabase();
const client = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY,
  { host: process.env.NEXT_PUBLIC_POSTHOG_HOST } // You can omit this line if using PostHog Cloud
)

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
  // create booking using metadata passed from session including sessionId
  const customer = await stripe.customers.retrieve(session.customer);
  console.log("webhook customer", customer);
  console.log("webhook session", session);

  const stripeOrder = JSON.parse(session.metadata.order);

  // Create Order
  // const { data: order, error } = await supabase
  //   .from("orders")
  //   .insert([
  //     {
  //       diver_name: session.customer_details.name || "unknown",
  //       email: session.customer_details.email,
  //       diving_cert: customer.metadata?.diverCert,
  //       last_dive: customer.metadata?.lastDive,
  //       notes: customer.metadata?.notes,
  //       amount_paid: parseFloat(session.amount_total),
  //       // amount_total: parseFloat(session.amount_total),
  //       currency: session.currency,
  //       status: session.payment_status,
  //       stripe_customer_id: session.customer,
  //       stripe_session_id: session.id,
  //     },
  //   ])
  //   .select()
  //   .single();

  // Update Order
  const { data: order, error } = await supabase
    .from('orders')
    .update({
      amount_paid: parseFloat(session.amount_total),
      status: session.payment_status,
      currency: session.currency,
      // stripe_customer_id: session.customer,
      stripe_session_id: session.id,
    })
    .eq('id', stripeOrder.id);

  console.log(`Booking Saved: ${JSON.stringify(order)}`);
  if (error) {
    client.capture("Order Creation Failed", {
      "Order Id": stripeOrder.id,
      Error: error.message,
    });
    // console.log(`Booking Save Failed: ${JSON.stringify(error)}`);
  } else if (order) {
    client.capture({
      distinctId: order.user_id,
      event: "Order Created",
      properties: {
        "Order Id": order.id,
        "Diving Cert": order.diving_cert,
        "Last Dive": order.last_dive,
        "Amount Paid": order.amount_paid / 100,
        "Amount Total": order.amount_total / 100,
        Currency: order.currency,
        Status: order.status,
      },
    })
  }

  // Create Line Items
  // const dives = Object.values(session.metadata);
  // const lineItems = dives.map((dive) => JSON.parse(dive));

  // console.log("webhook lineitems", lineItems);
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

    // On program exit, call shutdown to stop pending pollers and flush any remaining events
    await client.shutdownAsync();

    // 3. Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
