"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IconCircleCheck, IconArrowRight, IconLock } from "@tabler/icons-react";

export default function PasswordUpdated() {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/login");
  };

  return (
    <div className="space-y-8 text-center">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <IconLock className="w-12 h-12 text-green-500" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <IconCircleCheck className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Password updated!
        </h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Your password has been successfully changed. You can now sign in with your new password.
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

      {/* Security Tip */}
      <div className="pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg text-sm text-muted-foreground">
          <IconLock className="w-4 h-4" />
          <span>Keep your password safe and secure</span>
        </div>
      </div>
    </div>
  );
}
