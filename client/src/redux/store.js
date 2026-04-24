import { configureStore } from '@reduxjs/toolkit'
import authApi from './features/auth/authApi'
import authSlice from './features/auth/authSlice'
import productApi from './features/products/productApi'
import reviewsApi from './features/reviews/reviewsApi'
import cartSlice from './features/cart/cartSlice'
import orderApi from './features/orders/orderApi'
import statsApi from './features/stats/statsApi'

export const store = configureStore({
  reducer: {
    
    //! api slice store = authApi
    //*  reducerPath -> authApi.js file var
    [authApi.reducerPath]: authApi.reducer,

    //! slice store = authSlice
    //* auth -> ja nama a authSlice akana same hova
    auth: authSlice,

    //! api slice store  = productApi
    //*  reducerPath -> productApi.js file var
    [productApi.reducerPath]: productApi.reducer,

    //! api slice store  = reviewsApi
    //*  reducerPath -> reviewsApi.js file var
    [reviewsApi.reducerPath]: reviewsApi.reducer,

    //! slice store = cartSlice
    //* auth -> ja nama a cartSlice akana same hova
    cart: cartSlice,

    //! api slice store  = orderApi
    //*  reducerPath -> orderApi.js file var  
    [orderApi.reducerPath]: orderApi.reducer,

    //! api slice store  = statsApi
    //*  reducerPath -> statsApi.js file var 
    [statsApi.reducerPath]: statsApi.reducer


  },
  middleware: (getDefaultMiddleware) =>
    //* akadik middleware use way
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      reviewsApi.middleware,
      orderApi.middleware,
      statsApi.middleware
    )
})