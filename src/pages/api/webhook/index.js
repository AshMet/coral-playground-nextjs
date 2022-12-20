/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable default-case */
/* eslint-disable no-console */
import { buffer } from "micro";
import Stripe from "stripe";

import { supabase } from "..";

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

  // Create Order
  const { data: order, error } = await supabase
    .from("orders")
    .insert([
      {
        diver_name: session.customer_details.name || "unknown",
        email: session.customer_details.email,
        diving_cert: customer.metadata?.diverCert,
        last_dive: customer.metadata?.lastDive,
        notes: customer.metadata?.notes,
        amount_paid: parseFloat(session.amount_total),
        // amount_total: parseFloat(session.amount_total),
        currency: session.currency,
        status: session.payment_status,
        stripe_customer_id: session.customer,
        stripe_session_id: session.id,
      },
    ])
    .select()
    .single();
  const newOrder = JSON.stringify(order.id);
  console.log(`Booking Saved: ${newOrder}`);
  // console.log(`BookingId Saved: ${newOrder.id}`);
  if (error) {
    console.log(`Booking Save Failed: ${JSON.stringify(error)}`);
  }

  // Create Line Items
  const dives = Object.values(session.metadata);
  const lineItems = dives.map((dive) => JSON.parse(dive));

  console.log("webhook lineitems", lineItems);

  const insertData = lineItems.map((item) => ({
    // eslint-disable-next-line prettier/prettier
    order_id: newOrder.replace(/["]/g, ''),
    dive_trip_id: item.id,
    user_selected_time: item.diveDate,
    quantity: 1,
  }));

  // Need to format insert Data as array only for multiple items
  const { data: newLineItems, error: lineItemError } = await supabase
    .from("line_items")
    .insert(insertData.length === 1 ? insertData[0] : insertData)
    .select();

  console.log("insertData", insertData);
  console.log("line_items", newLineItems);
  if (error) {
    console.log(`Line Item Save Failed: ${JSON.stringify(lineItemError)}`);
  }
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
