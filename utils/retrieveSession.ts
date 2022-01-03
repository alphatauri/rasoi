import Stripe from "stripe";
import { SERVER_URL } from "../config";

export const retrieveSession = async (
  sessionId: string
): Promise<Stripe.Checkout.Session> => {
  return await fetch(`${SERVER_URL}/api/checkout_session/${sessionId}`).then((r) =>
    r.json()
  );
};
