import { api } from "../app/api";
import { createSlice } from "@reduxjs/toolkit";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ ...login }) => ({
        url: '/users/login',
        method: 'POST',
        body: login,
      }),
      invalidatesTags: ["User"],
    }),
    getAccount: builder.query({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      providesTags:["User"]
    }),
  }),
});

const storeToken = (state, { payload }) => {
  state.token = payload.token;
  localStorage.setItem('token', payload.token);
};


const loginSlice = createSlice({
  name: 'login',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
  },
});


export default loginSlice.reducer;

export const { useLoginMutation, useGetAccountQuery } = userApi;