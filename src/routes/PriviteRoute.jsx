import React from "react";
import useAuth from "../hook/useAuth";
import { Navigate, useLocation } from "react-router";
import Loading from "../page/Loading/Loading";

const PriviteRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return children;
};

export default PriviteRoute;
