import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/authSlice"
import loginReducer from "../components/loginSlice"
import { api } from "./api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    authReducer,
    loginReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
});
