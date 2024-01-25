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
  }),
});

export const { useGetAllUsersQuery } = userApiSlice;
