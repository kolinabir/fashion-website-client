import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="mx-3 md:mx-20 lg:mx-36">
      <div>
        <h1 className="text-center text-2xl font-semibold mt-4 mb-5">
          Shop by Category
        </h1>
        <div className=" grid grid-cols-2  gap-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 lg:gap-4 justify-center">
          <Link className="">
            <img
              className="picture-btn w-full"
              src="https://i.ibb.co/bjtBSmq/photo-2024-02-14-21-01-37.jpg"
              alt=""
              loading="lazy"
            />
          </Link>
          <Link className="">
            <img
              className="picture-btn w-full h-full object-cover"
              src="
              https://i.ibb.co/yXsjpSv/photo-2024-02-14-20-59-37.jpg"
              alt=""
              loading="lazy"
            />
          </Link>
          <Link className="">
            <img
              className="picture-btn w-full h-full object-cover "
              src="
              https://i.ibb.co/BKFNgcT/photo-2024-02-14-20-59-36.jpg"
              alt=""
              loading="lazy"
            />
          </Link>
          <Link className="">
            <img
              className="picture-btn w-full  h-full object-cover"
              src="https://i.ibb.co/8YKd2kC/photo-2024-02-14-20-59-35.jpg"
              alt=""
              loading="lazy"
            />
          </Link>
          <Link className="">
            <img
              className="picture-btn"
              // src="https://d2m144zuam4eta.cloudfront.net/wp-content/uploads/2023/10/Untitled-2.webp"
              alt=""
            />
          </Link>
          <Link className="">
            <img
              className="picture-btn"
              // src="https://d2m144zuam4eta.cloudfront.net/wp-content/uploads/2023/10/Untitled-2.webp"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
