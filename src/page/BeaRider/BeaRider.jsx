import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxios";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const BeaRider = () => {
  const { handleSubmit, register, control } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const regionDuplicate = serviceCenters.map((c) => c.region);
  const serviceCenter = [...new Set(regionDuplicate)];
  const region = useWatch({ control, name: "region" });
  const districtsByRegion = (region) => {
    if (!region) return [];
    const regionsDistricts = serviceCenters.filter((c) => c.region === region);
    return regionsDistricts.map((d) => d.district);
  };

  const handleBaRider = (data) => {
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.result.insertedId) {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title:
            "Your application has been submited. We will reach to you in 30 days!",
          showCancelButton: false,
          timer: 2000,
        });
      }
    });
  };
  return (
    <div className="min-h-screen   flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow my-5">
      <div className="w-full">
        <h3 className="text-start text-5xl font-semibold mb-2 text-gray-700">
          Be a Rider
        </h3>
        <p className="text-start text-gray-600 font-medium">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages <br className="hidden md:block" /> to
          business shipments — we deliver on time, every time.
        </p>
      </div>
      {/* <div className="border max-w-6xl mx-auto mb-12 mt-6  border-gray-400 w-full "></div> */}

      <div className=" w-full   pt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 border-t-2 mt-6 border-gray-400 ">
        {/* ------- FORM ------- */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Tell us about yourself</h2>

          <form onSubmit={handleSubmit(handleBaRider)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  {...register("name")}
                  defaultValue={user.displayName}
                  placeholder="Your Name"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Your Email</label>
                <input
                  type="email"
                  {...register("email")}
                  defaultValue={user.email}
                  placeholder="Your Email"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Driving License Number
                </label>
                <input
                  type="number"
                  {...register("age")}
                  placeholder="Your age"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Your Age</label>
                <input
                  type="number"
                  {...register("age")}
                  placeholder="Your age"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Your Region</label>
                <select
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                  {...register("region", { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Your Region
                  </option>
                  {serviceCenter.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Your District</label>

                <select
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                  {...register("district", { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Your a District
                  </option>
                  {districtsByRegion(region).map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">NID No</label>
                <input
                  type="text"
                  {...register("nid")}
                  placeholder="NID"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Phone Number"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Bike Brand Model and Year
                </label>
                <input
                  type="text"
                  {...register("bikeModel")}
                  placeholder="Bike Brand Model and Year"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Bike Registration Number
                </label>
                <input
                  type="text"
                  {...register("bikeRegistration")}
                  placeholder="Bike Registration Number"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Tell Us About Your Self
                </label>
                <input
                  type="text"
                  {...register("yourSelf")}
                  placeholder="Tell Us About Your Self"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Your Address</label>
                <input
                  type="text"
                  {...register("address")}
                  placeholder="Your Address"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-lime-400 py-3 rounded-lg font-semibold hover:bg-lime-500 transition-all shadow-md"
            >
              Applay as a Rider
            </button>
          </form>
        </div>

        {/* ------- IMAGE ------- */}
        <div className="flex justify-center items-center">
          <img
            src="/assets/agent-pending.png"
            alt="Agent Illustration"
            className="w-72 md:w-96 object-contain drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default BeaRider;
