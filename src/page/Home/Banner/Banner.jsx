import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div>
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div>
          <img src="/assets/banner/banner1.png" alt="" />
        </div>
        <div>
          <img src="/assets/banner/banner2.png" alt="" />
        </div>
        <div>
          <img src="/assets/banner/banner3.png" alt="" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
