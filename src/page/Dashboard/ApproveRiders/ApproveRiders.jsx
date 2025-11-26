import React from "react";
import useAxiosSecure from "../../../hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrash, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data.result;
    },
  });

  const updateRiderStatus = async (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    const result = await Swal.fire({
      title: "Approve This Rider?",
      text: `Are you sure you want to ${status} this rider?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    });
    if (!result.isConfirmed) return;
    try {
      const res = await axiosSecure.patch(`/riders/${rider._id}`, updateInfo);
      console.log(res);
      if (res.data?.result?.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: `Rider ${status} Successfully!`,
          showCancelButton: false,
          timer: 2000,
        });
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to Approve",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const handleApprobal = (rider) => {
    updateRiderStatus(rider, "approved");
  };
  const handleReject = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  const handleDeleted = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      const res = await axiosSecure.delete(`/riders/${id}`);

      if (res.data.result.deletedCount) {
        Swal.fire("Deleted!", "Rider removed successfully", "success");
        refetch();
      }
    });
  };

  return (
    <div>
      <h3> ApproveRiders {riders.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center border border-gray-300">No.</th>
              <th className="text-center border border-gray-300">Name</th>
              <th className="text-center border border-gray-300">Email</th>
              <th className="text-center border border-gray-300">District</th>
              <th className="text-center border border-gray-300">Status</th>
              <th className="text-center border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {riders.map((rider, i) => (
              <tr key={rider._id}>
                <th className="text-center border border-gray-300">{i + 1}</th>
                <td className="text-center border border-gray-300">
                  {rider.name}
                </td>
                <td className="text-center border border-gray-300">
                  {rider.email}
                </td>
                <td className="text-center border border-gray-300">
                  {rider.district}
                </td>
                <td
                  className={`text-center border font-semibold border-gray-300
                     ${rider.status === "pending" ? " text-amber-500" : ""}
                     ${rider.status === "approved" ? " text-green-500" : ""}
                     ${rider.status === "rejected" ? " text-red-500" : ""}
                     `}
                >
                  {rider.status}
                </td>
                <td className="text-center border border-gray-300 flex items-center gap-2 justify-center">
                  <button className=" w-8 h-5 cursor-pointer bg-blue-500 text-white flex items-center justify-center rounded-full">
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleApprobal(rider)}
                    className=" w-8 h-5 cursor-pointer bg-green-500 text-white flex items-center justify-center rounded-full"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleReject(rider)}
                    className=" w-8 h-5 cursor-pointer bg-red-500 text-white flex items-center justify-center rounded-full"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button
                    onClick={() => handleDeleted(rider._id)}
                    className=" w-8 h-5 cursor-pointer bg-red-500 text-white flex items-center justify-center rounded-full"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
