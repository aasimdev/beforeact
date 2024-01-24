// Custom Imports
import { apiSlice } from "./apiSlice";

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTenant: builder.mutation({
      query: (data) => {
        return {
          url: "tenant/create-tenant",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Brands"],
    }),
    getAllTenants: builder.query({
      query: () => {
        return {
          url: "tenant/get-tenants",
          method: "GET",
        };
      },
      providesTags: ["Brands"],
    }),
    getTenantUsers: builder.query({
      query: (tenantId) => {
        return {
          url: `tenant/get-users?tenantId=${tenantId}`,
          method: "GET",
        };
      },
      providesTags: ["Brands"],
    }),
  }),
});

export const {
  useCreateTenantMutation,
  useGetAllTenantsQuery,
  useGetTenantUsersQuery,
} = brandApiSlice;
