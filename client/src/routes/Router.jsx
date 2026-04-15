import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../page/home/Home";
import Shop from "../page/shop/shop";
import CategoryPage from "../page/category/CategoryPage";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";
import Register from "../components/Register";

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
                element: <Shop />
            },
            {
                path: '/categories/:categoryName',
                element: <CategoryPage />
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