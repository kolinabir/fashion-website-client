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
    <div className="grid md:grid-cols-1 ">
      {/* Product table */}
      <div className="overflow-x-auto md:grid md:col-span-1">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table header */}
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SubTotal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {service?.products &&
              service?.products?.length > 0 &&
              service?.products?.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10"
                          src={product?.productId?.image}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product?.productId?.title}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ৳{product?.productId?.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product?.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ৳{product?.productId?.price * product?.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(product?.productId._id)}
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Cart totals */}
    </div>
  );
};

export default ServiceCart;
