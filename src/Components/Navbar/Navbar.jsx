import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, signOut, loading } = useContext(AuthContext);

  const handleLogout = () => {
    signOut();
  };

  return (
    <div>
      <nav className="sticky inset-0 z-10 block h-max w-full max-w-full rounded-none border border-white/100 bg-white  py-2 px-4 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
        <div className="flex items-center text-gray-900">
          <Link
            to="/"
            className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
          >
            <div className="flex items-center gap-2 font-bold text-2xl">
              <img className="w-8 " src="/logo.svg" alt="" />
              <p className="text-base">AN NOOR</p>
            </div>
          </Link>

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
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : user?.email ? (
            <>
              <div className="relative group">
                <Link to="/dashboard">
                  <button className="btn btn-sm btn-ghost">
                    <a className="flex items-center" href="#">
                      Dashboard
                    </a>
                  </button>
                </Link>
              </div>

              <div className="dropdown text-white dropdown-bottom dropdown-end">
                <label tabIndex={0} className="">
                  {!user ? (
                    <img
                      className="md:w-11 w-8 h-10 object-cover rounded-full"
                      src={""}
                      alt="User Profile"
                    />
                  ) : (
                    <img
                      className="md:w-11 w-8"
                      src="https://i.ibb.co/SvWDpny/profile.png"
                      alt="Default Profile"
                    />
                  )}
                </label>
                <ul
                  tabIndex={1}
                  className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <div>
                      {user?.displayName ? user?.displayName : "Anonymous user"}

                      <button
                        onClick={handleLogout}
                        className="middle none center hidden rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                        type="button"
                        data-ripple-light="true"
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="middle none center hidden rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
              type="button"
              data-ripple-light="true"
            >
              <span>SIGN UP/Login</span>
            </Link>
          )}

          <button
            className="middle none relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] rounded-lg text-center font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            data-collapse-target="sticky-navar"
          >
            <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <div
          className="block h-0 w-full basis-full overflow-hidden text-blue-gray-900 transition-all duration-300 ease-in lg:hidden"
          data-collapse="sticky-navar"
        >
          <ul className="mt-2 mb-4 flex flex-col gap-2 pb-2">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
              }
            >
              CATALOGUE
            </NavLink>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
              }
            >
              <a className="flex items-center" href="#">
                AN NOOR
              </a>
            </NavLink>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
              }
            >
              <a className="flex items-center" href="#">
                FAVOURITE
              </a>
            </NavLink>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "btn btn-primary btn-sm" : "btn btn-sm btn-ghost"
              }
            >
              <a className="flex items-center" href="#">
                Docs
              </a>
            </NavLink>
            {user?.email ? (
              <div>
                <div className="flex text-white  items-center md:justify-center md:gap-3">
                  {user?.displayName ? user?.displayName : "Anonymous user"}
                  {user?.photoURL ? (
                    <img
                      className="md:w-11 w-8 object-cover rounded-full"
                      src={user?.photoURL}
                      alt="User Profile"
                    />
                  ) : (
                    <img
                      className="md:w-11 w-8"
                      src="https://i.ibb.co/SvWDpny/profile.png"
                      alt="Default Profile"
                    />
                  )}
                  <button
                    onClick={handleLogout}
                    className="middle none center hidden rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button"
                    data-ripple-light="true"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="middle none center hidden rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button"
                data-ripple-light="true"
              >
                <span>SIGN UP/Login</span>
              </button>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
