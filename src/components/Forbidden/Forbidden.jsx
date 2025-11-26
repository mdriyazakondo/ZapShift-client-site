import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { Link } from "react-router";

const Forbidden = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/data/forbidden.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (!animationData) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: animationData,
        }}
        height={200}
        width={200}
      />

      <h1 className="text-3xl font-bold text-red-500">
        You Are Forbidden to Access This Page
      </h1>

      <div className="my-3 space-x-3">
        <Link to="/" className="btn btn-primary text-black">
          Go to Home
        </Link>
        <Link className="btn btn-secondary" to="/dashboard">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
