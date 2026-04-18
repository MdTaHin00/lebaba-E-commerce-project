import { configureStore } from '@reduxjs/toolkit'
import authApi from './features/auth/authApi'
import authSlice from './features/auth/authSlice'
import productApi from './features/products/productApi'

export const store = configureStore({
  reducer: {
    //! api slice store = authApi
    //*  reducerPath -> authApi.js file var
    [authApi.reducerPath]: authApi.reducer,

     //! slice store = authSlice
    //* auth -> ja nama a authSlice akana same hova
    auth:authSlice,

     //! api slice store  = productApi
    //*  reducerPath -> productApi.js file var
     [productApi.reducerPath]: productApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    //* akadik middleware use way
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware)
})