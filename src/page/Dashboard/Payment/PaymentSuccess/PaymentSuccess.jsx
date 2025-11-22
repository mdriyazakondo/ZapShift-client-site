import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../hook/useAxios";
import { useState } from "react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const axiosSeure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSeure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            trackingId: res.data.trackingId,
            transictionId: res.data.transictionId,
          });
        });
    }
  }, [sessionId, axiosSeure]);
  return (
    <div>
      <div className="text-2xl font-semibold">PaymentSuccess</div>
      <p> transictionId: {paymentInfo.transictionId}</p>
      <p> trackingId: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
