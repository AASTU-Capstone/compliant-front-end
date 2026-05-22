"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
// import { cookies } from 'next/headers'
import { get } from "https";
import { browser } from "process";

/**
 * The base API configuration for making API requests.
 */

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://anonymous-whisper-ftie.onrender.com/api/",
    prepareHeaders: (headers, { getState }) => {
      // const cookieStore = cookies()
      // console.log((typeof window !== "undefined") ? "client" : "server")
      headers.set("Content-Type", "application/json");
      const token = decodeURIComponent(document.cookie)
        .split(";")
        .find((c) => c.trim().startsWith("token="))
        ?.split("=")[1];
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return (action.payload as any)[reducerPath];
    }
  },
  //what the the hell is thiss
  tagTypes: [],
  endpoints: (builder) => ({}),
});

export default baseApi;

//  pass@123
