import { api } from "../app/api";
import { createSlice } from "@reduxjs/toolkit";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ ...user }) => ({
        url: '/users/register',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

const storeToken = (state, { payload }) => {
  localStorage.setItem('token', payload.token);
};


const registerSlice = createSlice({
  name: 'register',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
  },
});


export default registerSlice.reducer;

export const {useRegisterMutation} = authApi;