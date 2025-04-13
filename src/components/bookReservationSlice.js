import { api } from "../app/api";

const bookResApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReservations: builder.query({
      query: () => ({
        url: '/reservations',
        method: 'GET'
      }),
      providesTags: ["Reservations"],
    }),
    checkOutBook: builder.mutation({
      query: (bookId) => ({
        url: '/reservations',
        method: 'POST',
        body: {bookId},
      }),
      invalidatesTags:['Reservations'],
    }),
    checkInBook: builder.mutation({
      query: (bookId) => ({
        url: `/reservations/${bookId}`,
        method: 'DELETE',
      }),
      invalidatesTags:['Reservations']
    })
  })
})




export const { useCheckInBookMutation, useCheckOutBookMutation, useGetReservationsQuery } = bookResApi;
