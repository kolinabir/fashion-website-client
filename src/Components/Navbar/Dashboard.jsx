import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="drawer z-40">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mb-[800px] mt-3 pl-3">
        {/* Your existing drawer content */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open dashboard
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {user.role == "admin" && (
            <li>
              <NavLink
                to="/manageService"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-primary btn-sm"
                    : "btn btn-sm btn-ghost"
                }
              >
                Manage Service
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-primary btn-sm"
                    : "btn btn-sm btn-ghost"
                }
              >
                My Schedules
              </NavLink>
            </li>
          )}
          {user.role == "admin" && (
            <li>
              <NavLink
                to="/addService"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-primary btn-sm"
                    : "btn btn-sm btn-ghost"
                }
              >
                Add Product
              </NavLink>
            </li>
          )}
          {user.role == "admin" && (
            <li>
              <NavLink
                to="/addCategory"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-primary btn-sm"
                    : "btn btn-sm btn-ghost"
                }
              >
                Add Category
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
