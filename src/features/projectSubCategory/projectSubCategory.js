import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectSubCategoryApi = createApi({
  reducerPath: "projectSubCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),

  tagTypes: ["projectSubCategory"], // Define the tag type
  endpoints: (build) => ({
    createProjectSubCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/projectSubCategory/create-projectSubCategory/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["projectSubCategory"],
    }),

    deleteProjectSubCategory: build.mutation({
      query: (id) => ({
        url: `/projectSubCategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projectSubCategory"],
    }),

    updateProjectSubCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/projectSubCategory/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["projectSubCategory"],
    }),

    getSingleProjectSubCategory: build.query({
      query: (id) => ({
        url: `/projectSubCategory/${id}`,
      }),
      invalidatesTags: ["projectSubCategory"],
    }),

    getAllProjectSubCategory: build.query({
      query: () => ({
        url: "/projectSubCategory",
      }),
      providesTags: ["projectSubCategory"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateProjectSubCategoryMutation,
  useGetAllProjectSubCategoryQuery,
  useGetSingleProjectSubCategoryQuery,
  useDeleteProjectSubCategoryMutation,
  useUpdateProjectSubCategoryMutation,
} = projectSubCategoryApi;
