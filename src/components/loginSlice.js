import { api } from "../app/api";
import { createSlice } from "@reduxjs/toolkit";

const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ ...login }) => ({
        url: '/users/login',
        method: 'POST',
        body: login,
      }),
    }),
  }),
});

const storeToken = (state, { payload }) => {
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

export const { useLoginMutation } = loginApi;