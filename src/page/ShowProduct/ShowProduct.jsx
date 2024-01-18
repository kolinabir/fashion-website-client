import { Link, useLoaderData } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import Rating from "react-rating-stars-component";

const ShowProduct = () => {
  const product = useLoaderData();
  // console.log(product.data.length);

  return (
    <div>
      <Helmet>
        <title>FASHION | HOME</title>
      </Helmet>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-semibold mb-4">NEW ARRIVALS</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {product.data.slice(0, 12).map((productDetail, index) => (
            <div
              key={index}
              className={`bg-white p-4 rounded-lg shadow-md col-span-1 ${
                index >= 15 ? "hidden" : ""
              }`}
            >
              <div className="">
                <div className="">
                  <img
                    src={productDetail?.image}
                    alt={productDetail?.yourName}
                    className="w-full h-[200px] sm:h-[250px] object-cover rounded-md" // Adjusted height
                  />
                  <h3 className="text-base text-deep-orange-900 font-normal mt-2 flex justify-center">
                    {productDetail?.title}
                  </h3>

                  <div className="flex justify-center">
                    <Rating
                      value={productDetail?.averageRating}
                      count={5}
                      size={24}
                      activeColor="#ffd700"
                      edit={false}
                    />
                  </div>

                  <h3 className="text-sm font-medium mx-3 flex justify-center text-green-500">
                    ৳ {productDetail?.price}
                  </h3>
                  <div className="flex justify-center  mt-4 mb-3 mx-1 gap-3">
                    {/* <img
                      className="h-7 w-7 rounded-full"
                      src={productDetail?.authorPhoto}
                      alt=""
                    /> */}
                    <h2 className="text-xs  text-black">
                      {productDetail?.companyName}
                    </h2>
                  </div>
                </div>

                <div>
                  <Link
                    to={`/showProduct/${productDetail?._id}`}
                    className=" text-center md:py-2 flex justify-center items-center rounded-md  bg-blue-400 text-white hover:bg-indigo-700"
                  >
                    <h1 className="text-sm md:text-xs  md:font-semibold ">
                      Show details
                    </h1>
                    <FaArrowRightLong className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {product?.data.length > 5 ? (
          <div className="flex justify-center mt-10">
            <Link to="/Products" className="btn">
              Show All SERVICES
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShowProduct;
