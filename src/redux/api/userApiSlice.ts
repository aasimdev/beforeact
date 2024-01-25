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
      query: (data) => {
        return {
          url: "admin/create-user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (data) => {
        return {
          url: "admin/delete-user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: "admin/update-user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
