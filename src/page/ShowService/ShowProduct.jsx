import { Link, useLoaderData } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import Rating from "react-rating-stars-component";

const ShowProduct = () => {
  const product = useLoaderData();
  console.log(product);

  return (
    <div>
      <Helmet>
        <title>FASHION | HOME</title>
      </Helmet>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-semibold mb-4">NEW ARRIVALS</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {product.map((productDetail, index) => (
            <div
              key={index}
              className={`bg-white p-4 rounded-lg shadow-md ${
                index >= 15 ? "hidden" : ""
              }`}
            >
              <div className="">
                <div className="">
                  <img
                    src={productDetail.image}
                    alt={productDetail.yourName}
                    className="w-full h-[300px] object-cover rounded-md" // Adjusted height
                  />
                  <h3 className="text-2xl text-deep-orange-900 font-semibold mt-2 mx-3">
                    {productDetail.productName}
                  </h3>

                  <div className="ml-3">
                    <Rating
                      value={productDetail.rating}
                      count={5}
                      size={24}
                      activeColor="#ffd700"
                      edit={false}
                    />
                  </div>

                  <h3 className="text-base font-light mt-3 mx-3 text-black">
                    {productDetail.productArea}
                  </h3>
                  <h3 className="text-base font-medium mx-3 text-green-500">
                    Price: ${productDetail.price}
                  </h3>
                  <div className="flex items-center mt-4 mb-3 mx-1 gap-3">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={productDetail.authorPhoto}
                      alt=""
                    />
                    <h2 className="text-xs text-black">
                      {productDetail.yourName}
                    </h2>
                  </div>
                </div>

                <div>
                  <Link
                    to={`/showProduct/${productDetail._id}`}
                    className="flex justify-end btn bg-blue-400 text-white hover:bg-indigo-700"
                  >
                    Show details
                    <FaArrowRightLong className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {product.length > 5 ? (
          <div className="flex justify-center mt-4">
            <Link to="/services" className="btn">
              Show All SERVICES
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShowProduct;
