
import Lottie from "lottie-react";
import Animation from "../../../public/Animation - 1704964655302.json";
import MainDashboard from "./MainDashboard";

const Dashboard = () => {

  return (
    <div className="flex">
      <MainDashboard></MainDashboard>

      <div className="ml-3">
        <Lottie
          animationData={Animation}
          loop={true}
          className="lg:w-[1300px] h-auto md:pl-14"
        />
      </div>
    </div>
  );
};

export default Dashboard;
