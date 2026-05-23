"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { IconArrowLeft, IconMail } from "@tabler/icons-react";

import { useCreateOTPMutation, useVerifyAccountMutation } from "@/lib/redux/features/user";

function VerifyOTPContent() {
  const [values, setValues] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const [createOTP] = useCreateOTPMutation();
  const [verifyAccount, { isLoading }] = useVerifyAccountMutation();
  
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email") || "";

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResendCode = async () => {
    await createOTP({ email });
    setTimer(60);
  };

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    if (value.match(/^[0-9]$/)) {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);
      
      if (index < values.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      const newValues = [...values];
      newValues[index] = "";
      setValues(newValues);
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && values[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasteValue = event.clipboardData.getData("text").replace(/\D/g, "");
    const newValues = [...values];
    
    for (let i = 0; i < Math.min(pasteValue.length, values.length - index); i++) {
      newValues[index + i] = pasteValue[i];
    }
    
    setValues(newValues);
    
    const nextIndex = Math.min(index + pasteValue.length, values.length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const res = await verifyAccount({ email, OTPCode: values.join("") });
    if (res && "data" in res) {
      if (res.data.success) {
        router.push(`/success`);
      }
    }
  };

  const isComplete = values.every((v) => v !== "");

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        href="/signup"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <IconArrowLeft className="w-4 h-4" />
        Back to sign up
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Verify your email
        </h1>
        <p className="text-muted-foreground">
          We&apos;ve sent a 6-digit verification code to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      {/* OTP Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Input Boxes */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Verification code
          </label>
          <div className="flex gap-3">
            {values.map((value, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(index, e)}
                className="w-12 h-14 text-center text-xl font-semibold bg-white border border-border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            ))}
          </div>
        </div>

        {/* Resend Code */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={timer > 0}
            className={`text-sm transition-colors ${
              timer > 0
                ? "text-muted-foreground cursor-not-allowed"
                : "text-primary hover:text-primary/80 cursor-pointer"
            }`}
          >
            {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="auth-button"
          disabled={isLoading || !isComplete}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <div className="spinner" />
              <span>Verifying...</span>
            </span>
          ) : (
            <span>Verify email</span>
          )}
        </button>
      </form>

      {/* Email Icon */}
      <div className="flex justify-center pt-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <IconMail className="w-8 h-8 text-primary" />
        </div>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-8">
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-8 w-48 bg-muted rounded animate-pulse" />
            <div className="h-5 w-64 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex gap-3">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="w-12 h-14 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <VerifyOTPContent />
    </Suspense>
  );
}
