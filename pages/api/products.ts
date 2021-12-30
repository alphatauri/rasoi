import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "..";

export interface ApiError {
  message: string;
  ok: boolean;
}

export default async (
  _: NextApiRequest,
  res: NextApiResponse<Array<Product> | ApiError>
) => {
  try {
    const products = await fetch(
      `https://data.mongodb-api.com/app/${process.env.MONGO_DATA_APP}/endpoint/data/beta/action/find`,
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
        }),
      }
    ).then((r) => r.json());

    return res.status(200).json(products.documents);
  } catch (e: any) {
    return res.status(500).json({ ok: false, message: e.message || "Error" });
  }
};
