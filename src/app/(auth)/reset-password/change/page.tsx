"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconLock, IconEye, IconEyeOff, IconArrowLeft, IconCheck } from "@tabler/icons-react";

import { useAuth } from "@/hooks/useAuth";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [error, setError] = useState("");
  
  const {
    resetPasswordHandler,
    auth: { isLoading },
  } = useAuth();
  
  let email: string =
    typeof window !== "undefined" ? sessionStorage.getItem("email") ?? "" : "";

  if (!email) {
    const token = decodeURIComponent(typeof window !== "undefined" ? document.cookie : "")
      .split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];
    const decodedToken: any = jwt.decode(token || "");
    email = decodedToken?.useremail;
  }
  
  const router = useRouter();

  const notify = () => {
    toast.success("Password changed successfully", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#3563E9",
        borderRadius: "12px",
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      setError("Both password fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    
    setError("");
    
    const res = await resetPasswordHandler({ newPassword, email });
    if (res && "data" in res && res?.data?.success) {
      notify();
      router.push("/password-updated");
    }
  };

  // Password strength indicators
  const passwordChecks = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
  };

  const showPasswordStrength = newPassword.length > 0;

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        href="/reset-password/verify-otp"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <IconArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Create new password
        </h1>
        <p className="text-muted-foreground">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* New Password Input */}
        <div className="space-y-2">
          <label htmlFor="newPassword" className="text-sm font-medium text-foreground">
            New password
          </label>
          <div className="relative">
            <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="newPassword"
              type={isVisible ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="auth-input pl-12 pr-12"
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {isVisible ? (
                <IconEyeOff className="w-5 h-5" />
              ) : (
                <IconEye className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {/* Password Strength Indicators */}
          {showPasswordStrength && (
            <div className="grid grid-cols-2 gap-2 mt-3 p-3 bg-muted/50 rounded-lg">
              {[
                { check: passwordChecks.length, label: "8+ characters" },
                { check: passwordChecks.uppercase, label: "Uppercase letter" },
                { check: passwordChecks.lowercase, label: "Lowercase letter" },
                { check: passwordChecks.number, label: "Number" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  {item.check ? (
                    <IconCheck className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                  )}
                  <span className={item.check ? "text-green-600" : "text-muted-foreground"}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
            Confirm new password
          </label>
          <div className="relative">
            <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="confirmPassword"
              type={isConfirmVisible ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="auth-input pl-12 pr-12"
            />
            <button
              type="button"
              onClick={() => setIsConfirmVisible(!isConfirmVisible)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {isConfirmVisible ? (
                <IconEyeOff className="w-5 h-5" />
              ) : (
                <IconEye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="auth-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <div className="spinner" />
              <span>Updating password...</span>
            </span>
          ) : (
            <span>Update password</span>
          )}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
