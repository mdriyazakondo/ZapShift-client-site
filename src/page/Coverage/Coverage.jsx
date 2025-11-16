import React, { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { FiSearch } from "react-icons/fi";

const Coverage = () => {
  const serviceConters = useLoaderData();
  const mapRef = useRef(null);
  const position = [23.685, 90.3563];
  const handleLiveSearch = (value) => {
    const location = value.trim().toLowerCase();
    if (!location) return;

    const district = serviceConters.find((loca) =>
      loca.district.toLowerCase().includes(location)
    );

    if (district) {
      const cood = [district.latitude, district.longitude];
      mapRef.current.flyTo(cood, 12);
    }
  };

  return (
    <div className="my-6 mb-12">
      <h2 className="text-4xl font-bold text-gray-800">
        We are available in 64 districts
      </h2>
      <form
        className={`w-1/3 mt-4 flex items-center gap-2 `}
        role="search"
        aria-label="Site search"
      >
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FiSearch className="w-5 h-5 text-slate-400" aria-hidden="true" />
          </span>

          <input
            type="search"
            name="search"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
            aria-label="Search"
            onChange={(e) => handleLiveSearch(e.target.value)}
          />
        </div>
      </form>
      <div className="h-[800px] border border-gray-400 rounded-sm mt-12">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[800px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceConters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br /> Service area:
                {center.covered_area.join(", ")}.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
