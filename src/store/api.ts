import { Brand, Category } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], string>({
            query: () => "category",
        }),

        getBrands: builder.query<Brand[], string>({
            query: () => "brand",
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCategoriesQuery, useGetBrandsQuery } = api;
