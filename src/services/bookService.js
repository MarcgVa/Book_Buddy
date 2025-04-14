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
      invalidatesTags:['Reservations','User'],
    }),
    checkInBook: builder.mutation({
      query: (bookId) => ({
        url: `/reservations/${bookId}`,
        method: 'DELETE',
      }),
      invalidatesTags:['Reservations','User']
    }),
    getAllBooks: builder.query({
      query: () => ({
        url: '/books',
        method: 'GET'
      }),
      providesTags: ["Book"],
    }),
    getBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'GET',
      }),
    }),
  })
})




export const {
  useGetAllBooksQuery,
  useGetBookQuery,
  useCheckInBookMutation,
  useCheckOutBookMutation,
  useGetReservationsQuery
} = bookResApi;
