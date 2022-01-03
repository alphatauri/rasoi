import Image from "next/image";
import React, { useState } from "react";
import { Product } from "../../pages";
import { getStripe } from "../../utils/getStripe";

export const Card: React.FC<{ product: Product }> = ({ product }) => {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (p: Product) => {
    setLoading(true);
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
    setLoading(true);
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
          type="button"
          onClick={() => handlePurchase(product)}
          disabled={loading}
          className={`
            inline-flex items-center 
            px-4 py-2 
            border border-transparent 
            text-base leading-6 font-medium text-white 
            rounded-md 
            bg-pink-600 hover:bg-pink-500 disabled:bg-pink-400
            disabled:cursor-not-allowed
            focus:outline-none focus:border-pink-700 
            focus:shadow-outline-pink 
            active:bg-pink-700 
            transition ease-in-out duration-150
            `}
        >
          {loading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : null}
          Buy
        </button>
      </div>
    </div>
  );
};
