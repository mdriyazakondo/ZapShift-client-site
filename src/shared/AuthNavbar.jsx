import React from "react";
import { Link } from "react-router";

const AuthNavbar = () => {
  return (
    <Link to="/" className="relative">
      <img src="/assets/logo.png" alt="" />
      <span className="absolute bottom-0 left-4 text-2xl font-extrabold">
        ZapShift
      </span>
    </Link>
  );
};

export default AuthNavbar;
