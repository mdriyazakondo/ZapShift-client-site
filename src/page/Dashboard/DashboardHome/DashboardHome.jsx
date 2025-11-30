import React from "react";
import useRole from "../../../hook/useRole";
import Loading from "../../Loading/Loading";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <Loading />;
  }
  
  if (role === "admin") {
    return <AdminDashboard />;
  } else if (role === "rider") {
    return <RiderDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default DashboardHome;
