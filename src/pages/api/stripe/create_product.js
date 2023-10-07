import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const product = await stripe.products.create({
        name: req?.body?.name,
        active: req?.body?.active,
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

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
