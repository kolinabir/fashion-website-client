import { Helmet } from "react-helmet-async";
import ShowService from "../ShowService/ShowService";
import Banner from "./Banner/Banner";
import Sponsor from "./Sponsor/Sponsor";
import MobileApp from "../MobileApp/MobileApp";
import SuggestionSection from "../SuggestionSection/SuggestionSection";
import Category from "./Category/Category";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>FASHION | Home</title>
      </Helmet>
      <Category></Category>
      <Banner />
      <Sponsor></Sponsor>
      <ShowService />
      <MobileApp/>
      <SuggestionSection/>
    </div>
  );
};

export default Home;
