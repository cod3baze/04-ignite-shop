import Stripe from "stripe";

const secret_key = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string;

export const stripe = new Stripe(secret_key, {
  apiVersion: "2022-08-01",
  appInfo: {
    name: "Cognu Shop",
  },
});
