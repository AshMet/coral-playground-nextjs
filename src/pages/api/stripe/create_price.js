/* eslint-disable sonarjs/no-small-switch */
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
      // console.log("price: ", price);

      res.status(200).json(price);
    } catch (err) {
      switch (err.type) {
        case "StripeInvalidRequestError":
          if (err.param === "lookup_key") {
            // console.log(`Lookup key exists: ${req.body.lookup_key}`);
            const existingPrice = await stripe.prices.search({
              query: `lookup_key:"${req.body.lookup_key}"`,
            });
            // console.log("existingPrice: ", existingPrice.data[0]);
            res.status(200).json(existingPrice.data[0]);
          }
          break;
        default:
          // console.log(`Another problem occurred, ${err.type}.`);
          res.status(500).json({ statusCode: 500, message: err.message });
          break;
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
