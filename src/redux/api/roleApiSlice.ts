// Custom Imports
import { apiSlice } from "./apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
    getAllRoles: builder.query({
      query: () => {
        return {
          url: "/admin/get-roles",
          method: "GET",
        };
      },
      providesTags: ["Roles"],
    }),
    updateRole: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/update-role",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Roles"],
    }),
    getRoleById: builder.query({
      query: (id) => {
        return {
          url: `/admin/get-role?id=${id}`,
          method: "GET",
        };
      },
      providesTags: ["Roles"],
    }),
    addUserToRole: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/add-user-to-role",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Roles"],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useGetAllRolesQuery,
  useUpdateRoleMutation,
  useGetRoleByIdQuery,
  useAddUserToRoleMutation,
} = roleApiSlice;
