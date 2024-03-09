import { Helmet } from "react-helmet-async";
import ShowService from "../ShowProduct/ShowProduct";
import Banner from "./Banner/Banner";
import BannerWithSwiper from "./Banner/BannerWithSwiper";
import React from "react";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>AN NOOR | Home</title>
      </Helmet>
      <BannerWithSwiper />
      <Banner />
      <React.Suspense fallback={<div>Loading...</div>}>
        <ShowService />
      </React.Suspense>
    </div>
  );
};

export default Home;
