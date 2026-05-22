"use client";
import { createSlice } from "@reduxjs/toolkit";
import userApi from "../services/userApi";
import { LoginApiResponse, SignupApiResponse } from "@/types";

import { getExpirationDate } from "@/lib/date";

export interface AuthState {
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  userId?: string;
  userName?: string;
  userRole?: string;
  userEmail?: string;
  error: any | null;
}

let initialState: AuthState = {
  token: "",
  userEmail: "",
  isAuthenticated: false,
  isLoading: false,
  userId: "",
  userName: "",
  userRole: "",
  error: null,
};

if (typeof window !== "undefined") {
  // Perform localStorage action

  const data = localStorage.getItem("auth");
  if (data) {
    initialState = JSON.parse(data);
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.error = null;
      state.token = "";
      state.isAuthenticated = false;
      state.isLoading = false;
      state.userId = "";
      state.userName = "";
      state.userRole = "";
      state.userEmail = "";
      
    },
    setAuth: (state, { payload }) => {
      state.error = payload.error;
      state.isAuthenticated = payload.isAuthenticated;
      state.isLoading = payload.isLoading;
      state.token = payload.token;
      state.userEmail = payload.userEmail;
      state.userId = payload.userId;
      state.userRole = payload.userRole;
      // state.userProfile = payload.userProfile;
      // state.userName = payload.userName;
    },
    setUserProfile: (state, { payload }) => {
      state.userName = payload.startupName;
        localStorage.setItem("auth", JSON.stringify(state));
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      userApi.endpoints.login.matchPending,
      (state, { payload }) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      userApi.endpoints.signup.matchPending,
      (state, { payload }) => {
        state.isLoading = true;
      }
    );

    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, { payload }: { payload: LoginApiResponse }) => {
        state.token = payload.token;
        state.userId = payload.id;
        state.userEmail = payload.email;
        state.isAuthenticated = true;
        state.isLoading = false;
        // localStorage.setItem("auth", JSON.stringify(state));
        document.cookie = `token=${
          payload.token
        }; path=/; expires=${getExpirationDate()}`;
      }
    );

    builder.addMatcher(
      userApi.endpoints.signup.matchFulfilled,
      (state, { payload }: { payload: SignupApiResponse }) => {
        state.isLoading = false;
      }
    );

    builder.addMatcher(
      userApi.endpoints.login.matchRejected,
      (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
        state.isAuthenticated = false;
      }
    );

    builder.addMatcher(
      userApi.endpoints.signup.matchRejected,
      (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
        state.isAuthenticated = false;
      }
    );
  },
});

export const { resetAuth, setAuth, setUserProfile } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
