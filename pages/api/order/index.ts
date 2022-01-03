import { NextApiRequest, NextApiResponse } from "next";
import { retrieveSession } from "../../../utils/retrieveSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // get session
    const sessionId = req.body.sessionId as string | undefined;

    if (!sessionId) {
      res.status(400).json({ message: "Bad Request", ok: false });
      return;
    }

    const session = await retrieveSession(sessionId);

    // validate session
    if (session.status !== "complete" && session.payment_status !== "paid") {
      res.status(400).json({ message: "Bad Request", ok: false });
      return;
    }

    const order = await fetch(
      `https://data.mongodb-api.com/app/${process.env.MONGO_DATA_APP}/endpoint/data/beta/action/findOne`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.MONGODATA_API_KEY!,
        },
        body: JSON.stringify({
          dataSource: process.env.MONGO_CLUSTER,
          database: process.env.MONGO_DB,
          collection: "orders",
          filter: { sessionId },
        }),
      }
    ).then((r) => r.json());

    if (order.document) {
      res.status(400).json({ message: "Bad Request", ok: false });
      return;
    }

    // save in order collection

    fetch(
      `https://data.mongodb-api.com/app/${process.env.MONGO_DATA_APP}/endpoint/data/beta/action/insertOne`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.MONGODATA_API_KEY!,
        },
        body: JSON.stringify({
          dataSource: process.env.MONGO_CLUSTER,
          database: process.env.MONGO_DB,
          collection: "orders",
          document: {
            sessionId,
            email: session.customer_details?.email,
            amount: session.amount_total,
            items: session.line_items,
          },
        }),
      }
    );

    res.status(201).json({ ok: true, message: "order saved" });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: "Method Not Allowed", ok: false });
  }
}
