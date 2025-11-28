import { createBrowserRouter } from "react-router";
import Coverage from "../page/Coverage/Coverage";
import Home from "../page/Home/Home/Home";
import MainLayout from "../layout/MainLayout/MainLayout";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import Forget from "../auth/Forget/Forget";
import About from "../page/About/About";
import BeaRider from "../page/BeaRider/BeaRider";
import PriviteRoute from "./PriviteRoute";
import SendParcel from "../page/SendParcel/SendParcel";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import MyParcels from "../page/Dashboard/MyParcels/MyParcels";
import Payment from "../page/Dashboard/Payment/Payment";
import PaymentSuccess from "../page/Dashboard/Payment/PaymentSuccess/PaymentSuccess";
import PaymentCencel from "../page/Dashboard/Payment/PaymentCencel/PaymentCencel";
import PaymentHIstory from "../page/Dashboard/Payment/PymentHistory/PaymentHIstory";
import ApproveRiders from "../page/Dashboard/ApproveRiders/ApproveRiders";
import UserManegments from "../page/Dashboard/UserManegments/UserManegments";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../page/Dashboard/AssignRiders/AssignRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "coverage",
        element: <Coverage />,
        loader: () => fetch("/data/serviceCenter.json"),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/beaRider",
        element: (
          <PriviteRoute>
            <BeaRider />
          </PriviteRoute>
        ),
        loader: () =>
          fetch("/data/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "/sendParcel",
        element: (
          <PriviteRoute>
            <SendParcel />
          </PriviteRoute>
        ),
        loader: () =>
          fetch("/data/serviceCenter.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forget",
        element: <Forget />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PriviteRoute>
        <DashboardLayout />
      </PriviteRoute>
    ),
    children: [
      { path: "/dashboard/my-parcel", element: <MyParcels /> },
      { path: "/dashboard/payment/:parcelId", element: <Payment /> },
      { path: "/dashboard/payment-success", element: <PaymentSuccess /> },
      { path: "/dashboard/payment-cancelled", element: <PaymentCencel /> },
      { path: "/dashboard/payment-history", element: <PaymentHIstory /> },
      {
        path: "/dashboard/approve-riders",
        element: (
          <AdminRoute>
            {" "}
            <ApproveRiders />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/users-manegments",
        element: (
          <AdminRoute>
            <UserManegments />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        ),
      },
    ],
  },
]);
