// https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#basic-usage
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import variables from '../Variables';

export const sportingGoodsApi = createApi({
  // Set the baseUrl for every endpoint below
  baseQuery: retry(fetchBaseQuery({
    baseUrl: variables.base_api_endpoint,
    //https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#setting-default-headers-on-requests
    prepareHeaders: async (headers, { getState }) => {
      let accessToken = getState().user.value.token;

      if (!!accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }

      return headers
    },
  }), { maxRetries: 5 }),
  endpoints: (builder) => ({
    /*
      USERS
    */
    getUsers: builder.query({
      query: () => `users`,
    }),
    getCurrentUser: builder.query({
      query: () => `users/me`,
    }),
    getUserByName: builder.query({
      query: (name) => `users/${name}`,
    }),

    /*
      CATEGORIES
    */
    getCategories: builder.query({
      query: () => `categories`,
    }),
    getCategoryByName: builder.query({
      query: (name) => `categories/${name}`,
    }),
    createCategory: builder.mutation({
      query: ({ body }) => ({
        url: `categories`,
        method: 'POST',
        body: body,
      }),
    }),

    /*
      EQUIPMENTS
    */
    getEquipments: builder.query({
      query: () => `/equipments`,
      providesTags: ['Equipment']
    }),
    createEquipment: builder.mutation({
      query: (body) => ({
        url: `/equipments`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Equipment'],
    }),
    getEquipmentById: builder.query({
      query: (equipment_id) => `/equipments/${equipment_id}`,
      providesTags: ['Equipment']
    }),
    updateEquipment: builder.mutation({
      query: ({equipment_id, body}) => ({
        url: `/equipments/${equipment_id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['Rental'],
    }),
    deleteEquipment: builder.mutation({
      query: (equipment_id) => ({
        url: `/equipments/${equipment_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rental'],
    }),
    getEquipmentsByCategory: builder.query({
      query: (category_id) => `/equipments/category/${category_id}`,
      providesTags: ['Equipment']
    }),
    getEquipmentsForMap: builder.query({
      query: () => `/equipments-map`,
      providesTags: ['Equipment', 'Map']
    }),
    /*
      RENTALS
    */
    getRentals: builder.query({
      query: () => `/rentals`,
      providesTags: ['Rental']
    }),
    createRental: builder.mutation({
      query: (body) => ({
        url: `/rentals`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Rental'],
    }),
    getRentalById: builder.query({
      query: (rental_id) => `/rentals/${rental_id}`,
      providesTags: ['Rental']
    }),
    updateRental: builder.mutation({
      query: (rental_id, body) => ({
        url: `/rentals/${rental_id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['Rental'],
    }),
    deleteRental: builder.mutation({
      query: (rental_id) => ({
        url: `/rentals/${rental_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rental'],
    }),
    /*
      REVIEWS
    */
    getReviews: builder.query({
      query: () => `/reviews`,
      providesTags: ['Review']
    }),
    createReview: builder.mutation({
      query: (body) => ({
        url: `/reviews`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Review'],
    }),
    getReviewById: builder.query({
      query: (review_id) => `/reviews/${review_id}`,
      providesTags: ['Review']
    }),
    updateReview: builder.mutation({
      query: (review_id, body) => ({
        url: `/reviews/${review_id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['Review'],
    }),
    deleteReview: builder.mutation({
      query: (review_id) => ({
        url: `/reviews/${review_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),
    getReviewsByEquipmentId: builder.query({
      query: (equipment_id) => `/equipments/${equipment_id}/reviews`,
      providesTags: ['Review', 'Equipment']
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetCurrentUserQuery,
  useGetUserByNameQuery,
  useGetCategoriesQuery,
  useGetCategoryByNameQuery,
  useCreateCategoryMutation,
  useGetEquipmentsQuery,
  useCreateEquipmentMutation,
  useGetEquipmentByIdQuery,
  useUpdateEquipmentMutation,
  useDeleteEquipmentMutation,
  useGetEquipmentsByCategoryQuery,
  useGetEquipmentsForMapQuery,
  useGetRentalsQuery,
  useCreateRentalMutation,
  useGetRentalByIdQuery,
  useUpdateRentalMutation,
  useDeleteRentalMutation,
  useGetReviewsQuery,
  useCreateReviewMutation,
  useGetReviewByIdQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsByEquipmentIdQuery
} = sportingGoodsApi