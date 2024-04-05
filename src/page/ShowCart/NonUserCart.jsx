import React from "react";
import { FaTimes } from "react-icons/fa";

const NonUserCart = ({ product, handleDelete }) => {
  //   console.log(product);
  // Calculate subtotal
  const subtotal = product?.price * product?.quantity;

  // Shipping fee and total price (assuming here, adjust as needed)
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <div
        key={product._id}
        className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6"
      >
        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
          <img
            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
            src={product?.image}
            alt=""
          />
          <div className="flex w-full flex-col px-4 py-4">
            <span className="font-semibold">{product?.title}</span>
            <span className="float-right text-gray-400">
              {product?.quantity} x ${product?.price}
            </span>
            <p className="text-sm md:text-lg font-bold">
              Total: {product?.quantity * product?.price} tk
            </p>
          </div>
          <button
            className="text-red-600 hover:text-red-900 hidden md:block"
            onClick={() => handleDelete(product?._id)}
          >
            <FaTimes />
          </button>
          <button
            className="text-white bg-red-500 rounded-lg px-2 py-1 md:hidden"
            onClick={() => handleDelete(product?._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </tbody>
  );
};

export default NonUserCart;
