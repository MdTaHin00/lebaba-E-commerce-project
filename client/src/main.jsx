import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/Router.jsx'
import { Provider } from 'react-redux'
//! remixicon import 
import 'remixicon/fonts/remixicon.css'
import { store } from './redux/store.js'
import 'sweetalert2/dist/sweetalert2.js'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
