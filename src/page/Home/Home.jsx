import { Helmet } from "react-helmet-async";
import ShowService from "../ShowProduct/ShowProduct";
import Category from "./Category/Category";
import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>AN NOOR | Home</title>
      </Helmet>
      {/* <Category></Category> */}
      <Banner />
      {/* <Sponsor></Sponsor> */}
      <ShowService />
      {/* <MobileApp/> */}
      {/* <SuggestionSection/> */}
    </div>
  );
};

export default Home;
