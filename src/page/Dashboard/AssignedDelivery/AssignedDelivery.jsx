import React from "react";
import useAxiosSecure from "../../../hook/useAxios";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
const AssignedDelivery = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver_assigned`
      );
      return res.data.result;
    },
  });

  const handleStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };
    let message = `Parcel Status Update with ${status.split("_").join(" ")}`;
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.result.modifiedCount) {
          refetch();
          Swal.fire({
            title: message,
            text: "Thinks You For Accepting",
            icon: "success",
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-600">
        Parcels pending pickup: {parcels?.length}
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>confrim</th>
                <th>Others Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, i) => (
                <tr key={parcel._id}>
                  <th>{i + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td className="flex items-center gap-2">
                    {parcel.deliveryStatus === "driver_assigned" ? (
                      <>
                        <button
                          onClick={() =>
                            handleStatusUpdate(parcel, "rider_arriving")
                          }
                          className="btn btn-primary text-black"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(parcel, "rejected")}
                          className="text-black bg-red-500 btn"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span
                        className={`${
                          parcel.deliveryStatus === "rejected"
                            ? "text-red-500"
                            : "text-green-500"
                        } font-semibold`}
                      >
                        {parcel.deliveryStatus === "rejected"
                          ? "Rejected"
                          : parcel.deliveryStatus}
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleStatusUpdate(parcel, "parcel_picked_up")
                      }
                      className="btn btn-primary text-black"
                    >
                      Mark as picked up
                    </button>{" "}
                    <button
                      onClick={() =>
                        handleStatusUpdate(parcel, "parcel_delivered")
                      }
                      className="btn btn-primary text-black"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignedDelivery;
