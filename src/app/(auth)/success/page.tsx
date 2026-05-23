"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IconCircleCheck, IconArrowRight } from "@tabler/icons-react";

export default function Success() {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/login");
  };

  return (
    <div className="space-y-8 text-center">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <IconCircleCheck className="w-14 h-14 text-green-500" />
        </div>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Email verified!
        </h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Your email has been successfully verified. You can now sign in to your account.
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={handleOnClick}
        className="auth-button inline-flex items-center justify-center gap-2"
      >
        <span>Continue to login</span>
        <IconArrowRight className="w-5 h-5" />
      </button>

      {/* Decorative Elements */}
      <div className="pt-8">
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary/20" />
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}
