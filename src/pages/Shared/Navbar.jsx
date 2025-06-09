import { use } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = use(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => console.log("User logged out successfully"))
      .catch((error) => console.error("Error logging out:", error));
  };

  const links = (
  <>
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-orange-500 font-semibold underline underline-offset-4"
            : "text-gray-700 hover:text-orange-500 transition"
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/LostFound"
        className={({ isActive }) =>
          isActive
            ? "text-orange-500 font-semibold underline underline-offset-4"
            : "text-gray-700 hover:text-orange-500 transition"
        }
      >
        Lost & Found
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/AddItems"
        className={({ isActive }) =>
          isActive
            ? "text-orange-500 font-semibold underline underline-offset-4"
            : "text-gray-700 hover:text-orange-500 transition"
        }
      >
        Add Items
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/Myitems"
        className={({ isActive }) =>
          isActive
            ? "text-orange-500 font-semibold underline underline-offset-4"
            : "text-gray-700 hover:text-orange-500 transition"
        }
      >
        My Items
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/recovereditems"
        className={({ isActive }) =>
          isActive
            ? "text-orange-500 font-semibold underline underline-offset-4"
            : "text-gray-700 hover:text-orange-500 transition"
        }
      >
        Recovered
      </NavLink>
    </li>
  </>
);


  return (
    <div className="navbar sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-base-100/70 shadow-md px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-20 p-3 shadow-lg bg-white dark:bg-base-200 rounded-box w-56"
          >
            {links}
          </ul>
        </div>
        <a className="text-xl font-bold text-primary hover:scale-105 duration-200 tracking-tight">
          Where Is It?
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
      </div>

      {/* Theme Toggle */}
      <label className="swap swap-rotate mx-2">
        <input type="checkbox" />
        <svg
          className="swap-on w-6 h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71..." />
        </svg>
        <svg
          className="swap-off w-6 h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1..." />
        </svg>
      </label>

      <div className="navbar-end space-x-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary transition-all"
            >
              <div className="w-10 rounded-full ring-2 ring-offset-2 ring-primary ring-offset-base-100">
                <img src={user.photoURL} alt="User" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-56"
            >
              <li>
                <span className="font-semibold text-sm">{user.displayName}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-500 hover:underline">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <NavLink
              to="/SignIn"
              className="btn btn-sm border-yellow-400 text-yellow-600 hover:bg-yellow-100"
            >
              Login
            </NavLink>
            <NavLink
              to="/Register"
              className="btn btn-sm border-yellow-400 text-yellow-600 hover:bg-yellow-100"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
