import {
  LoginCredentials,
  LoginApiResponse,
  SignupCredentials,
  SignupApiResponse,
  forgotpasswordotp,
  forgotpasswordotpApiResponse,
  resetPassword,
  resetPasswordApiResponse,
  verifyAccontApiResponse,
  verifyAccountInput,
  createOTPApiResponse,
  createOTPInput,
  CreateComplaintInput,
} from "@/types";

import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginApiResponse, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: "/Authentication/login",
        method: "POST",
        body: credentials,
      }),
    }),

    signup: builder.mutation<SignupApiResponse, SignupCredentials>({
      query: (credentials: SignupCredentials) => ({
        url: "/User/CreateUser",
        method: "POST",
        body: credentials,
      }),
    }),

    forgotPassword: builder.mutation<
      forgotpasswordotpApiResponse,
      forgotpasswordotp
    >({
      query: (credentials: forgotpasswordotp) => {
        return {
          url: `/Authentication/forgotPassword`,
          method: "POST",
          body: credentials,
        };
      },
    }),

    verifyAccount: builder.mutation<
      verifyAccontApiResponse,
      verifyAccountInput
    >({
      query: (input: verifyAccountInput) => ({
        url: `/OTP/VerifyOTP?email=${input.email}&OTPCode=${input.OTPCode}`,
        method: "POST",
      }),
    }),
    createOTP: builder.mutation<createOTPApiResponse, createOTPInput>({
      query: (input: createOTPInput) => ({
        url: `/OTP/CreateOTP?email=${input.email}`,
        method: "POST",
      }),
    }),
    resetPassword: builder.mutation<resetPasswordApiResponse, resetPassword>({
      query: (credentials: resetPassword) => ({
        url: "/Authentication/resetPassword",
        method: "POST",
        body: credentials,
      }),
    }),

    GetUserById: builder.query<any, string>({
      query: (userId: string) => ({
        url: `/User/GetUserById?Id=${userId}`,
        method: "GET",
      }),
    }),

    GetComplaints: builder.query<any, { pageNumber: any; pageSize: any }>({
      query: ({ pageNumber, pageSize }) => ({
        url: `/Complaint/GetAllComplaintsForUser?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        method: "GET",
      }),
    }),

    CreateComplaint: builder.mutation<any, CreateComplaintInput>({
      query: (complaint: CreateComplaintInput) => ({
        url: "/Complaint/CreateComplaint",
        method: "POST",
        body: complaint,
      }),
    }),
    GetComplaintByIdForUser: builder.query<any, string>({
      query: (complaintId: string) =>
        `/Complaint/GetComplaintById?ComplaintID=${complaintId}`,
    }),
    SearchComplaints: builder.query<any,{keyword:string,category:string,dateOrder:string,pageNumber:any,pageSize:any}>({
      query:({keyword, category,dateOrder,pageNumber,pageSize})=>({
        url:`/Complaint/SearchComplaints?keyword=${keyword}&category=${category}&dateOrder=${dateOrder}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
        method:"GET"
      })
    }),

    
  }),
});

export default userApi;
