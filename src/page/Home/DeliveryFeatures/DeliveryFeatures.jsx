import React from "react";
import { FiTruck, FiShield, FiPhone } from "react-icons/fi";

// DeliveryFeatures.jsx
// A responsive features/services section built with Tailwind CSS and react-icons.
// Usage: import DeliveryFeatures from './DeliveryFeatures'; then <DeliveryFeatures /> in your app.

export default function DeliveryFeatures() {
  const features = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
      icon: <FiTruck className="w-8 h-8" aria-hidden="true" />,
      image: "/assets/live-tracking.png",
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      icon: <FiShield className="w-8 h-8" aria-hidden="true" />,
      image: "/assets/safe-delivery.png",
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      icon: <FiPhone className="w-8 h-8" aria-hidden="true" />,
      image: "/assets/call-service.png",
    },
  ];

  return (
    <section className=" py-12 mb-12 border-t border-b border-dashed  border-gray-600">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-6">
          {features.map((f, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 border border-transparent"
            >
              {/* Icon block */}
              <div className="border-none md:border-r pr-6 md:border-dashed  border-gray-600">
                <div className=" w-24 h-24 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                  <img className="object-cover" src={f.image} alt="" />
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1">
                <h3 className="text-lg md:text-xl text-center md:text-start font-semibold text-slate-800">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 mt-2">{f.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
