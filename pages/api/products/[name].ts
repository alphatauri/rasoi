import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../..";

export interface ApiError {
  message: string;
  ok: boolean;
}

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Array<Product> | ApiError>
) {
  try {
    const { name } = req.query;

    const product = await fetch(
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
          collection: "products",
          filter: { name },
        }),
      }
    ).then((r) => r.json());

    return res.status(200).json(product.document);
  } catch (e: any) {
    return res.status(500).json({ ok: false, message: e.message || "Error" });
  }
}
