import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source } = body as { email: string; source?: string };

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Try Supabase — but env vars may be placeholders
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (
      !supabaseUrl ||
      !supabaseAnonKey ||
      supabaseAnonKey === "placeholder_get_from_dashboard"
    ) {
      // Mock response — don't actually save
      return NextResponse.json({
        success: true,
        discount_code: "VIVEA10",
        mock: true,
      });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.from("email_captures").insert({
      email,
      source: source || "newsletter",
      discount_code: "VIVEA10",
    });

    if (error) {
      // If duplicate email, still return success
      if (error.code === "23505") {
        return NextResponse.json({
          success: true,
          discount_code: "VIVEA10",
          message: "You're already on the list!",
        });
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      discount_code: "VIVEA10",
    });
  } catch (error) {
    console.error("Email capture error:", error);
    return NextResponse.json(
      { error: "Failed to save email" },
      { status: 500 }
    );
  }
}
