import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../page/home/Home";
import CategoryPage from "../page/category/CategoryPage";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";
import Register from "../components/Register";
import ShopPage from "../page/shop/ShopPage";
import SingleProducts from "../page/shop/productDetails/SingleProducts";
import PaymentSuccess from "../page/shop/payment/PaymentSuccess";
import DashBoardLayout from "../dashBoard/DashBoardLayout";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        //! page na thkla ai page show hova 
        errorElement: <ErrorPage />,
        children: [
            //* children use kolay <outlet> use korta hoy
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/shop',
                element: <ShopPage />
            },
            {
                path: '/shop/:id',
                element: <SingleProducts />
            },
            {
                path: '/categories/:categoryName',
                element: <CategoryPage />
            },
            {
                path: '/success',
                element: <PaymentSuccess />
            },
            {
                path: "/about",
                element: <div>About</div>
            }
        ]
    },
    //! ai route navbar and footer pava na 
    //* ai route App.jsx file ar moda na
    {
        path: '/login',
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    //!  dashboard route
    {
         //? ata absolute path tai "/dashboard"
        path: "/dashboard",
        //* PrivateRoute -> raper route tai ar moda children deta hova
        element: <PrivateRoute><DashBoardLayout/></PrivateRoute> ,
        children: [
        //* children use kolay <outlet> use korta hoy
        
        //? root file ata thakava 
        //* ai route ar dashboard page and ata page thakva
        {
          path:"user",
          element:<div>user dashboard</div>
        },  
        {
              //? ata relative path tai "orders"  , "/" ata nai  
              //* search path -> dashboard/orders
               //* ai route ar dashboard page and orders page thakva
              path:"orders",
             element:<div>orders</div>
            },
            {
                 //? ata relative path tai "payments"  , "/" ata nai 
                 //* search path -> dashboard/payments
                  //* ai route ar dashboard page and payments page thakva
                 path:"payments",
                element:<div>payment</div>
            },
            {
                path:"profile",
                element:<div>profile</div>
            },
            {
                path:"reviews",
                element:<div>reviews</div>
            },

            //! admin route
            {
                path:"admin",
                element:<PrivateRoute role="admin"><div>admin dashboard</div></PrivateRoute>
            },
            {
                path:"add-product",
                element:<PrivateRoute role="admin"><div>add product</div></PrivateRoute>
            },
            {
                path:"manage-products",
                element:<PrivateRoute role="admin"><div>manage product</div></PrivateRoute>
            },
            {
                path:"update-product/:id",
                element:<PrivateRoute role="admin"><div>update product</div></PrivateRoute>
            },
            {
                path:"manage-orders",
                element:<PrivateRoute role="admin"><div>manage-orders</div></PrivateRoute>
            },
            {
                path:"users",
                element:<PrivateRoute role="admin"><div>users</div></PrivateRoute>
            },
        ]
    }
]);

export default router 