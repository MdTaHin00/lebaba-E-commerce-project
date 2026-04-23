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
        element: <DashBoardLayout/> ,
        children: [
        //* children use kolay <outlet> use korta hoy
        
        //? root file ata thakava 
        //* ai route ar dashboard page and ata page thakva
        {
          path:"",
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
                element:<div>admin dashboard</div>
            },
            {
                path:"add-product",
                element:<div>add product</div>
            },
            {
                path:"manage-product",
                element:<div>manage product</div>
            },
            {
                path:"update-product/:id",
                element:<div>update product</div>
            },
            {
                path:"manage-orders",
                element:<div>manage-orders</div>
            },
            {
                path:"users",
                element:<div>users</div>
            },
        ]
    }
]);

export default router 