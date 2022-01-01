import type { NextPage, GetStaticProps } from "next";
import { SERVER_URL } from "../config";
import { getStripe } from "../utils/getStripe";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: Array<string>;
}

const Home: NextPage<{ products: Array<Product> }> = ({ products }) => {
  // creates strip session and redirects to the checkout page
  const handlePurchase = async (p: Product) => {
    const session = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(p),
    }).then((r) => r.json());

    if (session.statusCode === 500) {
      console.error(session.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: session.id,
    });
    console.warn(error.message);
  };

  return (
    <div className="mx-auto w-95 mt-24">
      {products.map((p) => (
        <div className="flex items-center">
          <h4>{p.name}</h4>
          <span className="w-4"></span>
          <button
            onClick={() => handlePurchase(p)}
            className="bg-red-300 px-4 py-2 rounded"
          >
            buy
          </button>
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
