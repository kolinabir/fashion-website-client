import { Link, useLoaderData } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import Rating from "react-rating-stars-component";
import { useEffect, useMemo, useState } from "react";

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://mern-ecom-backend-henna.vercel.app/api/product",
      { priority: "low" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const ShowProduct = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchData().then((data) => setProduct(data));
  }, []);
  const memoizedProduct = useMemo(() => product, [product]);
  return (
    <div className="mx-3 md:mx-20 lg:mx-36">
      <Helmet>
        <title>AN NOOR | HOME</title>
      </Helmet>
      <div className=" py-6">
        <h1 className="text-2xl font-semibold mb-4">NEW ARRIVALS</h1>
        {memoizedProduct && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6   gap-4">
              {memoizedProduct?.data?.products
                ?.slice(0, 12)
                .map((productDetail, index) => (
                  <div
                    key={index}
                    className={`bg-white p-4 !h-[450px] rounded-lg shadow-md col-span-1 relative overflow-hidden ${
                      index >= 15 ? "hidden" : ""
                    }`}
                    style={{
                      height: "400px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="group flex-grow">
                      <div className="relative overflow-hidden aspect-w-1 aspect-h-1 group-hover:scale-105 transition-transform">
                        <Link to={`/showProduct/${productDetail?._id}`}>
                          <img
                            src={productDetail?.image}
                            alt={productDetail?.yourName}
                            className="w-full h-[200px] sm:h-[250px] object-cover rounded-md"
                          />
                        </Link>
                      </div>
                      <Link
                        to={`/showProduct/${productDetail?._id}`}
                        className="text-base text-deep-orange-900 font-semibold 
                    hover:text-deep-orange-700 transition duration-300 ease-in-out
                  mt-2 flex justify-center overflow-hidden"
                        style={{ height: "50px" }}
                      >
                        {productDetail?.title}
                      </Link>

                      <div className="flex justify-center">
                        <Rating
                          value={productDetail?.averageRating}
                          count={5}
                          size={24}
                          activeColor="#ffd700"
                          edit={false}
                        />
                      </div>

                      <div className="flex justify-center mb-2">
                        <h3 className="text-sm font-medium mx-3 text-green-500">
                          ৳ {productDetail?.price}
                        </h3>
                      </div>

                      <div className="flex justify-center mb-2">
                        <h2
                          className="text-xs text-black overflow-hidden"
                          style={{ height: "20px" }}
                        >
                          {productDetail?.companyName}
                        </h2>
                      </div>
                    </div>


              <div className="absolute bottom-0 left-0 right-0">
                <Link
                to={`/showProduct/${productDetail?._id}`}
                  className="text-center py-2 flex justify-center items-center rounded-md bg-blue-400 text-white hover:bg-indigo-700 transition duration-300 ease-in-out"
                  style={{ marginTop: "auto" }}
                >
                  <h1 className="text-sm md:text-xs md:font-semibold">
                    Show details
                  </h1>
                  <FaArrowRightLong className="ml-1" />
                </Link>
              </div>

            </div>
          </div>
        )}

        {memoizedProduct?.data?.length > 5 && (
          <div className="flex justify-center mt-10">
            <Link to="/Products" className="btn">
              Show All SERVICES
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowProduct;
