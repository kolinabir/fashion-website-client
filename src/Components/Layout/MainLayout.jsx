import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

// Lazy-loaded components
const LazyNavbar = lazy(() => import("../Navbar/Navbar"));
const LazyFooter = lazy(() => import("../../page/Footer/Footer"));

const MainLayout = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <LazyNavbar />
      </Suspense>
      <Outlet></Outlet>
      <Suspense fallback={<div>Loading Footer...</div>}>
        <LazyFooter />
      </Suspense>
    </div>
  );
};

export default MainLayout;
