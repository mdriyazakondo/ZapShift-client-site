import React from "react";
import Banner from "../Banner/Banner";
import HowItsWord from "../HowItsWord/HowItsWord";
import OurService from "../OurSevice/OurService";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";
import DeliveryFeatures from "../DeliveryFeatures/DeliveryFeatures";
import ZapShiftBanner from "../ZapShiftBanner/ZapShiftBanner";

const reviewsPromise = fetch("/data/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItsWord />
      <OurService />
      <Brands />
      <DeliveryFeatures />
      <ZapShiftBanner />
      <Reviews reviewsPromise={reviewsPromise} />
    </div>
  );
};

export default Home;
