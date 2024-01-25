// Custom Imports
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        return {
          url: "admin/get-users",
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (body) => {
        return {
          url: "admin/create-user",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery, useCreateUserMutation } = userApiSlice;
