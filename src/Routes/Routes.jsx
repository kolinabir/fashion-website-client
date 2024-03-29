import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/Layout/MainLayout";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import Home from "../page/Home/Home";
import PrivetsRoutes from "./PrivetRoutes/PrivetsRoutes";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import { Suspense, lazy } from "react";
import ShowCart from "../page/ShowCart/ShowCart";
import { DotLoader } from "react-spinners";

const LazyAddProduct = lazy(() => import("../page/AddProduct/AddProduct"));
const LazyDashboard = lazy(() => import("../Components/Navbar/Dashboard"));
const LazyAddCategory = lazy(() => import("../page/AddProduct/AddCategory"));
const LazyShowProduct = lazy(() => import("../page/ShowProduct/ShowProduct"));
const LazyShowAllProduct = lazy(() =>
  import("../page/ShowProduct/ShowAllProduct")
);
const LazySingleProduct = lazy(() =>
  import("../page/SingleProduct/SingleProduct")
);
const LazyManageProduct = lazy(() =>
  import("../page/ManageProduct/ManageProduct")
);
const LazyUpdateProduct = lazy(() =>
  import("../page/ManageProduct/UpdateProduct")
);

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
      },
      {
        path: "addProduct",
        element: (
          <PrivetsRoutes>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-screen">
                  <DotLoader color="#36d7b7" />{" "}
                </div>
              }
            >
              <LazyAddProduct />
            </Suspense>
          </PrivetsRoutes>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivetsRoutes>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-screen">
                  <DotLoader color="#36d7b7" />{" "}
                </div>
              }
            >
              <LazyDashboard />
            </Suspense>
          </PrivetsRoutes>
        ),
      },
      {
        path: "addCategory",
        element: (
          <PrivetsRoutes>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-screen">
                  <DotLoader color="#36d7b7" />{" "}
                </div>
              }
            >
              <LazyAddCategory />
            </Suspense>
          </PrivetsRoutes>
        ),
      },
      {
        path: "/cart",
        element: <ShowCart></ShowCart>,
        // loader: () => fetch("https://fashion-nine.vercel.app/orders", {credentials: 'include'}),
      },
      {
        path: "/",
        element: (
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <DotLoader color="#36d7b7" />{" "}
              </div>
            }
          >
            <LazyShowProduct />
          </Suspense>
        ),
      },
      {
        path: "/Products",
        element: (
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <DotLoader color="#36d7b7" />{" "}
              </div>
            }
          >
            <LazyShowAllProduct />
          </Suspense>
        ),
      },
      {
        path: "/showProduct/:id",
        element: (
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <DotLoader color="#36d7b7" />{" "}
              </div>
            }
          >
            <LazySingleProduct />
          </Suspense>
        ),
        loader: ({ params }) =>
          fetch(
            `https://mern-ecom-backend-henna.vercel.app/api/product/${params.id}`
          ),
      },
      {
        path: "/manageProduct",
        element: (
          <PrivetsRoutes>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-screen">
                  <DotLoader color="#36d7b7" />{" "}
                </div>
              }
            >
              <LazyManageProduct />
            </Suspense>
          </PrivetsRoutes>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivetsRoutes>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-screen">
                  <DotLoader color="#36d7b7" />{" "}
                </div>
              }
            >
              <LazyUpdateProduct />
            </Suspense>
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
