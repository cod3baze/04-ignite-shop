// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

type Data = {
  checkoutUrl?: string | null;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed." });

  const priceId = req.body.priceId as string;

  if (!priceId) return res.status(400).json({ error: "Price not found." });

  const successUrl = `${process.env.NEXT_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_APP_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelUrl,
    success_url: successUrl,
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
  });

  res.status(201).json({ checkoutUrl: checkoutSession.url });
}
