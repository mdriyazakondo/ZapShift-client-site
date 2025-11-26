import React from "react";
import useRole from "../hook/useRole";
import { Navigate, useLocation } from "react-router";
import Loading from "../page/Loading/Loading";
import useAuth from "../hook/useAuth";
import Forbidden from "../components/Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  const { loading } = useAuth();
  const location = useLocation();

  if (loading || isLoading) {
    return <Loading />;
  }

  if (role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;
