import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 min-h-[42vh]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
