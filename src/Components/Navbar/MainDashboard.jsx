import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { TbDeviceIpadSearch } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoBagAddOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";

const MainDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="h-screen md:w-80 pb-80  p-2 md:p-4 min-h-full bg-[#3ecf3e] text-base-content">
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
                <MdOutlineManageAccounts />
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
                <IoBagAddOutline />
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
                <BiCategory />
                Add Category
              </NavLink>
            </li>

            <div>
              <div className="font-medium text-lg">
                <ul className="flex flex-col">
                  <li className="relative transition">
                    <input
                      className="peer hidden"
                      type="checkbox"
                      id="menu-2"
                    />
                    <div className="relative md:ml-16 flex items-center rounded-xl text-black md:pt-2 text-sm">
                      <span className="md:mr-2 flex w-5">
                        <AiOutlineMenu /> {/* Example icon */}
                      </span>
                      Manage Orders
                      <FaAngleDown className="ml-5" />
                      <label
                        htmlFor="menu-2"
                        className="absolute inset-0 h-full w-full cursor-pointer"
                      ></label>
                    </div>
                    <ul className="duration-400 peer-checked:max-h-96 m-2 flex max-h-0 flex-col overflow-hidden rounded-2xl  transition-all duration-300">
                      <li className="m-2 flex cursor-pointer rounded-xl py-1 pl-14 text-sm text-black hover:bg-white">
                        <span className="mr-5">
                          {/* Example icon */}
                          <CiSettings />
                        </span>
                        <NavLink
                          state={{ status: "pending" }}
                          to="/orderStatus"
                        >
                          Pending Order
                        </NavLink>
                      </li>
                      <li className="m-2 flex cursor-pointer rounded-xl py-1 pl-14 text-sm text-black hover:bg-white">
                        <span className="mr-5">
                          {/* Example icon */}
                          <MdOutlineCancel />
                        </span>
                        <NavLink
                          state={{ status: "cancelled" }}
                          to="/orderStatus"
                        >
                          Cancelled Order
                        </NavLink>
                      </li>
                      <li className="m-2 flex cursor-pointer rounded-xl py-1 pl-14 text-sm text-black hover:bg-white">
                        <span className="mr-5">
                          {/* Example icon */}
                          <TbDeviceIpadSearch />
                        </span>
                        <NavLink
                          state={{ status: "processing" }}
                          to="/orderStatus"
                        >
                          Processing Order
                        </NavLink>
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
