// Custom Imports
import { apiSlice } from "./apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // TODO: DONE
    createRole: builder.mutation({
      query: (data) => {
        return {
          url: "admin/create-role",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Roles"],
    }),
    // TODO: DONE
    getAllRoles: builder.query({
      query: () => {
        return {
          url: "/admin/get-roles",
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
