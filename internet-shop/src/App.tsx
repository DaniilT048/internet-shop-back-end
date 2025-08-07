import routes from "./routes.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import NotFound from "./components/NotFound.tsx";
import './style.css';
import { useEffect } from "react";
import axios from './utils/axiosInstance';
import {logoutUser, setUser} from "./store/authSlice.ts";
import { useDispatch } from "react-redux";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            ...routes,
            {
                path: "*",
                element: <NotFound />,
            }
        ]
    }
], {
    basename: "/internet-shop",
});

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const res = await axios.get("api/current-user");

                dispatch(setUser(res.data));
            } catch (err) {
                console.error("Error fetching current user", err);
                dispatch(logoutUser());
            }
        };

        fetchCurrentUser();
    }, [dispatch]);


    return <RouterProvider router={router} />;
};

export default App;
