import { Helmet } from "react-helmet-async";
import ShowService from "../ShowProduct/ShowProduct";
import Banner from "./Banner/Banner";
import BannerWithSwiper from "./Banner/BannerWithSwiper";
import React from "react";
import { DotLoader } from "react-spinners";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>AN NOOR | Home</title>
      </Helmet>
      <BannerWithSwiper />
      <Banner />
      <React.Suspense fallback={<div className="flex items-center justify-center h-screen">
            <DotLoader color="#36d7b7" />{" "}
          </div>}>
        <ShowService />
      </React.Suspense>
    </div>
  );
};

export default Home;
