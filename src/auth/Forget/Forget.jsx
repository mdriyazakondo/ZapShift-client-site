import React from "react";
import useAuth from "../../hook/useAuth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Forget = () => {
  const navigate = useNavigate();
  const { resetUserFunc } = useAuth();

  const { register, handleSubmit } = useForm();

  const handleReset = (data) => {
    resetUserFunc(data.email)
      .then(() => {
        Swal.fire({
          title: "Reset Email Sent!",
          text: "Please check your inbox to reset your password.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Failed to Send Reset Email",
          text: err.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };
  return (
    <div className="w-full md:w-2/3 ">
      <h2 className="text-4xl font-bold mb-2 text-center md:text-start">
        Forgot Password
      </h2>
      <p className="text-center md:text-start">
        Enter your email address and we’ll send you a reset link.
      </p>
      <form onSubmit={handleSubmit(handleReset)} className="mt-4">
        <label className="text-gray-700 font-bold">Your Email</label>
        <input
          type="email"
          placeholder="Your Email"
          {...register("email", { required: true })}
          className="py-2 px-4 border border-gray-400 rounded-md w-full mt-2"
        />
        <button className="w-full py-2 mt-4 bg-primary text-gray-700 font-semibold rounded-md">
          Reset
        </button>
        <p className="text-gray-600 mt-3">
          Remember your password?{" "}
          <Link to={"/login"} className="text-lime-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Forget;
