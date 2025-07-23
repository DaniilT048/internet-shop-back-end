import routes from "./routes.jsx";
import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./components/Layout.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import NotFound from "./components/NotFound.tsx";
import './style.css'


const router = createBrowserRouter ([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage/>,
    children:[
      ...routes,
      {
        path: "*",
        element: <NotFound/>,
      }
    ]
  }
],{
  basename: "/internet-shop",
});

const App = () =>{

  return <RouterProvider router={router} />;
};

export default App
