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
import UserDashMain from "../dashBoard/user/userDashboard/UserDashMain";
import UserOrders from "../dashBoard/user/orders/UserOrders";
import OrderDetails from "../dashBoard/user/orders/OrderDetails";
import UserPayments from "../dashBoard/user/payments/UserPayments";
import UserReviews from "../dashBoard/user/reviews/UserReviews";
import UserProfile from "../dashBoard/user/profile/UserProfile";
import AdminDashMain from "../dashBoard/admin/adminDashBoard/AdminDashMain";
import ManageUsers from "../dashBoard/admin/adminUser/ManageUsers";
import ManageOrders from "../dashBoard/admin/adminOrders/ManageOrders";
import AddProduct from "../dashBoard/admin/addProduct/AddProduct";

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
            },
            {
                path:"/orders/:orderId",
                element:<OrderDetails/>
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
          element:<UserDashMain/>
        },  
        {
              //? ata relative path tai "orders"  , "/" ata nai  
              //* search path -> dashboard/orders
               //* ai route ar dashboard page and orders page thakva
              path:"orders",
             element:<UserOrders/>
            },
            {
                 //? ata relative path tai "payments"  , "/" ata nai 
                 //* search path -> dashboard/payments
                  //* ai route ar dashboard page and payments page thakva
                 path:"payments",
                element:<UserPayments/>
            },
            {
                path:"profile",
                element:<UserProfile/>
            },
            {
                path:"reviews",
                element:<UserReviews/>
            },

            //! admin route
            {
                path:"admin",
                element:<PrivateRoute role="admin"><AdminDashMain/></PrivateRoute>
            },
            {
                path:"add-product",
                element:<PrivateRoute role="admin"><AddProduct/></PrivateRoute>
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
                element:<PrivateRoute role="admin"><ManageOrders/></PrivateRoute>
            },
            {
                path:"users",
                element:<PrivateRoute role="admin"><ManageUsers/></PrivateRoute>
            },
        ]
    }
]);

export default router 