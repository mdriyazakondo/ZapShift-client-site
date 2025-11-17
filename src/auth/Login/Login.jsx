import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import GoogleLogin from "../GoogleLogin/GoogleLogin";

const Login = () => {
  const { signInUserFunc, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginSubmit = (data) => {
    signInUserFunc(data.email, data.password)
      .then((result) => {
        if (result.user) {
          Swal.fire({
            title: "Login Successful!",
            text: `Welcome back, ${user.displayName}!`,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
        navigate(location.state?.form.pathName || "/");
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
        Welcome Back
      </h2>
      <p className="text-center md:text-start">Login with ZapShift</p>
      <div className="w-full md:w-2/3 mt-8 ">
        <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-3">
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
          <div>
            <Link
              to="/forget"
              className="underline text-xl font-medium text-gray-600"
            >
              Forget Password
            </Link>
          </div>
          <button className="w-full bg-primary py-2  rounded-md font-semibold  text-gray-700 cursor-pointer">
            Sign In
          </button>
          <p className="text-gray-600">
            Don’t have any account?{" "}
            <Link to={"/register"} className="text-lime-600">
              Register
            </Link>
          </p>
        </form>
        <p className="text-center my-3 text-gray-600 font-semibold">Or</p>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
