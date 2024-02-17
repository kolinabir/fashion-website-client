import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

const BannerWithSwiper = () => {
  return (
    <>
      <div
        className="mx-3 md:mx-20 lg:mx-36 md:my-10 my-4
      "
      >
        <div className="grid grid-cols-1  md:grid-cols-12 gap-10">
          <div className="md:col-span-8 ">
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              modules={[Pagination, Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  className="w-full rounded-sm md:h-[60vh] object-cover  transition duration-1000 ease-in-out transform hover:scale-105"
                  src="https://i.ibb.co/WxXCqmJ/image.png"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-full rounded-sm md:h-[60vh] object-cover  transition duration-1000 ease-in-out transform hover:scale-105"
                  src="https://i.ibb.co/WxXCqmJ/image.png"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-full rounded-sm md:h-[60vh] object-cover  transition duration-1000 ease-in-out transform hover:scale-105"
                  src="https://i.ibb.co/WxXCqmJ/image.png"
                  alt=""
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="md:col-span-4 bg-red-300 rounded-sm">
            {/* Need to  add */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerWithSwiper;
