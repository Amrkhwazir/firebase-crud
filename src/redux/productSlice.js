import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://dummyjson.com/"}),
    endpoints: (builder) => ({
        products: builder.query({
            query: () => "/products"   
        }),
        product: builder.query({
            query: (id) => `/products/${id}`
        })
    })
})

export const { useProductsQuery, useProductQuery } = productApi