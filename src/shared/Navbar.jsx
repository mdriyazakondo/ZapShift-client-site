import { useState, useRef, useEffect } from "react";
import { FiMenu, FiHome, FiTag } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidContact } from "react-icons/bi";
import { FaBlog } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { VscRunCoverage } from "react-icons/vsc";
import { Link, useLocation } from "react-router"; // FIXED
import { LuArrowUpRight } from "react-icons/lu";
import useAuth from "../hook/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef();

  const { user, loading, signInUserLogoutFunc, setLoading } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        signInUserLogoutFunc()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have been successfully logged out.",
              icon: "success",
              confirmButtonText: "OK",
            });
            setLoading(false);
          })
          .catch((err) => {
            Swal.fire({
              title: "Logout Failed!",
              text: err.message,
              icon: "error",
              confirmButtonText: "Try Again",
            });
          });
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { path: "/", name: "Home", icon: <FiHome /> },
    { path: "/coverage", name: "Coverage", icon: <VscRunCoverage /> },
    { path: "/about", name: "About Us", icon: <FcAbout /> },
    { path: "/pricing", name: "Pricing", icon: <FiTag /> },
    { path: "/blog", name: "Blog", icon: <FaBlog /> },
    { path: "/contact", name: "Contact", icon: <BiSolidContact /> },
    { path: "/beaRider", name: "Be a Rider", icon: <BiSolidContact /> },
  ];

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-9999 bg-white transition-all">
      <div className="relative">
        <img src="/assets/logo.png" alt="" />
        <span className="absolute bottom-0 left-4 text-2xl font-bold">
          ZapShift
        </span>
      </div>

      {/* DESKTOP MENU */}
      <ul className="text-gray-600 hidden lg:flex items-center gap-4">
        {links.map((item) => (
          <Link
            to={item.path}
            key={item.name} // FIXED
            className={`flex items-center gap-1 font-semibold ${
              location.pathname === item.path
                ? "bg-primary text-black py-1 px-2 rounded-full"
                : ""
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </ul>

      {/* RIGHT SIDE BUTTONS */}
      {loading ? (
        <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <div className="lg:flex items-center gap-2 hidden">
          {user ? (
            <div className="flex items-center gap-2">
              <img
                className="w-11 h-11 rounded-full border border-primary"
                src={
                  user?.photoURL ||
                  user?.reloadUserInfo?.photoURL ||
                  "/assets/user.png"
                }
                alt="user"
              />

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md cursor-pointer hover:bg-primary hover:text-black border border-primary text-gray-600 font-semibold text-xl transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to={"/login"}
                className="px-4 py-2 rounded-md cursor-pointer hover:bg-primary hover:text-black border border-primary text-gray-600 font-semibold text-xl transition"
              >
                Sign In
              </Link>

              <div className="flex items-center">
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md cursor-pointer bg-primary text-black border border-primary hover:bg-transparent hover:text-gray-600 font-semibold text-xl transition"
                >
                  Sign Up
                </Link>
                <button className="cursor-pointer">
                  <LuArrowUpRight className="w-12 h-12 p-3 bg-primary rounded-full border border-primary hover:bg-transparent" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* MOBILE MENU BUTTON */}
      <button
        aria-label="menu-btn"
        type="button"
        className="inline-block lg:hidden text-gray-600"
        onClick={() => setOpen(!open)}
      >
        {open ? <AiOutlineClose size={24} /> : <FiMenu size={24} />}
      </button>

      {/* MOBILE MENU */}
      {open && (
        <div
          ref={menuRef}
          className="absolute top-[70px] left-0 w-full bg-white p-6 lg:hidden shadow-md"
        >
          <ul className="flex flex-col space-y-4 text-gray-600 text-lg">
            {links.map((item) => (
              <Link
                to={item.path}
                key={item.name} // FIXED
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </ul>

          <button
            type="button"
            className="bg-white text-gray-700 mt-6 text-sm w-40 h-11 rounded-full"
            style={{ backgroundColor: "#caeb66" }}
            onClick={() => setOpen(false)}
          >
            Get started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
