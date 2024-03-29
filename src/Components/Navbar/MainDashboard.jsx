import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";

const MainDashboard = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="h-screen md:w-80 pb-80 md:ml-36 p-2 md:p-4 min-h-full bg-blue-700 text-base-content">
      {user.role === "admin" && (
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

            <div>
              <div className="rounded-tr-2xl rounded-br-2xl ">
                <ul className="flex flex-col">
                  <li className="relative transition">
                    <input
                      className="peer hidden"
                      type="checkbox"
                      id="menu-2"
                    />
                    <div className="relative m-2 flex items-center rounded-xl border-b-4 text-black  py-3 pl-5 text-sm">
                      <span className="mr-5 flex w-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                      Manage Orders
                      <label
                        for="menu-2"
                        className="absolute inset-0 h-full w-full cursor-pointer"
                      ></label>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="peer-checked:rotate-180 absolute right-0 top-6 mr-5 ml-auto h-4 text-gray-500 transition"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <ul className="duration-400 peer-checked:max-h-96 m-2 flex max-h-0 flex-col overflow-hidden rounded-2xl  transition-all duration-300">
                      <li className="m-2 flex cursor-pointer rounded-xl py-3 pl-5 text-sm text-black hover:bg-white">
                        <span className="mr-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </span>
                        Pending Order
                      </li>
                      <li className="m-2 flex cursor-pointer rounded-xl py-3 pl-5 text-sm text-black hover:bg-white">
                        <span className="mr-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                        </span>
                        Cancelled Order
                      </li>
                      <li className="m-2 flex cursor-pointer rounded-xl py-3 pl-5 text-sm text-black hover:bg-white">
                        <span className="mr-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                        </span>
                        Processing Order
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </ul>
        </>
      )}
    </div>
  );
};

export default MainDashboard;
