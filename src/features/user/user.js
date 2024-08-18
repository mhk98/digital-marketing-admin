import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),

  tagTypes: ["User"], // Define the tag type
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: build.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getAllUser: build.query({
      query: () => ({
        url: "/user",
      }),
      providesTags: ["User"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const { useCreateUserMutation, useDeleteUserMutation, useGetAllUserQuery, useUpdateUserMutation } = UserApi;
