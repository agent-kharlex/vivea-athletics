import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body as {
      items: Array<{
        product_name: string;
        unit_price: number;
        quantity: number;
      }>;
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    // Check if Stripe is configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey || stripeSecretKey === "placeholder") {
      // Mock checkout — return a fake checkout URL
      const orderTotal = items.reduce(
        (sum, item) => sum + item.unit_price * item.quantity,
        0
      );
      return NextResponse.json({
        url: `/order-confirmation?mock=true&total=${orderTotal}`,
        mock: true,
        message: "Stripe not configured — using mock checkout",
      });
    }

    // Real Stripe checkout
    const { getStripeServer } = await import("@/lib/stripe");
    const stripe = getStripeServer();

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product_name,
        },
        unit_amount: item.unit_price,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR"],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
