/* eslint-disable consistent-return */
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const existingProd = await stripe.products.search({
      query: `name:"${req.body.name}"`,
    });
    if (existingProd.data.length > 0) {
      // console.log("existingProd: ", existingProd.data[0]);
      return res.status(200).json(existingProd.data[0]);
    }
    try {
      const product = await stripe.products.create({
        name: req?.body?.name,
        // active: req?.body?.active,
        // description: req?.body?.description,
        metadata: req?.body?.metadata ?? {},
        ...(req?.body?.description !== "" && {
          description: req?.body?.description,
        }),
        // default_price_data: {
        //   currency: req?.body?.currency,
        //   unit_amount: req?.body?.unit_amount,
        // },
      });
      // console.log("product: ", product);

      res.status(200).json(product);
    } catch (err) {
      // console.log(`Another problem occurred, ${err.message}.`);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
