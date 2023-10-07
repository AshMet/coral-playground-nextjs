import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const price = await stripe.prices.create({
        active: req?.body?.active,
        // description: req?.body?.description,
        currency: req?.body?.currency,
        nickname: req?.body?.nickname,
        product: req?.body?.product,
        // type: req?.body?.type,
        unit_amount: req?.body?.unit_amount,
        ...(req?.body?.description !== "" && {
          description: req?.body?.description,
        }),
      });

      res.status(200).json(price);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
