"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";

interface EmailCaptureProps {
  source?: "homepage" | "footer" | "product";
  variant?: "section" | "compact";
}

export function EmailCapture({
  source = "homepage",
  variant = "section",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // In production this would POST to /api/email-capture with { email, source }
    setSubmitted(true);
  };

  if (variant === "compact") {
    return (
      <div>
        {submitted ? (
          <p className="flex items-center gap-2 text-sm text-vivea-moss">
            <Check className="h-4 w-4" /> You&apos;re in! Check your inbox for 10% off.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white"
              data-source={source}
            />
            <Button type="submit" size="default">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    );
  }

  return (
    <section className="bg-vivea-sand/40 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-vivea-rosewood/15 mb-4">
          <Mail className="h-6 w-6 text-vivea-rosewood" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-vivea-black">
          Get 10% off your first order
        </h2>
        <p className="mt-2 text-sm sm:text-base text-vivea-coffee/80">
          Join the Vivea community for early access to drops, exclusive offers,
          and training tips. No spam — just the good stuff.
        </p>

        {submitted ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-vivea-moss/10 px-4 py-3 text-sm font-medium text-vivea-moss">
            <Check className="h-4 w-4" />
            You&apos;re in! Check your inbox for your 10% off code.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-center"
            data-source={source}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="sm:max-w-xs bg-white"
            />
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Get 10% Off
            </Button>
          </form>
        )}

        <p className="mt-3 text-xs text-vivea-coffee/50">
          By subscribing you agree to receive marketing emails from Vivea
          Athletics. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
