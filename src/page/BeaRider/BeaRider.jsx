import React from "react";

const BeaRider = () => {
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
          <h2 className="text-2xl font-bold mb-6">
            Tell us about yourself
          </h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Your Age</label>
                <input
                  type="number"
                  placeholder="Your age"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Your Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Your Region</label>
                <select className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none">
                  <option>Select your region</option>
                  <option>North</option>
                  <option>South</option>
                  <option>East</option>
                  <option>West</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">NID No</label>
                <input
                  type="text"
                  placeholder="NID"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Contact</label>
                <input
                  type="text"
                  placeholder="Contact"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Which wire-house you want to work?
              </label>
              <select className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none">
                <option>Select wire-house</option>
                <option>Wire-house A</option>
                <option>Wire-house B</option>
                <option>Wire-house C</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 py-3 rounded-lg font-semibold hover:bg-lime-500 transition-all shadow-md"
            >
              Submit
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
