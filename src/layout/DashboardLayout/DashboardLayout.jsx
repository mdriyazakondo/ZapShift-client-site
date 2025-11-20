import React, { useState } from "react";
import { MdDashboardCustomize, MdPassword } from "react-icons/md";
import {
  FaTruck,
  FaFileInvoiceDollar,
  FaStore,
  FaTags,
  FaMapMarkedAlt,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBars,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import { Link, Outlet, useLocation } from "react-router";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      icon: <MdDashboardCustomize />,
      label: "Dashboard",
      path: "/dashboard/my-parcel",
    },
    { icon: <FaTruck />, label: "Deliveries", path: "/deliveries" },
    { icon: <FaFileInvoiceDollar />, label: "Invoices", path: "/invoices" },
    { icon: <FaStore />, label: "Stores", path: "/stores" },
    { icon: <FaTags />, label: "Pricing Plan", path: "/pricing" },
    {
      icon: <FaMapMarkedAlt />,
      label: "Coverage Area",
      path: "/coverage-area",
    },

    // GENERAL SECTION
    {
      section: "GENERAL",
    },

    { icon: <FaCog />, label: "Settings", path: "/settings" },
    {
      icon: <MdPassword />,
      label: "Change Password",
      path: "/change-password",
    },
    { icon: <FaQuestionCircle />, label: "Help", path: "/help" },
    { icon: <FaSignOutAlt />, label: "Logout", path: "/logout" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-100 to-gray-100 text-gray-700">
      {/* Sidebar for Desktop */}
      <div
        className={`hidden md:flex flex-col transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } bg-gradient-to-b from-gray-100 to-gray-100 text-gray-700 shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <span className="text-2xl font-bold text-gray-700">
              <Link to="/" className="relative text-xl font-semibold">
                <img className="w-7 h-10" src="/assets/logo.png" alt="Logo" />
                <span className="absolute bottom-0 left-3 text-xl font-extrabold">
                  ZapShift
                </span>
              </Link>
            </span>
          )}
          <FaBars
            className="cursor-pointer text-gray-700"
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <nav className="flex-1 p-2">
          {menuItems.map((item, idx) => (
            <Link
              to={item.path}
              key={idx}
              className={`flex items-center p-3 mb-2 rounded-md cursor-pointer transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "bg-primary text-white shadow-md"
                    : "hover:bg-gray-200"
                }`}
            >
              <div className="text-lg">{item.icon}</div>
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          ))}
        </nav>
        {!collapsed && (
          <div className="p-4 border-t border-gray-200 text-sm">
            © 2025 TailAdmin
          </div>
        )}
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 md:hidden">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 w-64 h-full bg-gradient-to-b from-gray-100 to-gray-100 text-gray-700 flex flex-col p-4 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold">Dashboard</span>
              <FaTimes
                className="cursor-pointer"
                onClick={() => setSidebarOpen(false)}
              />
            </div>
            <nav className="flex-1 p-2">
              {menuItems.map((item, idx) => (
                <Link
                  to={item.path}
                  key={idx}
                  className={`flex items-center p-3 mb-2 rounded-md cursor-pointer transition-all duration-200
                    ${
                      location.pathname === item.path
                        ? "bg-primary text-white shadow-md"
                        : "hover:bg-gray-200"
                    }`}
                >
                  <div className="text-lg">{item.icon}</div>
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-gradient-to-b from-gray-100 to-gray-100 p-4 shadow-md sticky top-0 z-10 text-gray-700">
          <div className="flex items-center space-x-4">
            <p className="text-2xl font-bold text-gray-700">
              Zap Shift Dashboard
            </p>
            <FaBars
              className="text-gray-700 text-xl cursor-pointer md:hidden"
              onClick={() => setSidebarOpen(true)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <FaBell className="text-gray-700 text-xl cursor-pointer" />
            <FaUserCircle className="text-gray-700 text-2xl cursor-pointer" />
          </div>
        </header>

        {/* Stats Cards */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
