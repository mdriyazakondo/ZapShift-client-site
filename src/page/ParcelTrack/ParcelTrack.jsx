import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosPublic from "../../hook/useAxiosPublic";

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosPublic = useAxiosPublic();
  const { data: trackings = [] } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trackings/${trackingId}/logs`);
      return res.data.result;
    },
  });
  console.log(trackings);
  return (
    <div className="my-12">
      <h3>Track Your Pakage: {trackings.length}</h3>
      <div>
        <ul className="timeline timeline-vertical">
          {trackings.map((track) => (
            <li key={track._id}>
              <div className="timeline-start">
                {new Date(track.createAt).toLocaleString()}
              </div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box">
                <span className="text-xl font-semibold text-gray-600">
                  {track.details.split("_").join(" ")}
                </span>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ParcelTrack;
