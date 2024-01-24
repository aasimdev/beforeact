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
  }),
});

export const { useGetAllTenantsQuery } = brandApiSlice;
