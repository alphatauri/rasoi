import { NextApiRequest, NextApiResponse } from "next";
import CreateStripe from "stripe";
import { Product } from "../..";
import { SERVER_URL } from "../../../config";
import { formatAmountForStripe } from "../../../utils/stripeHelpers";

const stripe = new CreateStripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!req.body?.price) {
      res.status(400).json({ message: "Bad Request", ok: false });
      return;
    }

    const p: Product = req.body;
    const product = (await fetch(
      `${SERVER_URL}/api/products/${encodeURI(p.name)}`
    ).then((r) => r.json())) as Product | null;

    if (!product) {
      res.status(400).json({ message: "Bad Request", ok: false });
      return;
    }

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: product.name,
                description: product.description,
                images: product.images,
              },
              unit_amount_decimal: formatAmountForStripe(
                product.price,
                "inr"
              ).toString(),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${SERVER_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${SERVER_URL}/payment/failed?session_id={CHECKOUT_SESSION_ID}`,
      });

      res.status(200).json({ ok: true, id: session.id });
    } catch (err: any) {
      res
        .status(500)
        .json({ statusCode: 500, message: err.message, ok: false });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: "Method Not Allowed", ok: false });
  }
}
