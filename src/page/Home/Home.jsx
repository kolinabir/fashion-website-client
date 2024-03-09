import { Helmet } from "react-helmet-async";
import ShowService from "../ShowProduct/ShowProduct";
import Banner from "./Banner/Banner";
import BannerWithSwiper from "./Banner/BannerWithSwiper";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>AN NOOR | Home</title>
      </Helmet>
      <BannerWithSwiper />
      <Banner />
      <ShowService />
    </div>
  );
};

export default Home;
