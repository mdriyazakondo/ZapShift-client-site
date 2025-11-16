import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { user_photoURL, userName, review: reviews, user_email } = review;
  console.log(review);
  return (
    <div className="max-w-sm bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-teal-300 text-3xl" />

      {/* Text */}
      <p className="text-gray-600 text-sm mt-4 leading-relaxed">
        {reviews} back, and spine, encouraging you to maintain proper posture
        throughout the day.
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-4"></div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div>
          <img className="w-10 h-10 rounded-full" src={user_photoURL} alt="" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{userName}</h3>
          <p className="text-sm text-gray-500">{user_email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
