import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ZapShiftBanner() {
  return (
    <div className="w-full bg-[#00353C] rounded-3xl px-4 md:px-8 lg:px-12 py-16 text-white flex flex-col md:flex-row justify-center items-center gap-10 mb-12">
      <div className="max-w-xl space-y-5">
        <h1 className="text-3xl md:text-[32px] font-bold leading-snug">
          Merchant and Customer Satisfaction <br /> is Our First Priority
        </h1>
        <p className="text-sm text-gray-300 leading-relaxed">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="flex flex-wrap gap-4 pt-3">
          <button className="bg-[#C7FF72] text-[#00353C] font-semibold px-6 py-3 rounded-full shadow hover:opacity-90 cursor-pointer">
            Become a Merchant
          </button>
          <button className="border border-[#C7FF72] text-[#C7FF72] px-6 py-3 rounded-full hover:bg-[#C7FF72] hover:text-[#00353C] font-semibold transition cursor-pointer">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>

      {/* Right Section (Box Illustration) */}
      <div className="relative flex items-center justify-center w-full md:w-auto">
        <div className="text-[#4CE0AB] opacity-80">
          <img src="/assets/location-merchant.png" alt="" />
        </div>
      </div>
    </div>
  );
}
