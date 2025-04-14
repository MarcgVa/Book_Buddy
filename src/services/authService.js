import { api } from "../app/api";
import { createSlice } from "@reduxjs/toolkit";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ ...user }) => ({
        url: "/users/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: ({ ...login }) => ({
        url: "/users/login",
        method: "POST",
        body: login,
      }),
      invalidatesTags: ["User"],
    }),
    getAccount: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    logout: builder.mutation({
      queryFn: () => ({ data: {} }),
      invalidatesTags: ["Book", "Reservations", "User"],
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
    builder
      .addMatcher(api.endpoints.register.matchFulfilled, storeToken)
      .addMatcher(api.endpoints.login.matchFulfilled, storeToken);
  },
});


export default registerSlice.reducer;

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAccountQuery,
  useLogoutMutation
} = authApi;