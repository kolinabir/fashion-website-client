import React from "react";
import { FaTimes } from "react-icons/fa";

const ServiceCart = ({ service, handleDelete }) => {
  const handleReviewClick = () => {
    // Add your logic for handling the review button click
    console.log("Review button clicked");
  };

  return (
    <div className="  bg-white rounded-lg shadow-md flex p-4 relative">
      <div className="relative">
        {service.products && service.products.length > 0 && (
          <div>
            {service.products.map((product, index) => (
              <div key={index} className="ml-6">
                <div className="rounded-full border-2 border-gray-700 absolute h-8 w-8 top-[20px] left-[-10px] flex items-center justify-center cursor-pointer">
                  <FaTimes
                    className="text-gray-700 hover:text-red-500"
                    onClick={() => handleDelete(service._id)}
                  />
                </div>
                <img
                  src={product.productId.image}
                  alt=""
                  className="w-[75.63px] h-[75.63px] ml-1 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between w-full">
        <div>
          {service.products && service.products.length > 0 && (
            <div>
              {service.products.map((product, index) => (
                <div key={index} className="ml-6">
                  <p className="text-gray-500">
                    <h2 className="text-base font-normal ml-3">
                      {product.productId.title}
                    </h2>
                    <p className="text-gray-500 text-base font-normal ml-3">
                      {product.productId.description}
                    </p>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        {service.products && service.products.length > 0 && (
          <div>
            {service.products.map((product, index) => (
              <div key={index} className="flex justify-between items-center ">
                <p className="text-xl font-semibold ml-10 text-blue-600">
                  ${product.productId.price}
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleReviewClick}
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCart;
