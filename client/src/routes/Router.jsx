import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../page/home/Home";
import CategoryPage from "../page/category/CategoryPage";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";
import Register from "../components/Register";
import ShopPage from "../page/shop/ShopPage";
import SingleProducts from "../page/shop/productDetails/SingleProducts";
import PaymentSuccess from "../page/shop/PaymentSuccess";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        //! page na thkla ai page show hova 
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/shop',
                element: <ShopPage/>
            },
            {
                path:'/shop/:id',
                element:<SingleProducts/>
            },
            {
                path: '/categories/:categoryName',
                element: <CategoryPage />
            },
            {
                path:'/success',
                element:<PaymentSuccess/>
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
        path:'/login',
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
]);

export default router 