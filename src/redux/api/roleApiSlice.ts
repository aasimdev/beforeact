// Custom Imports
import { apiSlice } from "./apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation({
      query: (data) => {
        return {
          url: "role/create-role",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Roles"],
    }),
    getAllRoles: builder.query({
      query: () => {
        return {
          url: "role/get-roles",
          method: "GET",
        };
      },
      providesTags: ["Roles"],
    }),
    getRoleUsers: builder.query({
      query: (roleId) => {
        return {
          url: `role/get-users?roleId=${roleId}`,
          method: "GET",
        };
      },
      providesTags: ["Roles"],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useGetAllRolesQuery,
  useGetRoleUsersQuery,
} = roleApiSlice;
