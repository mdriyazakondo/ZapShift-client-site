import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import axios from "axios";

const Register = () => {
  const { createUserFunc } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    const profileImage = data.photo[0];
    createUserFunc(data.email, data.password)
      .then((result) => {
        const user = result.user;
        const formData = new FormData();
        formData.append("image", profileImage);
        const imageUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        axios.post(imageUrl, formData).then((res) => {
          updateProfile(user, {
            displayName: data.name,
            photoURL: res?.data?.data?.url,
          });
        });
      })
      .then(() => {
        Swal.fire({
          title: "Registration Successful!",
          text: "Your account has been created.",
          icon: "success",
          confirmButtonText: "OK",
        });
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
            <label className=" font-medium ">Photo</label>
            <input
              type="file"
              name="name"
              {...register("photo", { required: true })}
              placeholder="Your Photo"
              className="file-input w-full mt-2"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-400 font-medium">Photo is required</p>
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
            <Link
              state={location.state}
              to={"/login"}
              className="text-lime-600"
            >
              Login
            </Link>
          </p>
        </form>
        <p className="text-center my-3 text-gray-600 font-semibold">Or</p>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Register;
