import type { NextPage } from "next";
import { Header } from "../../components/Header";

const PaymentSucess: NextPage = () => {
  return (
    <main className="w-9/12 mx-auto max-w-1920px">
      <Header />

      <div className="text-center flex flex-col items-center">
        <svg
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-48 h-48"
        >
          <path
            fill="#db2777"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111
            248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5
            56 256 56s200 89.5 200 200-89.5 200-200
            200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0
            17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2
            62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3
            0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3
            0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2
            62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0
            17z"
          ></path>
        </svg>

        <h2 className="text-3xl font-bold text-pink-600 mt-10 mb-2">Sorry!</h2>
        <p className="text-base text-gray-700">
          We couldn't register your order due to some issue. Please try again.
        </p>
      </div>
    </main>
  );
};

export default PaymentSucess;
