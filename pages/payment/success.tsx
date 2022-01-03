import type { GetServerSideProps, NextPage } from "next";
import { Header } from "../../components/Header";
import { retrieveSession } from "../../utils/retrieveSession";

const PaymentSucess: NextPage = () => {
  return (
    <main className="w-9/12 mx-auto max-w-1920px">
      <Header />

      <div className="text-center flex flex-col items-center">
        <svg
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-48 h-48 "
        >
          <path
            fill="#db2777"
            d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"
          ></path>
        </svg>
        <h2 className="text-3xl font-bold text-pink-600 mt-10 mb-2">
          Thank You!
        </h2>
        <p className="text-base text-gray-700">
          We'll send you an email with tracking info soon.
        </p>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (c) => {
  const sessionId = c.query["session_id"] as string | undefined;

  if (!sessionId) {
    return {
      redirect: { destination: "/payment/failed", permanent: true },
    };
  }
  const session = await retrieveSession(sessionId!);

  if (!(session.status === "complete" && session.payment_status === "paid")) {
    return {
      redirect: {
        destination: `/payment/failed?session_id=${sessionId}`,
        permanent: true,
      },
    };
  }

  return { props: {} };
};

export default PaymentSucess;
