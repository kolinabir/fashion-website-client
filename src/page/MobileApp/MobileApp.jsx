import Animation from "../../Animation.json";
import Lottie from "lottie-react";

const MobileApp = () => {
  return (
    <div className="container flex justify-center items-center mx-auto my-10">
      <div className="">
        <div className="w-1/2 space-y-9">
          <h2 className="text-5xl font-black">
            DOWNLOAD APP & GET THE VOUCHER!
          </h2>
          <p className="text-[#7C7C7C] font-medium text-2xl">
            Get 30% off for first transaction using Rondovision mobile app for
            now.
          </p>
        </div>
        <div className="flex mt-8 gap-5">
          <img
            src="https://i.ibb.co/whD3zxv/Rectangle-18.png
"
            alt=""
          />
          <img src="https://i.ibb.co/LNg8qWM/Rectangle-55.png" alt="" />
        </div>
      </div>

      <div className="container">
        <Lottie
          animationData={Animation}
          loop={true}
          className="w-full h-auto pl-14"
        />
      </div>
    </div>
  );
};

export default MobileApp;
