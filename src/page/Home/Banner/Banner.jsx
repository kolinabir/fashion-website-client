import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="lg:mx-36">
      <div>
        <h1 className="text-center font-semibold mt-4 mb-5">
          Shop by Category
        </h1>
        <div className=" grid grid-cols-2  gap-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 lg:gap-4 justify-center">
          <Link className="">
            <img
              className="picture-btn"
              src="https://d2m144zuam4eta.cloudfront.net/wp-content/uploads/2023/10/Untitled-2.webp"
              alt=""
            />
          </Link>
          <Link className="">
            <img
              className="picture-btn"
              src="https://d2m144zuam4eta.cloudfront.net/wp-content/uploads/2023/10/Untitled-2.webp"
              alt=""
            />
          </Link>
          <Link className="">
            <img
              className="picture-btn"
              src="https://d2m144zuam4eta.cloudfront.net/wp-content/uploads/2023/10/Untitled-2.webp"
              alt=""
            />
          </Link>
          <Link className="">
            <img
              className="picture-btn"
              src="https://d2m144zuam4eta.cloudfront.net/wp-content/uploads/2023/10/Untitled-2.webp"
              alt=""
            />
          </Link>
          <Link className="">
            <img
              className="picture-btn"
              src="https://d2m144zuam4eta.cloudfront.net/wp-content/uploads/2023/10/Untitled-2.webp"
              alt=""
            />
          </Link>
          <Link className="">
            <img
              className="picture-btn"
              src="https://d2m144zuam4eta.cloudfront.net/wp-content/uploads/2023/10/Untitled-2.webp"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
