import React from "react";
import useAxiosSecure from "../../../hook/useAxios";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";

const ComplitedDelivery = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel_delivered`
      );
      return res.data.result;
    },
  });

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };
  console.log(parcels);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Pickup District</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>CreatedAt</th>
              <th>Tracking Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((parcel, index) => {
              return (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.senderDistrict}</td>
                  <td>${parcel.cost}</td>
                  <td>${calculatePayout(parcel)}</td>
                  <td>{parcel.createAt}</td>
                  <td>{parcel.trackingId}</td>
                  <td>
                    <button className="btn btn-primary text-black">
                      Cash Out
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplitedDelivery;
