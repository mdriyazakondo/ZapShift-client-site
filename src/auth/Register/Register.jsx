import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import useAuth from "../../hook/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
  const { createUserFunc, signInUserInGoogleFunc } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    createUserFunc(data.email, data.password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, { displayName: data.name, photoURL: data?.photo });
      })
      .then(() => {
        Swal.fire({
          title: "Registration Successful!",
          text: "Your account has been created.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Login Failed!",
          text: err.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  // google login
  const handleGoogleLogin = () => {
    signInUserInGoogleFunc()
      .then((result) => {
        const user = result.user;
        if (user) {
          Swal.fire({
            title: "Login Successful!",
            text: `Welcome back, ${user.displayName}!`,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Login Failed!",
          text: err.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-700 text-center md:text-start">
        Create an Account
      </h2>
      <p className="text-center md:text-start">Register with ZapShift</p>
      <div className="mt-4">
        <img src="/assets/image-upload-icon.png" alt="" />
      </div>
      <div className="w-full md:w-2/3 mt-8 ">
        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-3">
          <div>
            <label className=" font-medium ">Name</label>
            <input
              type="text"
              name="name"
              {...register("name", { required: true })}
              placeholder="Your Name"
              className="border border-gray-400 focus:border-gray-600 outline-none rounded-md w-full py-2 px-4 mt-2"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-400 font-medium">Name is required</p>
            )}
          </div>
          <div>
            <label className=" font-medium ">Email</label>
            <input
              type="email"
              name="email"
              {...register("email", { required: true })}
              placeholder="Your Email"
              className="border border-gray-400 focus:border-gray-600 outline-none rounded-md w-full py-2 px-4 mt-2"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-400 font-medium">Email is required</p>
            )}
          </div>
          <div>
            <label className=" font-medium ">Password</label>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
              })}
              placeholder="Your Password"
              className="border border-gray-400 focus:border-gray-600 outline-none rounded-md w-full py-2 px-4 mt-2"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-400 font-medium">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-400 font-medium">
                Password is mustbe 6 cheracters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-400 font-medium">
                Password is One uppreCase one lowerCase one Number
              </p>
            )}
          </div>

          <button className="w-full bg-primary py-2  rounded-md font-semibold  text-gray-700 cursor-pointer">
            Sign In
          </button>
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to={"/login"} className="text-lime-600">
              Login
            </Link>
          </p>
        </form>
        <p className="text-center my-3 text-gray-600 font-semibold">Or</p>
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 bg-gray-100 text-gray-700 font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <FcGoogle className="w-5 h-5" /> Login with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
