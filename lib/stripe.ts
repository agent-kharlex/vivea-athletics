import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

/**
 * Server-side Stripe client.
 * Used in API routes, webhooks, and server actions for creating
 * checkout sessions, managing products, and processing payments.
 */
let stripeInstance: Stripe | null = null;

export function getStripeServer(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "Missing Stripe secret key. Set STRIPE_SECRET_KEY in .env.local"
    );
  }

  if (!stripeInstance) {
    stripeInstance = new Stripe(secretKey, {
      typescript: true,
    });
  }

  return stripeInstance;
}

/**
 * Browser-side Stripe.js client.
 * Used for redirecting to Stripe Checkout and rendering payment elements.
 */
let stripePromise: ReturnType<typeof loadStripe> | null = null;

export function getStripeClient() {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      "Missing Stripe publishable key. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local"
    );
  }

  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
}

export { stripeInstance, stripePromise };
export type { Stripe };
