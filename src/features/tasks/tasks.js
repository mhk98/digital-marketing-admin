import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const getToken = () => {
  // Replace with your actual logic for retrieving the token
  return localStorage.getItem("token");
};
export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),

  tagTypes: ["tasks"], // Define the tag type
  endpoints: (build) => ({
    createTask: build.mutation({
      query: (data) => ({
        url: '/task/create/',
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),

    deleteTask: build.mutation({
      query: (id) => {
        const token = getToken();
        return {
          url: `/task/${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["tasks"],
    }),

    updateTask: build.mutation({
      query: ({ id, data }) => ({
        url: `/task/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),

    getSingleTask: build.query({
      query: (id) => ({
        url: `/task/${id}`,
      }),
      invalidatesTags: ["tasks"],
    }),

    getAllTask: build.query({
      query: () => ({
        url: "/task/",
      }),
      providesTags: ["tasks"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetAllTaskQuery,
  useGetSingleTaskQuery
} = taskApi;
