"use client";
import {
  useLoginMutation,
  useSignupMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useVerifyAccountMutation,
  useCreateOTPMutation,
} from "@/lib/redux/features/user";

import { AuthState, selectAuth, setAuth } from "@/lib/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getExpirationDate } from "@/lib/date";

import {
  LoginCredentials,
  SignupCredentials,
  resetPassword,
  verifyAccountInput,
  forgotpasswordotp,
} from "@/types";
import { useState } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector(selectAuth);
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();
  const [verifyAccount] = useVerifyAccountMutation();
  const [createOTP] = useCreateOTPMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [ResetPassword] = useResetPasswordMutation();

  const [isVerification, setIsVerification] = useState(false);
  return {
    auth,
    loginHandler: async (credentials: LoginCredentials) => {
      try {
        return await login(credentials);
      } catch (error) {
        return null;
      }
    },
    logoutHandler: async () => {
      localStorage.removeItem("auth");
      document.cookie = `token=${""}; path=/; expires=${getExpirationDate()}`;
      const dummy: AuthState = {
        token: "",
        isAuthenticated: false,
        isLoading: false,
        userId: "",
        userName: "",
        userRole: "",
        userEmail: "",
        error: null,
      };
      dispatch(setAuth(dummy));
      router.refresh();
      // router.push("/login");
    },
    signupHandler: async (credentials: SignupCredentials) => {
      try {
        return await signup(credentials);
      } catch (error) {
        return null;
      }
    },
    verifyAccountHandler: async (inputs: verifyAccountInput) => {
      try {
        setIsVerification(true);

        return await verifyAccount(inputs);
      } catch (error) {
        return null;
      }
    },
    forgotPasswordHandler: async (credentials: forgotpasswordotp) => {
      try {
        return await forgotPassword(credentials);
      } catch (error) {
        return null;
      }
    },
    resetPasswordHandler: async (credentials: resetPassword) => {
      try {
        return await ResetPassword(credentials);
      } catch (error) {
        return null;
      }
    },
    createOTPHandler: async (email: string) => {
      try {
        return await createOTP({ email });
      } catch (error) {
        return null;
      }
    },
  };
};
