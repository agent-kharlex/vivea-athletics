import { NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!webhookSecret || !stripeSecretKey) {
      // Mock webhook — accept everything
      return NextResponse.json({ received: true, mock: true });
    }

    const { getStripeServer } = await import("@/lib/stripe");
    const stripe = getStripeServer();

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Create order in Supabase
      const { createServerSupabaseClient } = await import("@/lib/supabase");
      const supabase = createServerSupabaseClient();

      const { error } = await supabase.from("orders").insert({
        email: session.customer_email,
        status: "paid",
        total_cents: session.amount_total,
        stripe_session_id: session.id,
        paid_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Failed to create order:", error);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}
