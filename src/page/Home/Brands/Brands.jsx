import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Brands = () => {
  return (
    <div className="mb-12">
      <Swiper
        loop={true}
        slidesPerView={5}
        centeredSlides={true}
        spaceBetween={10}
        grabCursor={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img src="/assets/brands/casio.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/brands/amazon.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/brands/moonstar.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/brands/star.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/brands/start_people.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/brands/randstad.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Brands;
