import React from "react";
import { Link } from "react-router";

const PaymentCencel = () => {
  return (
    <div>
      <div className="text-2xl font-semibold">PaymentCencel</div>
      <Link to="/dashboard/my-parcel">
        <button className="btn btn-primary text-gray-700 font-semibold mt-3">
          Try Agin
        </button>
      </Link>
    </div>
  );
};

export default PaymentCencel;
