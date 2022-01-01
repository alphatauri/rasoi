import { NextApiRequest, NextApiResponse } from "next";
import createStripe from "stripe";
import { SERVER_URL } from "../../../config";

const stripe = new createStripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(JSON.stringify(req.headers, null, 2));
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: "T-shirt",
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${SERVER_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${SERVER_URL}/payment/failed?session_id={CHECKOUT_SESSION_ID}`,
      });

      res.redirect(session.url!);
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
