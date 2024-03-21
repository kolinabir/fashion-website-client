import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { FaCartArrowDown, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCartItems } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, signOut } = useContext(AuthContext);
  // console.log(cartTotal);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    data: cartItems,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: () => getCartItems(user?._id, localStorage.getItem("token")),
    select: (data) => {
      return data.data.orders.length;
    },
  });
  console.log(cartItems);

  return (
    <div className="shadow-md">
      <div className="md:mx-20 lg:mx-36">
        <nav className="sticky inset-0 z-10 block h-max w-full max-w-full border border-white/100 bg-white  py-2 px-4 text-white rounded-md  lg:px-8 lg:py-4">
          <div className="flex items-center text-gray-900">
            {/* Logo */}
            <Link
              to="/"
              className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
            >
              <div className="flex items-center gap-2 font-bold text-2xl">
                <img className="w-8 " src="/logo.svg" alt="" />
                <p className="text-base">AN NOOR</p>
              </div>
            </Link>

            {/* Responsive button for mobile */}
            <button
              className="block ml-auto mr-2 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            {/* Navigation links */}
            <div className="ml-auto mr-2 hidden items-center gap-6 lg:flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
                }
              >
                HOME
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
                }
              >
                Products
              </NavLink>
              {user && (
                <div className="relative hidden md:block group">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-primary btn-sm"
                        : "btn btn-sm btn-ghost"
                    }
                  >
                    Dashboard
                  </NavLink>
                </div>
              )}
            </div>
            {user?.role !== "admin" && (
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-primary btn-sm mr-3"
                    : "btn btn-sm btn-ghost mr-3"
                }
              >
                <FaCartArrowDown className="text-xl w-6 h-6" />
                {cartItems > 0 && <span className="ml-1">{cartItems}</span>}
              </NavLink>
            )}
            {/* User authentication and profile dropdown */}

            {user ? (
              <div className="dropdown dropdown-end">
                <div className="flex gap-3">
                  <label tabIndex={0}>
                    {user?.photoURL ? (
                      <img
                        className="w-8 md:w-10 rounded-full"
                        src={user?.photoURL}
                        alt=""
                      />
                    ) : (
                      <FaUserCircle className="text-4xl"></FaUserCircle>
                    )}
                  </label>
                </div>
                <div className="dropdown-content z-[2] menu p-2 shadow rounded-box lg:w-96 bg-white">
                  <div className="p-3">
                    <div className="flex justify-center">
                      {user?.photoURL ? (
                        <img
                          className="rounded-full w-16 md:w-24"
                          src={user?.photoURL}
                          alt=""
                        />
                      ) : (
                        <FaUserCircle className="text-7xl"></FaUserCircle>
                      )}
                    </div>
                    <div className="flex justify-center">
                      <hr className="my-7 w-1/2" />
                    </div>
                    <div className="text-center">
                      <h2 className="text-sm md:text-xl mb-2">
                        <span className="text-[#FD0054]">Name:</span>{" "}
                        {user?.username}
                      </h2>
                      <p className="text-sm md:text-lg mb-5 ">
                        <span className="text-[#FD0054]">Email:</span>{" "}
                        {user?.email}
                      </p>
                      <button
                        onClick={handleLogout}
                        className="btn btn-primary btn-sm w-full"
                        type="button"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary btn-sm"
                type="button"
              >
                <span>Login</span>
              </Link>
            )}

            {/* Mobile navigation menu */}
            {isMenuOpen && (
              <div
                className={`lg:hidden absolute transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="ml-auto p-2 rounded-xl bg-gray-400 shadow-2xl mr-2 top-[88px] left-[255px] relative flex flex-col gap-4"
                  ref={menuRef}
                >
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-primary btn-sm"
                        : "btn btn-sm btn-ghost"
                    }
                  >
                    HOME
                  </NavLink>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      isActive
                        ? "btn btn-primary btn-sm"
                        : "btn btn-sm btn-ghost"
                    }
                  >
                    Products
                  </NavLink>
                  {user && (
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "btn btn-primary btn-sm"
                          : "btn btn-sm btn-ghost"
                      }
                    >
                      Dashboard
                    </NavLink>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
