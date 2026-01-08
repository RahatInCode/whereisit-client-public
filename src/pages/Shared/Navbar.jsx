import { useContext, useState } from "react";
import { NavLink } from "react-router"; 
import { AuthContext } from "../../contexts/AuthContext";
import useTheme from "../../hooks/useTheme"; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [hovered, setHovered] = useState(false);

  // Get current theme and setter from your custom hook
  const [theme, setTheme] = useTheme();

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
              ? "text-primary font-semibold underline underline-offset-4"
              : "text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
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
              ? "text-primary font-semibold underline underline-offset-4"
              : "text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
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
              ? "text-primary font-semibold underline underline-offset-4"
              : "text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
          }
        >
          Add Items
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/Myitems"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold underline underline-offset-4"
                : "text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
            }
          >
            My Items
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/recovereditems"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold underline underline-offset-4"
              : "text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
          }
        >
          Recovered
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/FindItems"
          className={({ isActive }) => 
            isActive
              ? "text-primary font-semibold underline underline-offset-4"
              : "text-gray-700 dark:text-gray-300 hover:text-orange-500 transition"
          }
        >
          Find Items
        </NavLink>
      </li>
    </>
  );

  // Toggle light/dark theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="navbar sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-base-100/70 shadow-md px-4">
      {/* Left Section */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
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
        <a className="text-xl font-bold text-primary dark:text-primary hover:scale-105 duration-200 tracking-tight">
          Where Is It?
        </a>
      </div>

      {/* Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
      </div>

      {/* Theme Toggle */}
      <div className="navbar-end lg:mr-4 mr-2">
        <label className="swap swap-rotate cursor-pointer">
          {/* Hidden checkbox controlled by theme state */}
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />

          {/* Sun icon */}
          <svg
            className="swap-off h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* Moon icon */}
          <svg
            className="swap-on h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>

      {/* Right Section */}
      <div className="navbar-end space-x-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar relative hover:ring-2 hover:ring-primary transition-all"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className="w-10 rounded-full ring-2 ring-offset-2 ring-primary ring-offset-base-100">
                <img src={user.photoURL} alt="User" />
              </div>
              {hovered && (
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-semibold bg-base-100 dark:bg-base-200 text-gray-800 dark:text-gray-200 shadow px-2 py-1 rounded">
                  {user.displayName}
                </span>
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 dark:bg-base-200 rounded-box w-56"
            >
              <li>
                <span className="font-semibold text-sm">{user.displayName}</span>
              </li>
              <li>
                <NavLink to="/AddItems">Add Items</NavLink>
              </li>
              <li>
                <NavLink to="/Myitems">My Items</NavLink>
              </li>
              <li>
                <NavLink to="/recovereditems">Recovered</NavLink>
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


