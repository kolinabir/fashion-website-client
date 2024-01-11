import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ServiceCart = ({ service, handleDelete }) => {
  console.log(service.products.map((product) => product.productId._id));
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleReviewClick = () => {
    // Open the review modal
    setReviewModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the review modal
    setReviewModalOpen(false);
  };

  const handleReviewSubmit = () => {
    // Perform the API request to post the review data
    fetch("https://mern-ecom-backend-henna.vercel.app/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        productID: service.products.map((product) => product.productId._id),
        rating,
        review,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error response
        // console.log("Review submitted:", data);

        // Close the modal after submitting the review
        setReviewModalOpen(false);
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
  };

  return (
    <div className="rounded-lg border flex p-4 ">
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
        <div className="w-1/2">
          {service.products && service.products.length > 0 && (
            <div>
              {service.products.map((product, index) => (
                <div key={index} className="ml-6 ">
                  <p className=" text-black dark:text-white">
                    <h2 className="text-base dark:text-white font-normal ml-3">
                      {product.productId.title} -{" "}
                      {product.productId.description.length > 30
                        ? `${product.productId.description.slice(0, 30)}...`
                        : product.productId.description}
                    </h2>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        {service.products && service.products.length > 0 && (
          <div className="w/">
            {service.products.map((product, index) => (
              <div key={index} className="flex justify-end items-center ">
                <p className="text-xl font-semibold ml-10 text-blue-600">
                  ${product.productId.price}
                </p>
                <p className="text-xl ml-4 font-semibold mr-10">
                  {product.quantity}
                </p>{" "}
                <div className="flex justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={handleReviewClick}
                  >
                    Review
                  </button>
                </div>
                {isReviewModalOpen && (
                  <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg">
                      <h2 className="text-2xl font-semibold mb-4">
                        Submit Review
                      </h2>
                      <label htmlFor="rating" className="block mb-2">
                        Rating:
                      </label>
                      <input
                        type="number"
                        id="rating"
                        name="rating"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="border p-2 mb-4 w-full"
                      />
                      <label htmlFor="review" className="block mb-2">
                        Review:
                      </label>
                      <textarea
                        id="review"
                        name="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="border p-2 mb-4 w-full"
                      />
                      <div className="flex justify-end">
                        <button
                          className="btn btn-primary"
                          onClick={handleReviewSubmit}
                        >
                          Submit
                        </button>
                        <button
                          className="btn btn-outline ml-2"
                          onClick={handleCloseModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCart;
