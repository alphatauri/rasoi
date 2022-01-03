import Stripe from "stripe";

export const retrieveSession = async (
  sessionId: string
): Promise<Stripe.Checkout.Session> => {
  return await fetch(`/api/checkout_session/${sessionId}`).then((r) =>
    r.json()
  );
};
