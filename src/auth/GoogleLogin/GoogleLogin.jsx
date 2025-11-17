import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const GoogleLogin = () => {
  const { signInUserInGoogleFunc } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
    <div className="mt-4">
      <button
        onClick={handleGoogleLogin}
        className="w-full py-2 bg-gray-100 text-gray-700 font-bold flex items-center justify-center gap-2 cursor-pointer"
      >
        <FcGoogle className="w-5 h-5" /> Login with google
      </button>
    </div>
  );
};

export default GoogleLogin;
