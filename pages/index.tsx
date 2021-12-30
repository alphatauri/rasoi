import type { NextPage, GetStaticProps } from "next";
import { SERVER_URL } from "../config";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: Array<string>;
}

const Home: NextPage<{ products: Array<Product> }> = ({ products }) => {
  return (
    <div className="mx-auto w-95 mt-24">
      {products.map((p) => (
        <div className="flex items-center">
          <h4>{p.name}</h4>
          <span className="w-4"></span>
          <button className="bg-red-300 px-4 py-2 rounded">buy</button>
        </div>
      ))}
    </div>
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
