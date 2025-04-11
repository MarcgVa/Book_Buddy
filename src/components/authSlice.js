import { api } from "../app/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ ...user }) => ({
        url: '/users/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: ({ ...login }) => ({
        url: '/users/login',
        method: 'POST',
        body: login,
      }),
    }),
  }),
});

export const {useRegisterMutation, useLoginMutation } = authApi;