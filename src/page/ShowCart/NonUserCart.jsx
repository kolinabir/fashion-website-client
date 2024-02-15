import React from "react";
import { FaTimes } from "react-icons/fa";

const NonUserCart = ({ product, handleDelete }) => {
//   console.log(product);
  // Calculate subtotal
  const subtotal = product?.price * product?.quantity;

  // Shipping fee and total price (assuming here, adjust as needed)
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="h-10 w-10" src={product.image} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {product.title}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${product.price}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${subtotal}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => handleDelete(product._id)}
        >
          <FaTimes />
        </button>
      </td>
    </tr>
  );
};

export default NonUserCart;
