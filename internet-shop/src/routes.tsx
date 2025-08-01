import type {JSX} from "react";
import Home from "./components/Home.tsx";
import About from "./components/About.tsx";
import Products from "./components/Products.tsx";
import Cart from "./components/Cart.tsx";
import Item from "./components/Item.tsx";
import Register from "./components/Register.tsx";
import Logout from "./components/Logout.tsx";
import Login from "./components/Login.tsx";
import Profile from "./components/Profile.tsx";




export interface RoutesType {
    path: string;
    element: JSX.Element;
    label?: string;
    children?: RoutesType[];
}

let routes: RoutesType[];
routes = [
    {
        path: "/",
        element: <Home/>,
        label: "Home",
    },
    {
        path: "/about",
        element: <About/>,
        label: "About",
    },
    {
        path: "/products",
        element: <Products/>,
        label: "Shop",
    },
    {
        path: "/products/:id",
        element: <Item/>,
    },
    {
        path: "/cart",
        element: <Cart/>,
        label: "Cart",
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/logout",
        element: <Logout/>,
    },
    {
        path: "/profile",
        element: <Profile/>,
    },
    ];

export default routes;