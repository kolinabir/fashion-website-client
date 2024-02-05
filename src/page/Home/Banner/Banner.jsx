import { Link } from "react-router-dom";
import { Typewriter, Cursor } from "react-simple-typewriter";

const Banner = () => {
  // const  {text}  = Typewriter({
  //   words: ["Unique", "Influential", "Trendy"],
  //   loop: {},
  // });

  return (
    <div className="md:max-w-full mt-6 md:px-7">
      <div className="md:w-full">
        <div className="flex item-center justify-center bg-[#F4F6F5] rounded-2xl md:max-w-[2000px] pt-20">
          <div className="flex items-center justify-center ">
            <div className="md:w-[736px] md:pl-12 space-y-4 mb-5">
              <h2 className="text-center md:text-left md:text-5xl text-3xl pl-3 font-black text-black mr-14  flex flex-col">
                <span className="p-4 bg-transparent md:bg-white">
                  আমরা বিশ্বাস, যত্ন,বিশুদ্ধতার গুণগত মান,বিষয়ে ন্যায্য
                </span>{" "}
                {/* আমরা বিশ্বাস, যত্ন, গুণগত মান, ন্যায্য মূল্য ও বিশুদ্ধতার বিষয়ে সর্বদাই নীতিবান। */}
                <span> </span>
                <span className="bg-[#EBD96B] px-2">
                  মূল্য ও সর্বদাই নীতিবান
                </span>{" "}
                <span></span>
              </h2>
              <div className=" text-center md:text-left">
                <span className="font-normal pl-3 md:text-3xl text-gray-900">
                  Live for Influential and{" "}
                  <span>
                    <Typewriter
                      words={["Unique", "Influential", "Trendy"]}
                      loop={Infinity}
                    />
                  </span>
                  <Cursor />
                </span>
              </div>
              <div className="flex items-center mt-4 gap-7">
                <div className="hidden md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="190"
                    height="32"
                    viewBox="0 0 190 32"
                    fill="none"
                  >
                    <path
                      d="M0 30.6152C48 -11.7848 146.667 -1.05149 190 9.61518C176.4 33.6152 57.6667 33.6152 0 30.6152Z"
                      fill="#EBD96B"
                    />
                  </svg>
                </div>
                <div className="flex justify-center mx-auto md:mx-0">
                  <div className="">
                    <Link className="" to="/products">
                      <button className="btn btn-neutral  md:btn-lg ">
                        SHOP NOW
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              className="md:w-[736px] md:h-[550px] hidden md:block "
              src="https://i.ibb.co/xhypVgz/incendiary-fantastically-beautiful-girl-coat-eco-fur-moves-fun-picture-lovely-lady-pink-clothes-remo.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
