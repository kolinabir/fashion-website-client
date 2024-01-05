import React from "react";

const ServiceCart = ({ service, handleDelete }) => {
  const handleReviewClick = () => {
    // Add your logic for handling the review button click
    console.log("Review button clicked");
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-64 p-4 m-4">
      <img
        src={service.image} // Replace with your service's image source
        alt={service.serviceName}
        className="w-full h-32 object-cover object-center rounded-md"
      />
      <h2 className="text-xl font-semibold mt-4">{service.serviceName}</h2>
      <p className="text-gray-500 mt-2">{service.description}</p>
      <div className="mt-4">
        <p className="text-xl font-semibold text-blue-600">${service.price}</p>
      </div>
      <div className="flex justify-between items-center gap-2 mt-4">
        <button
          className="btn text-red-700 btn-outline btn-sm"
          onClick={() => handleDelete(service._id)}
        >
          Cancel Booking
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleReviewClick}
        >
          Review
        </button>
      </div>
    </div>
  );
};

export default ServiceCart;
