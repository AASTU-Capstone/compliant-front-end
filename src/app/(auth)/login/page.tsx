"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconMail, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "@/hooks/useAuth";
import { resetAuth } from "@/lib/redux/slices/authSlice";
import { useWebSocket } from "@/providers/WebSocketContext";

interface ErrorData {
  success: boolean;
  isVerified: boolean;
}

interface ErrorResponse {
  data: ErrorData;
}

const notify = () => {
  toast.success("Logged in Successfully", {
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

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const auth = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const { connectWebSocket } = useWebSocket();

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const res = await auth.loginHandler({ email, password });

    if (res && "data" in res) {
      if (res.data.success && res.data.isVerified) {
        const decodedToken: any = jwt.decode(res.data.token);
        const userType = decodedToken.typ;
        const userId = decodedToken.userid;

        localStorage.setItem("userId", userId);
        connectWebSocket(userId);
        notify();

        switch (userType) {
          case "admin":
            router.push("/admin/dashboard");
            break;
          case "manager":
            router.push("/manager/dashboard");
            break;
          case "subordinate":
            router.push("/subordinate/dashboard");
            break;
          case "user":
            router.push("/user/dashboard");
            break;
          default:
            router.push("/");
            break;
        }
      }
    } else if (res && res.error && "data" in res.error) {
      const errorData = res.error.data as ErrorResponse["data"];
      if (errorData.success && !errorData.isVerified) {
        router.push("/signup/verify-otp?email=" + email);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Welcome back
        </h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      {/* Error Alert */}
      {auth.auth.error && auth.auth.error.data && !auth.auth.error.data.success && (
        <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
          <Image
            src="/images/sign-error.svg"
            width={20}
            height={20}
            alt="error"
            className="cursor-pointer flex-shrink-0"
            onClick={() => dispatch(resetAuth())}
          />
          <p className="text-sm text-destructive">
            {auth.auth.error?.status === "FETCH_ERROR"
              ? "Network Error. Please check your connection."
              : auth.auth.error?.data.message}
          </p>
        </div>
      )}

      {/* Login Form */}
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input pl-12"
              data-testid="email-input"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <Link
              href="/reset-password"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="password"
              type={isVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input pl-12 pr-12"
              data-testid="password-input"
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
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="auth-button"
          data-testid="login-button"
          disabled={auth.auth.isLoading}
        >
          {auth.auth.isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <div className="spinner" />
              <span>Signing in...</span>
            </span>
          ) : (
            <span>Sign in</span>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>

      {/* Social Login */}
      <button
        type="button"
        className="auth-button-secondary flex items-center justify-center gap-3"
      >
        <FcGoogle className="w-5 h-5" />
        <span>Continue with Google</span>
      </button>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Create an account
        </Link>
      </p>

      <ToastContainer />
    </div>
  );
}
