import React from "react";
import AuthNavbar from "../../shared/AuthNavbar";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <AuthNavbar />
      <div className="flex flex-col md:flex-row items-center justify-between min-h-[95vh] ">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="bg-amber-200 flex-1 ">
          <img src="/assets/authImage.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
