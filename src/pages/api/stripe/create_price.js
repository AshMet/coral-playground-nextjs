// NOTE: This is still failing when the user tries to add a previously created  price
// NEED TO FIX

/* eslint-disable no-useless-escape */
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // const {active, currency, nickname, product, price} = req.body;
  // query: `lookup_key:\'${req?.body?.lookup_key}\' AND product:\'${req?.body?.product}\'`,
  if (req.method === "POST") {
    try {
      const price = await stripe.prices.create({
        // active: req?.body?.active,
        // description: req?.body?.description,
        currency: req?.body?.currency,
        nickname: req?.body?.nickname,
        lookup_key: req?.body?.lookup_key,
        product: req?.body?.product,
        // type: req?.body?.type,
        unit_amount: req?.body?.unit_amount,
      });

      res.status(200).json(price);
    } catch (err) {
      const existingPrice = await stripe.prices.search({
        query: `lookup_key:\'${req?.body?.lookup_key}\'`,
      });
      if (existingPrice.length > 0) {
        // console.log("existingPrice", existingPrice[0]);
        res.status(200).json(existingPrice[0]);
      }
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
