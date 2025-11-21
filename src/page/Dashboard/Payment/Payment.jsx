import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hook/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    enabled: !!parcelId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data.result;
    },
  });
  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      parcelName: parcel?.parcelName,
      senderEmail: parcel.senderEmail,
    };
    const res = await axiosSecure.post(
      "/stripe-checkout-sessions",
      paymentInfo
    );
    console.log(res.data.url);
    window.location.href = res.data.url;
  };
  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="text-xl font-bold">Payment Page</h2>
      <p>Parcel Name: {parcel?.parcelName}</p>
      <p>Weight: {parcel?.parcelWeight}</p>
      <p>Receiver: {parcel?.receiverName}</p>
      <p>Cost: ${parcel.cost}</p>
      <p>Sender Email {parcel.senderEmail}</p>
      <button
        onClick={handlePayment}
        className="btn btn-primary text-black font-semibold mt-3"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
