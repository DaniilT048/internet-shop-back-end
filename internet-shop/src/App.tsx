import routes from "./routes.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from "./components/Layout.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import NotFound from "./components/NotFound.tsx";
import './style.css'
import {useEffect} from "react";
import axios from "axios";
import {setUser} from "./store/authSlice.ts";
import {useDispatch} from "react-redux";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            ...routes,
            {
                path: "*",
                element: <NotFound/>,
            }
        ]
    }
], {
    basename: "/internet-shop",
});




const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get('http://localhost:4000/api/current-user', {withCredentials: true,})
            .then(res => {
                dispatch(setUser(res.data));
            })
    }, [])

    return <RouterProvider router={router}/>;
};

export default App
