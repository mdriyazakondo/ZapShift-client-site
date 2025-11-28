import { FaUserShield } from "react-icons/fa";
import { LuShieldOff } from "react-icons/lu";
import useAxiosSecure from "../../../hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";
import { useState } from "react";

const UserManegments = () => {
  const axiosSecure = useAxiosSecure();
  const [searchUser, setSearchUser] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchUser],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchUser}`);
      return res.data.result;
    },
  });

  const handleMakeAdmin = (user) => {
    const userInfo = { role: "admin" };
    Swal.fire({
      title: "Agre with the admin?",
      text: `You well be admin Taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, take it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, userInfo).then((res) => {
          if (res.data.result.modifiedCount) {
            refetch();
            Swal.fire({
              icon: "success",
              title: `${user.displayName} marked as an admin`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };
  const handleRemoveAdmin = (user) => {
    const userInfo = { role: "user" };
    Swal.fire({
      title: "Agre with the user?",
      text: `You will be only user`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, take it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, userInfo).then((res) => {
          if (res.data.result.modifiedCount) {
            refetch();
            Swal.fire({
              icon: "success",
              title: `${user.displayName} marked as an admin`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Users Manage: {users.length}
      </h2>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mb-6 w-full md:w-1/4 "
      >
        <input
          type="text"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder="Search Users..."
          className="border outline-none rounded-sm py-2 px-4 border-gray-400 w-full"
        />
      </form>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-base-200">
              <th>No.</th>
              <th>User Info</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Others</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="">{index + 1}</td>

                {/* User Info */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user?.photoURl} alt={user.displayName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">{user.role}</div>
                    </div>
                  </div>
                </td>

                <td className="">{user.email}</td>
                <td className="capitalize">{user.role}</td>

                {/* Admin Actions */}
                <td className="flex items-center gap-2 ">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn bg-red-500   rounded-md text-white"
                    >
                      <LuShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-green-500  rounded-md text-black"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>

                {/* Other */}
                <td className="">
                  <button className="btn btn-ghost btn-xs">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManegments;
