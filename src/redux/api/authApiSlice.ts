// Custom Imports
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => {
        return {
          url: "user/signup",
          method: "POST",
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: "user/login",
          method: "POST",
          body: data,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: "user/forgotPassword",
          method: "POST",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ data, token }) => {
        return {
          url: `user/resetPassword/${token}`,
          method: "POST",
          body: data,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "user/updateMyPassword",
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApiSlice;
