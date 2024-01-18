
import Lottie from "lottie-react";
import Animation from "../../../public/Animation - 1704964655302.json";
import MainDashboard from "./MainDashboard";

const Dashboard = () => {

  return (
    <div className="flex">
      <MainDashboard></MainDashboard>

      <div className="ml-3">
        {/* Your existing drawer content */}
        <Lottie
          animationData={Animation}
          loop={true}
          className="w-[1300px] h-auto pl-14"
        />
      </div>
    </div>
  );
};

export default Dashboard;
