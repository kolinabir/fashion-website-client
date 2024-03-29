import { Link } from "react-router-dom";
// import { FaArrowRightLong } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
// import Rating from "react-rating-stars-component";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../api/api";
import { DotLoader } from "react-spinners";
import SingleProductCard from "./ShowSingleProduct";

const ShowProduct = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
    select: (data) => {
      return data.data;
    },
  });
  return (
    <div className="mx-3 md:mx-20 lg:mx-36">
      <Helmet>
        <title>AN NOOR | HOME</title>
      </Helmet>
      <div className="py-6">
        <h1 className="text-2xl font-semibold mb-4">NEW ARRIVALS</h1>
        {isLoading && (
          <div className="mx-auto h-[500px]">
            <div className="flex items-center justify-center ">
              <div className="flex flex-col items-center">
                <div>
                  <DotLoader color="#36d7b7" />
                </div>
                {/* <p className="mt-4 text-gray-700">Loading...</p> */}
              </div>
            </div>
          </div>
        )}
        {products && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6   gap-4">
            {products?.data?.products
              ?.slice(0, 12)
              .map((productDetail, index) => (
                <SingleProductCard key={index} productDetail={productDetail} />
              ))}
          </div>
        )}

        {/* {products?.data.length > 0 && ( */}
        <div className="flex justify-center mt-10">
          <Link
            to="/Products"
            className="bg-[#349234] text-white px-3 py-1.5 rounded-md  font-semibold  transition duration-300 ease-in-out"
          >
            Show All Products
          </Link>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default ShowProduct;
