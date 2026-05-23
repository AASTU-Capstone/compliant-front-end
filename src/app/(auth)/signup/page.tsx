"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { IconMail, IconLock, IconEye, IconEyeOff, IconCheck, IconX } from "@tabler/icons-react";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "@/hooks/useAuth";
import { resetAuth } from "@/lib/redux/slices/authSlice";
import { SignUpValidation } from "@/utils/schema";

const notify = () => {
  toast.success("OTP sent, check your email", {
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

export default function SignUp() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  
  const {
    signupHandler,
    auth: { isLoading, error },
  } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpValidation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, actions) => {
      if (values.email && values.password) {
        const credentials = {
          email: values.email,
          password: values.password,
          user_Type: "user",
        };
        const res = await signupHandler(credentials);
        if (res && "data" in res) {
          if (res.data.success) {
            notify();
            router.push(`/signup/verify-otp?email=${values.email}`);
          } else {
            toast.error(res.data.error as any);
          }
        }
        actions.resetForm();
      } else {
        toast.error("All fields are required");
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    formik.setFieldTouched(e.target.name, true, false);
  };

  // Password strength indicators
  const passwordChecks = {
    length: values.password.length >= 8,
    uppercase: /[A-Z]/.test(values.password),
    lowercase: /[a-z]/.test(values.password),
    number: /[0-9]/.test(values.password),
  };

  const showPasswordStrength = values.password.length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          Create your account
        </h1>
        <p className="text-muted-foreground">
          Start submitting complaints anonymously
        </p>
      </div>

      {/* Error Alert */}
      {error && error.data && (
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
            {error?.status === "FETCH_ERROR"
              ? "Network Error. Please check your connection."
              : error?.data.error}
          </p>
        </div>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
              value={values.email}
              onChange={handleFieldChange}
              onBlur={handleBlur}
              className={`auth-input pl-12 ${
                errors.email && touched.email ? "border-destructive focus:ring-destructive/20 focus:border-destructive" : ""
              }`}
            />
          </div>
          {errors.email && touched.email && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <IconX className="w-4 h-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="password"
              type={isVisible ? "text" : "password"}
              name="password"
              placeholder="Create a strong password"
              value={values.password}
              onChange={handleFieldChange}
              onBlur={handleBlur}
              className={`auth-input pl-12 pr-12 ${
                errors.password && touched.password ? "border-destructive focus:ring-destructive/20 focus:border-destructive" : ""
              }`}
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
          {errors.password && touched.password && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <IconX className="w-4 h-4" />
              {errors.password}
            </p>
          )}
          
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
            Confirm password
          </label>
          <div className="relative">
            <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="confirmPassword"
              type={isConfirmVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={handleFieldChange}
              onBlur={handleBlur}
              className={`auth-input pl-12 pr-12 ${
                errors.confirmPassword && touched.confirmPassword ? "border-destructive focus:ring-destructive/20 focus:border-destructive" : ""
              }`}
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
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <IconX className="w-4 h-4" />
              {errors.confirmPassword}
            </p>
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
              <span>Creating account...</span>
            </span>
          ) : (
            <span>Create account</span>
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

      {/* Sign In Link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Sign in
        </Link>
      </p>

      <ToastContainer />
    </div>
  );
}
