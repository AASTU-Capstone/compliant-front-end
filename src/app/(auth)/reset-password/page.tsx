"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconMail, IconArrowLeft } from "@tabler/icons-react";

import { useAuth } from "@/hooks/useAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const {
    forgotPasswordHandler,
    auth: { isLoading },
  } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === "" || email === null) {
      setError("Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError("");
    sessionStorage.setItem("email", email);
    
    try {
      const res = await forgotPasswordHandler({ email: email });
      if (res && "data" in res && res?.data?.success) {
        router.push("/reset-password/verify-otp");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmail(event.target.value);
  };

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <IconArrowLeft className="w-4 h-4" />
        Back to login
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Forgot your password?
        </h1>
        <p className="text-muted-foreground">
          No worries! Enter your email and we&apos;ll send you a reset code.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email address
          </label>
          <div className="relative">
            <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="name@example.com"
              value={email}
              onChange={handleEmailChange}
              className={`auth-input pl-12 ${
                error ? "border-destructive focus:ring-destructive/20 focus:border-destructive" : ""
              }`}
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="auth-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <div className="spinner" />
              <span>Sending code...</span>
            </span>
          ) : (
            <span>Send reset code</span>
          )}
        </button>
      </form>

      {/* Help Text */}
      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
