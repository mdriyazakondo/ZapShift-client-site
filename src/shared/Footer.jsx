import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-black text-white py-32">
      <div className="h-[70px]  w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-center flex-col space-y-4 z-30  transition-all my-20">
        <div className="relative flex">
          <img src="/assets/logo.png" alt="" />
          <p className="absolute left-4 bottom-0 text-3xl font-bold">
            ZapShift
          </p>
        </div>
        <p className="text-center">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br className="hidden md:block" />{" "}
          business shipments — we deliver on time, every time.
        </p>
        <div className="mt-8 border-t-2 border-b-2 border-dashed border-[#caeb6648]  py-6 flex items-center justify-center w-full gap-6 list-none">
          <Link to={'/'} className="text-sm text-gray-400">Home</Link>
          <Link to={'/'} className="text-sm text-gray-400">Coverage</Link>
          <Link to={'/'} className="text-sm text-gray-400">About Us</Link>
          <Link to={'/'} className="text-sm text-gray-400">Pricing</Link>
          <Link to={'/'} className="text-sm text-gray-400">Blog</Link>
          <Link to={'/'} className="text-sm text-gray-400">Contact</Link>
        </div>
        <div className=" py-6 flex items-center justify-center w-full gap-6">
          <FaLinkedinIn className="w-8 h-8 p-2 rounded-full bg-[#1781b9]" />
          <FaXTwitter className="w-8 h-8 p-2 rounded-full bg-white text-black" />
          <FaFacebookF className="w-8 h-8 p-2 rounded-full bg-blue-500" />
          <FaYoutube className="w-8 h-8 p-2 rounded-full bg-red-500" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
