import userApi from "../services/userApi";

export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyAccountMutation,
  useCreateOTPMutation,
  useGetComplaintsQuery,
  useCreateComplaintMutation,
  useGetUserByIdQuery,
  useGetComplaintByIdForUserQuery,
  useSearchComplaintsQuery
} = userApi;
