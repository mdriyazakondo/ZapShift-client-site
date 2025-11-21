import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxios";
import useAuth from "../../hook/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const serviceCenters = useLoaderData();
  const regionDuplicate = serviceCenters.map((c) => c.region);
  const serviceCenter = [...new Set(regionDuplicate)];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    if (!region) return [];
    const regionsDistricts = serviceCenters.filter((c) => c.region === region);
    return regionsDistricts.map((d) => d.district);
  };

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const parcelWeight = parseFloat(data.parcelWeight);
    const isSamedistrict = data.senderRegion === data.receiverRegion;
    let cost = 0;
    if (isDocument) {
      cost = isSamedistrict ? 40 : 60;
    } else {
      if (parcelWeight < 3) {
        cost = isSamedistrict ? 110 : 150;
      } else {
        const minCharge = isSamedistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSamedistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    data.cost = cost;
    Swal.fire({
      title: "Agre with the cost?",
      text: `You well be charge ${cost} Taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, take it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((result) => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div className="my-8 max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <div className="pb-6 border-b border-gray-300">
        <h2 className="text-4xl font-bold text-gray-800">Send A Parcel</h2>
        <p className="text-gray-600 font-medium mt-3">
          Enter Your Parcel Details
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-8 space-y-8 w-full text-gray-700"
      >
        {/* Parcel Type */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 font-semibold text-gray-700 cursor-pointer">
            <input
              type="radio"
              {...register("parcelType", { required: true })}
              value="document"
              className="radio border-gray-400"
              defaultChecked
            />
            Document
          </label>

          <label className="flex items-center gap-2 font-semibold text-gray-700 cursor-pointer">
            <input
              type="radio"
              {...register("parcelType", { required: true })}
              value="not-document"
              className="radio border-gray-400"
            />
            Not Document
          </label>
        </div>

        {/* Parcel Name & Weight */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-gray-300 w-full">
          <div className="w-full">
            <label className="font-semibold text-gray-700">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName", { required: true })}
              className="border border-gray-300 rounded-lg mt-2 py-2 pl-4 outline-none w-full focus:ring-2 focus:ring-primary"
              placeholder="Parcel Name"
            />
          </div>

          <div className="w-full">
            <label className="font-semibold text-gray-700">Parcel Weight</label>
            <input
              type="number"
              {...register("parcelWeight", { required: true })}
              className="border border-gray-300 rounded-lg mt-2 py-2 pl-4 outline-none w-full focus:ring-2 focus:ring-primary"
              placeholder="Parcel Weight (kg)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Sender Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Sender Details
            </h2>

            <div className="w-full">
              <label className="font-semibold text-gray-700">Sender Name</label>
              <input
                defaultValue={user?.displayName}
                type="text"
                {...register("senderName", { required: true })}
                className="border border-gray-300 rounded-lg mt-2 py-2 pl-4 outline-none w-full focus:ring-2 focus:ring-primary"
                placeholder="Sender Name"
              />
            </div>

            <div className="w-full">
              <label className="font-semibold text-gray-700">
                Sender Email
              </label>
              <input
                defaultValue={user?.email}
                type="email"
                {...register("senderEmail", { required: true })}
                className="border border-gray-300 rounded-lg mt-2 py-2 pl-4 outline-none w-full focus:ring-2 focus:ring-primary"
                placeholder="Sender Email"
              />
            </div>

            <div className="flex items-center gap-5">
              <fieldset className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-gray-700">
                  Sender Region
                </label>
                <select
                  className="border border-gray-300 rounded-lg py-2 px-4 bg-white text-gray-700 focus:ring-2 focus:ring-primary outline-none"
                  {...register("senderRegion", { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pick a Region
                  </option>
                  {serviceCenter.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>

              <fieldset className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-gray-700">
                  Sender District
                </label>
                <select
                  className="border border-gray-300 rounded-lg py-2 px-4 bg-white text-gray-700 focus:ring-2 focus:ring-primary outline-none"
                  {...register("senderDistrict", { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pick a District
                  </option>
                  {districtsByRegion(senderRegion).map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </fieldset>
            </div>

            <div className="w-full">
              <label className="font-semibold text-gray-700">
                Sender Address
              </label>
              <input
                type="text"
                {...register("senderAddress", { required: true })}
                className="border border-gray-300 rounded-lg mt-2 py-2 pl-4 outline-none w-full focus:ring-2 focus:ring-primary"
                placeholder="Sender Address"
              />
            </div>

            <div className="w-full">
              <label className="font-semibold text-gray-700">
                Sender Phone
              </label>
              <input
                type="number"
                {...register("senderPhone", { required: true })}
                className="border border-gray-300 rounded-lg mt-2 py-2 pl-4 outline-none w-full focus:ring-2 focus:ring-primary"
                placeholder="Sender Phone"
              />
            </div>

            <div className="w-full">
              <label className="font-semibold text-gray-700">
                Pickup Instruction
              </label>
              <input
                type="text"
                {...register("pickupInstruction", { required: true })}
                className="border border-gray-300 rounded-lg mt-2 py-2 pl-4 outline-none w-full focus:ring-2 focus:ring-primary"
                placeholder="Pickup Instruction"
              />
            </div>
          </div>

          {/* Receiver Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Receiver Details
            </h2>

            <div className="w-full">
              <label className="font-semibold text-gray-700">
                Receiver Name
              </label>
              <input
                type="text"
                {...register("receiverName", { required: true })}
                className="border border-gray-300 rounded-lg mt-2 py-2 pl-4 outline-none w-full focus:ring-2 focus:ring-primary"
                placeholder="Receiver Name"
              />
            </div>

            <div className="w-full">
              <label className="font-semibold text-gray-700">
                Receiver Email
              </label>
              <input
                type="email"
                {...register("receiverEmail", { required: true })}
                className="border border-gray-300 rounded-lg mt-2 py-2 pl-4 outline-none w-full focus:ring-2 focus:ring-primary"
                placeholder="Receiver Email"
              />
            </div>

            <div className="flex items-center gap-5">
              <fieldset className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-gray-700">
                  Receiver Region
                </label>
                <select
                  className="border border-gray-300 rounded-lg py-2 px-4 bg-white text-gray-700 focus:ring-2 focus:ring-primary outline-none"
                  {...register("receiverRegion", { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pick a Region
                  </option>
                  {serviceCenter.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>

              <fieldset className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-gray-700">
                  Receiver District
                </label>
                <select
                  className="border border-gray-300 rounded-lg py-2 px-4 bg-white text-gray-700 focus:ring-2 focus:ring-primary outline-none"
                  {...register("receiverDistrict", { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pick a District
                  </option>
                  {districtsByRegion(receiverRegion).map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </fieldset>
            </div>

            <div className="w-full">
              <label className="font-semibold text-gray-700">
                Receiver Address
              </label>
              <input
                type="text"
                {...register("receiverAddress", { required: true })}
                className="border border-gray-300 rounded-lg mt-2 py-2 pl-4 outline-none w-full focus:ring-2 focus:ring-primary"
                placeholder="Receiver Address"
              />
            </div>

            <div className="w-full">
              <label className="font-semibold text-gray-700">
                Receiver Contact No
              </label>
              <input
                type="number"
                {...register("receiverContactNo", { required: true })}
                className="border border-gray-300 rounded-lg mt-2 py-2 pl-4 outline-none w-full focus:ring-2 focus:ring-primary"
                placeholder="Receiver Contact No"
              />
            </div>

            <div className="w-full">
              <label className="font-semibold text-gray-700">
                Delivery Instruction
              </label>
              <input
                type="text"
                {...register("deliveryInstruction", { required: true })}
                className="border border-gray-300 rounded-lg mt-2 py-2 pl-4 outline-none w-full focus:ring-2 focus:ring-primary"
                placeholder="Delivery Instruction"
              />
            </div>
          </div>
        </div>

        <input
          type="submit"
          className="btn btn-primary text-gray-800 w-full font-semibold py-3 rounded-xl bg-primary duration-200"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
