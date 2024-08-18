import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const getToken = () => {
  // Replace with your actual logic for retrieving the token
  return localStorage.getItem("token");
};
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://digital-agency-backend.onrender.com/api/v1/",
  }),

  tagTypes: ["products"], // Define the tag type
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: ( data ) => ({
        url: '/product/create/',
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

   
    deleteProduct: build.mutation({
      query: (id) => {
        const token = getToken();
        return {
          url: `/product/${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["tasks"],
    }),

    updateProduct: build.mutation({
      query: ({ Id, data }) => ({
        url: `/product/${Id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    getSingleProduct: build.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
      invalidatesTags: ["products"],
    }),

    getAllProduct: build.query({
      query: () => ({
        url: "/product/",
      }),
      providesTags: ["products"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetAllProductQuery,
  useGetSingleProductQuery
} = productApi;
