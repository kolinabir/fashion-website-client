import { Link, useLoaderData } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import Rating from "react-rating-stars-component";

const ShowProduct = () => {
  const service = useLoaderData();
  console.log(service);

  return (
    <div>
      <Helmet>
        <title>FASHION | HOME</title>
      </Helmet>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-semibold mb-4">NEW ARRIVALS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.map((serviceDetail, index) => (
            <div
              key={index}
              className={`bg-white p-4 rounded-lg shadow-md  ${
                index >= 6 ? "hidden" : ""
              }`}
            >
              <div className="">
                <div className="">
                  <img
                    src={serviceDetail.image}
                    alt={serviceDetail.yourName}
                    className="w-full h-[600px] object-cover rounded-md"
                  />
                  <h3 className="text-2xl text-deep-orange-900 font-semibold mt-2 mx-3">
                    {serviceDetail.serviceName}
                  </h3>

                  <div className="ml-3">
                  <Rating
                    value={serviceDetail.rating} // Add a 'rating' property to your service data
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                  />
                  </div>

                  <h3 className="text-base font-light mt-3 mx-3 text-black">
                    {serviceDetail.serviceArea}
                  </h3>
                  <h3 className="text-base font-medium mx-3 text-green-500">
                    Price: ${serviceDetail.price}
                  </h3>
                  <div className="flex items-center mt-4 mb-3 mx-3 gap-3">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={serviceDetail.authorPhoto}
                      alt=""
                    />
                    <h2 className="text-base font-medium text-black mt-2">
                      {serviceDetail.yourName}
                    </h2>
                  </div>
                </div>

                <div>
                  <Link
                    to={`/showService/${serviceDetail._id}`}
                    className="flex justify-end btn btn-ghost text-black"
                  >
                   Show details
                    <FaArrowRightLong />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {service.length > 5 ? (
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
