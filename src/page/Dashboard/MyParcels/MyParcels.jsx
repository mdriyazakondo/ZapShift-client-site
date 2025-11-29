import React from "react";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data.result;
    },
  });
  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.result.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      parcelName: parcel?.parcelName,
      senderEmail: parcel.senderEmail,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );

    window.location.href = res.data.url;
  };

  return (
    <div className="py-10 px-3 md:px-6 lg:px-10 relative min-h-[56vh] w-full">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-center text-green-500">
        My All Post
      </h2>

      <div className="">
        <div className="pl-[450px] md:pl-96 lg:pl-20 w-[420px] md:w-[500px] lg:w-[800px] xl:w-[1200px] md:mx-auto flex justify-center overflow-x-auto  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <table className="lg:w-[800px] xl:w-[1200px] border border-gray-300 text-sm">
            <thead className="bg-primary text-gray-700">
              <tr>
                <th className="px-4 py-3 text-center whitespace-nowrap">No.</th>
                <th className="px-4 py-3 text-center whitespace-nowrap">
                  Parcel Name
                </th>
                <th className="px-4 py-3 text-center whitespace-nowrap">
                  Cost
                </th>
                <th className="px-4 py-3 text-center whitespace-nowrap">
                  Payment
                </th>
                <th className="px-4 py-3 text-center whitespace-nowrap">
                  Tracking Id
                </th>
                <th className="px-4 py-3 text-center whitespace-nowrap">
                  Delevery Status
                </th>
                <th className="px-4 py-3 text-center whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-800">
              {parcels.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    {item.parcelName}
                  </td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    {item.cost}
                  </td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    {item.payment_status === "paid" ? (
                      <span className="text-green-400 font-semibold">Paid</span>
                    ) : (
                      // <Link to={`/dashboard/payment/${item._id}`}>
                      <button
                        onClick={() => handlePayment(item)}
                        className="bg-primary text-gray-700 cursor-pointer py-2 px-3 rounded-sm font-semibold"
                      >
                        Pay
                      </button>
                      // </Link>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center whitespace-nowrap text-gray-600 font-semibold">
                    <Link to={`/parcel-track/${item.trackingId}`}>
                      {item?.trackingId}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-center whitespace-nowrap text-red-400 font-semibold">
                    {item?.deliveryStatus}
                  </td>

                  <td className="px-4 py-2 text-center whitespace-nowrap flex items-center justify-center gap-3">
                    <button className="flex items-center gap-1  font-semibold text-blue-500 py-1 px-3 rounded-full bg-blue-100 cursor-pointer">
                      <FaMagnifyingGlass />
                      View
                    </button>
                    <button
                      onClick={() => handleParcelDelete(item._id)}
                      className="flex items-center gap-1  font-semibold text-red-500 py-1 px-3 rounded-full bg-red-100 cursor-pointer"
                    >
                      <FaTrash />
                      Delete
                    </button>
                    <button className="flex items-center gap-1  font-semibold text-green-500 py-1 px-3 rounded-full bg-green-100 cursor-pointer">
                      <FaEdit />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* {selectedCropId && (
        <div className="fixed inset-0 bg-green-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setSelectedCropId(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Edit Crop Details
            </h2>

            <UpdateCrop
              id={selectedCropId}
              products={products.find((p) => p._id === selectedCropId)}
              onClose={() => {
                setSelectedCropId(null);
                fetchProducts();
              }}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MyParcels;
