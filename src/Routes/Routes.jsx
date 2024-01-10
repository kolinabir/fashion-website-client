import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/Layout/MainLayout";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import Home from "../page/Home/Home";
import PrivetsRoutes from "./PrivetRoutes/PrivetsRoutes";
import ShowCart from "../page/ShowCart/ShowCart";
import UpdateService from "../page/ManageProduct/UpdateProduct";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Dashboard from "../Components/Navbar/Dashboard";
import AddCategory from "../page/AddProduct/AddCategory";
import AddProduct from "../page/AddProduct/AddProduct";
import ShowProduct from "../page/ShowService/ShowProduct";
import ShowAllProduct from "../page/ShowService/ShowAllProduct";
import SingleProduct from "../page/SingleProduct/SingleProduct";
import ManageProduct from "../page/ManageProduct/ManageProduct";
import UpdateProduct from "../page/ManageProduct/UpdateProduct";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/",
        element: <Home></Home>,
        loader: () =>
          fetch("https://fashion-server-nine.vercel.app/services", {
            credentials: "include",
          }),
      },
      {
        path: "addProduct",
        element: (
          <PrivetsRoutes>
            <AddProduct></AddProduct>
          </PrivetsRoutes>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivetsRoutes>
            <Dashboard></Dashboard>
          </PrivetsRoutes>
        ),
      },
      {
        path: "addCategory",
        element: (
          <PrivetsRoutes>
            <AddCategory></AddCategory>
          </PrivetsRoutes>
        ),
      },
      {
        path: "/",
        element: <ShowProduct></ShowProduct>,
        // loader: () => fetch("https://mern-ecom-backend-henna.vercel.app/api/product", {credentials: 'include'}),
      },
      {
        path: "/services",
        element: <ShowAllProduct></ShowAllProduct>,
        // loader: () => fetch("https://mern-ecom-backend-henna.vercel.app/api/product", {credentials: 'include'}),
      },
      {
        path: "/showProduct/:id",
        element: <SingleProduct></SingleProduct>,
        loader: ({ params }) =>
          fetch(
            `https://mern-ecom-backend-henna.vercel.app/api/product/${params.id}`
          ),
      },
      {
        path: "/cart",
        element: (
          <PrivetsRoutes>
            <ShowCart></ShowCart>
          </PrivetsRoutes>
        ),
        // loader: () => fetch("https://fashion-server-nine.vercel.app/orders", {credentials: 'include'}),
      },
      {
        path: "/manageService",
        element: (
          <PrivetsRoutes>
            <ManageProduct />
          </PrivetsRoutes>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivetsRoutes>
            <UpdateProduct></UpdateProduct>
          </PrivetsRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://mern-ecom-backend-henna.vercel.app/api/product/${params.id}`
          ),
      },
    ],
  },
]);

export default Routes;
