import { api } from "../app/api";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});




export const {useGetAllBooksQuery, useGetBookQuery } = bookApi;