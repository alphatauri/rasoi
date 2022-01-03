import type { NextPage, GetStaticProps } from "next";

import { SERVER_URL } from "../config";
import { Card } from "../components/Card";
import { Header } from "../components/Header";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: Array<string>;
}

const Home: NextPage<{ products: Array<Product> }> = ({ products }) => {
  return (
    <main className="w-9/12 mx-auto max-w-1920px">
      <Header />
      <div className="grid md:(grid-cols-2 gap-x-4) gap-y-4 lg:(gap-y-0 grid-cols-3) justify-items-center mb-4">
        {products.map((p) => (
          <Card key={p._id} product={p} />
        ))}
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const products = await fetch(`${SERVER_URL}/api/products`).then((r) =>
      r.json()
    );

    return {
      props: {
        products,
      },
    };
  } catch (e: any) {
    return {
      props: {
        products: [],
        error: e.message,
      },
    };
  }
};

export default Home;
