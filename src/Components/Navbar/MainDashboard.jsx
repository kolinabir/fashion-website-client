import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";

const MainDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="md:w-80 pb-80 p-2 md:p-4 min-h-full bg-yellow-400 text-base-content">
      {!user || user.role !== "admin" ? (
        <ul>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-outline btn-sm active-link w-full text-black"
                  : "btn btn-sm btn-ghost w-full text-black"
              }
            >
              My Schedules
            </NavLink>
          </li>
        </ul>
      ) : (
        <>
          <ul>
            <li>
              <NavLink
                to="/manageProduct"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-outline btn-sm active-link w-full text-black"
                    : "btn btn-sm btn-ghost w-full text-black"
                }
              >
                Manage Product
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink
                to="/addProduct"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-outline btn-sm active-link w-full text-black"
                    : "btn btn-sm btn-ghost w-full text-black"
                }
              >
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addCategory"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-outline btn-sm active-link w-full text-black"
                    : "btn btn-sm btn-ghost w-full text-black"
                }
              >
                Add Category
              </NavLink>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default MainDashboard;
