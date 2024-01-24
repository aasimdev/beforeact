// Custom Imports
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: "users/updateMe",
          method: "PUT",
          body: data,
        };
      },
    }),
    getUserDetails: builder.query({
      query: ({ language, name }) => {
        const url =
          language === "en"
            ? `users/getUserDetails/${name}?lang=en`
            : `users/getUserDetails/${name}?lang=ar`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["User Details"],
    }),
    addUserDetails: builder.mutation({
      query: (data) => {
        return {
          url: "users/addUserDetails",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["User Details"],
    }),
    updateUserDetails: builder.mutation({
      query: (data) => {
        return {
          url: "users/updateUserDetails",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["User Details"],
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
  useAddUserDetailsMutation,
  useUpdateUserDetailsMutation,
} = userApiSlice;
