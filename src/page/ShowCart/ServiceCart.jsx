import React from "react";
import { FaTimes } from "react-icons/fa";

const ServiceCart = ({ service, handleDelete }) => {
  // Calculate subtotal
  const subtotal =
    service?.products?.reduce((acc, product) => {
      return acc + (product?.productId?.price * product?.quantity || 0);
    }, 0) || 0;

  // Round the subtotal to two decimal places
  const roundedSubtotal = subtotal.toFixed(2);

  // Shipping fee and total price (assuming here, adjust as needed)
  const shippingFee = 10; // Sample shipping fee

  // Calculate the total price including shipping fee
  const totalPrice = (subtotal + shippingFee).toFixed(2);

  return (
    <tbody className="grid grid-cols-2 gap-5 md:grid-cols-1 bg-white divide-y divide-gray-200">
      {service?.products &&
        service?.products?.length > 0 &&
        service?.products?.map((product, index) => (
          <div
            key={index}
            className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6"
          >
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src={product?.productId?.image}
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">
                  {product?.productId?.title}
                </span>
                <span className="float-right text-gray-400">
                  {product?.quantity} x ${product?.productId?.price}
                </span>
                <p className="text-sm md:text-lg font-bold">
                  Total: {product?.quantity * product?.productId?.price} tk
                </p>
              </div>
              <button
                className="text-red-600 hover:text-red-900 hidden md:block"
                onClick={() => handleDelete(product?.productId._id)}
              >
                <FaTimes />
              </button>
              <button
                className="text-white bg-red-500 rounded-lg px-2 py-1 md:hidden"
                onClick={() => handleDelete(product?.productId._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </tbody>
  );
};

export default ServiceCart;
