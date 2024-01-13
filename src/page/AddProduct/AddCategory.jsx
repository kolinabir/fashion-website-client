import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const AddCategory = () => {
  const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const category = {
      name: e.target.category.value,
    };
    console.log(category);
    fetch("https://mern-ecom-backend-henna.vercel.app/api/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          alert("Category added successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="drawer z-40">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  mt-3 pl-3">
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
                to="/manageProduct"
                className={({ isActive }) =>
                  isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
                }
              >
                Manage Product
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
                }
              >
                My Schedules
              </NavLink>
            </li>
          )}
          {user.role == "admin" && (
            <li>
              <NavLink
                to="/addProduct"
                className={({ isActive }) =>
                  isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
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
                  isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
                }
              >
                Add Category
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
    <div className="container mx-auto mt-10 h-[650px]">
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto ">
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            Category
          </label>
          <div className="relative">
            <input
              type="text"
              name="category"
              id="category"
              className="mt-1 block w-full py-2.5 px-4 text-sm text-gray-800 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category"
              required
            />
          </div>
        </div>

        {/* Add the Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default AddCategory;
