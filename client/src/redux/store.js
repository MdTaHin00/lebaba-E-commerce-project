import { configureStore } from '@reduxjs/toolkit'
import authApi from './features/auth/authApi'
import authSlice from './features/auth/authSlice'

export const store = configureStore({
  reducer: {
    //*  reducerPath -> authApi.js file var
    [authApi.reducerPath]: authApi.reducer,
    //? auth -> ja nama a authSlice akana same hova
    auth:authSlice

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware)
})