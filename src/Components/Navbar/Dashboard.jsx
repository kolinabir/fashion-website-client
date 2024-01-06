import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const { userLogin } = useContext(AuthContext);
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(userLogin);
  }, [userLogin]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle hidden lg:hidden"
      />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>

        {/* Your existing drawer content */}
        <ul
          className={`${
            drawerOpen ? "block" : "hidden"
          } text-white z-10 menu p-2 shadow bg-base-100 rounded-box w-36 mt-2 absolute left-0 lg:relative lg:block lg:shadow-none`}
        >
          {user && (
            <NavLink
              to="/manageService"
              className={({ isActive }) =>
                isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
              }
              onClick={toggleDrawer}
            >
              Manage Service
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
              }
              onClick={toggleDrawer}
            >
              My Schedules
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/addService"
              className={({ isActive }) =>
                isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
              }
              onClick={toggleDrawer}
            >
              Add Product
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/addCategory"
              className={({ isActive }) =>
                isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
              }
              onClick={toggleDrawer}
            >
              Add Category
            </NavLink>
          )}
        </ul>
      </div>
      <div className="drawer-side lg:relative lg:block lg:shadow-none">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* The rest of your sidebar content here */}
      </div>
    </div>
  );
};

export default Dashboard;
