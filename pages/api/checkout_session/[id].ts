import { NextApiRequest, NextApiResponse } from "next";

import CreateStripe, { Stripe } from "stripe";

const stripe = new CreateStripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: string = req.query.id as string;

  try {
    if (!id.startsWith("cs_")) {
      throw Error("Incorrect CheckoutSession ID.");
    }
    const checkout_session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(id, {
        expand: ["line_items"],
      });

    res.status(200).json(checkout_session);
  } catch (e: any) {
    res.status(500).json({ statusCode: 500, message: e.message });
  }
}
