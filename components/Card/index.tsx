import Image from "next/image";
import React from "react";
import { Product } from "../../pages";
import { getStripe } from "../../utils/getStripe";

export const Card: React.FC<{ product: Product }> = ({ product }) => {
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
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <Image
        src={product.images[0]}
        alt={product.name}
        width={400}
        height={300}
      />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{product.name}</h2>
        <p className="text-gray-700 text-base">{product.description}</p>
      </div>
      <div className="px-6 pb-4 pt-2">
        <button
          onClick={() => handlePurchase(product)}
          className="bg-pink-300 px-4 py-2 rounded hover:bg-pink-400"
        >
          buy
        </button>
      </div>
    </div>
  );
};
