import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const riderModelRef = useRef();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data.result;
    },
  });

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`
      );
      return res.data.result;
    },
  });

  const openAssignModelRider = (parcel) => {
    setSelectedParcel(parcel);
    riderModelRef.current.showModal();
  };
  const handleAssignRider = (riders) => {
    const ridersAssignInfo = {
      riderId: riders._id,
      riderNmae: riders.name,
      riderEmail: riders.email,
      parcelId: selectedParcel._id,
    };

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, ridersAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          riderModelRef.current.close();
          refetch();
          Swal.fire({
            icon: "success",
            title: `Rider has been assigned!`,
            showCancelButton: false,
            timer: 2000,
          });
        }
      });
  };
  return (
    <div>
      AssignRiders: {parcels?.length || 0}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Cost</th>
                <th>CreatedAt</th>
                <th>Tracking Id</th>
                <th>Pickup District</th>
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
                    <td>${parcel.cost}</td>
                    <td>{parcel.createAt}</td>
                    <td>{parcel.trackingId}</td>
                    <td>{parcel.senderDistrict}</td>
                    <td>
                      <button
                        onClick={() => openAssignModelRider(parcel)}
                        className="btn btn-primary text-black"
                      >
                        Find Riders
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <dialog
          ref={riderModelRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Riders: {riders.length}!</h3>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider, i) => (
                    <tr key={rider._id}>
                      <th className="text-nowrap">{i + 1}</th>
                      <td className="text-nowrap">{rider.name}</td>
                      <td className="text-nowrap">{rider.email}</td>
                      <td>
                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="btn btn-primary text-black"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AssignRiders;
