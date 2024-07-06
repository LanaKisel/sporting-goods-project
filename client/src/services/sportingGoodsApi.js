// https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#basic-usage
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sportingGoodsApi = createApi({
  // Set the baseUrl for every endpoint below
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    //https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#setting-default-headers-on-requests
    prepareHeaders: async (headers, { getState }) => {
      let accessToken = getState().user.value.token;
      
      if (!!accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => `users/me`,
    }),
    getUserByName: builder.query({
      query: (name) => `users/${name}`,
    }),
    createUser: builder.mutation({
      query: ({ body }) => ({
        url: `users`,
        // When performing a mutation, you typically use a method of
        // PATCH/PUT/POST/DELETE for REST endpoints
        method: 'POST',
        // fetchBaseQuery automatically adds `content-type: application/json` to
        // the Headers and calls `JSON.stringify(patch)`
        body: body,
      }),
    }),
    getCategories: builder.query({
      query: () => `categories`,
    }),
    getCategoryByName: builder.query({
      query: (name) => `categories/${name}`,
    }),
    createCategory: builder.mutation({
      query: ({ body }) => ({
        url: `categories`,
        // When performing a mutation, you typically use a method of
        // PATCH/PUT/POST/DELETE for REST endpoints
        method: 'POST',
        // fetchBaseQuery automatically adds `content-type: application/json` to
        // the Headers and calls `JSON.stringify(patch)`
        body: body,
      }),
    }),
    getEquipmentsByCategory: builder.query({
      query: (category_id) => `/equipments/category/${category_id}`,
    }),
    getEquipmentById: builder.query({
      query: (equipment_id) => `/equipments/${equipment_id}`,
    }),
    getEquipmentReviewsByEquipmentId: builder.query({
      query: (equipment_id) => `/equipments/${equipment_id}/reviews`
    }),
    createRental: builder.mutation({
      query: (body) => ({
        url: `rentals`,
        method: 'POST',

        body: body,
      }),
    })
  }),
})

export const { 
  useGetCurrentUserQuery, 
  useGetUserByNameQuery, 
  useCreateUserMutation, 
  useGetCategoriesQuery, 
  useGetCategoryByNameQuery, 
  useCreateCategoryMutation, 
  useGetEquipmentsByCategoryQuery, 
  useGetEquipmentByIdQuery,
  useGetEquipmentReviewsByEquipmentIdQuery,
  useCreateRentalMutation
} = sportingGoodsApi