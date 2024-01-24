// Custom Imports
import { apiSlice } from "./apiSlice";

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetAllTenantsQuery, useGetTenantUsersQuery } = brandApiSlice;
