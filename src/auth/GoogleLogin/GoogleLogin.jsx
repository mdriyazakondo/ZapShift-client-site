import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hook/useAxios";

const GoogleLogin = () => {
  const { signInUserInGoogleFunc } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInUserInGoogleFunc();
      const user = result.user;

      if (user) {
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        // Prevent duplicate user issue (use PUT if possible)
        await axiosSecure.post("/users", userInfo).catch(() => {});

        Swal.fire({
          title: "Login Successful!",
          text: `Welcome back, ${user.displayName}!`,
          icon: "success",
        });
      }

      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath);
    } catch (err) {
      Swal.fire({
        title: "Login Failed!",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleGoogleLogin}
        className="w-full py-2 bg-gray-100 text-gray-700 font-bold flex items-center justify-center gap-2 cursor-pointer"
      >
        <FcGoogle className="w-5 h-5" /> Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
