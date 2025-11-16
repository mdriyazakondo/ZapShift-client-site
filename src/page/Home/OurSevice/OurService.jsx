import { useEffect, useState } from "react";

const OurService = () => {
  const [servicesData, setServiceData] = useState([]);

  useEffect(() => {
    fetch("/public/data/services.json")
      .then((res) => res.json())
      .then((data) => setServiceData(data));
  }, []);

  return (
    <div className="bg-secondary p-6 md:p-12  lg:p-24 my-12 rounded-xl">
      <div className="text-white text-center pb-5 space-y-1">
        <h4 className="text-2xl font-bold">Our Services</h4>
        <p className="text-sm">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br className="hidden md:block" />{" "}
          business shipments — we deliver on time, every time.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="text-gray-800 bg-white p-6 rounded-xl text-center flex flex-col items-center justify-center space-y-2 hover:bg-primary transition-all duration-300"
          >
            <img src={service.icon} alt={service.title} />
            <h4 className="text-xl font-bold">{service.title}</h4>
            <p className="font-semibold">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurService;
