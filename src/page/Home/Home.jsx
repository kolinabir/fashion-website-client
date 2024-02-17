import { Helmet } from "react-helmet-async";
import ShowService from "../ShowProduct/ShowProduct";
import Category from "./Category/Category";
import Banner from "./Banner/Banner";
import BannerWithSwiper from "./Banner/BannerWithSwiper";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>AN NOOR | Home</title>
      </Helmet>
      {/* <Category></Category> */}
      <BannerWithSwiper />
      <Banner />
      {/* <Sponsor></Sponsor> */}
      <ShowService />
      {/* <MobileApp/> */}
      {/* <SuggestionSection/> */}
    </div>
  );
};

export default Home;
