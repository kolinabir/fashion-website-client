/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { FaArrowRightLong } from "react-icons/fa6";
import useShoppingCart from "../../hooks/useShoppingCart";
// Assuming you're using react-icons
// import Rating from "react-rating-stars-component";

// eslint-disable-next-line react/prop-types
const SingleProductCard = ({ productDetail }) => {
  const { handleAddToCart } = useShoppingCart();

  return (
    <div
      className="bg-white p-4 !h-[350px] md:!h-[400px] rounded-lg shadow-md col-span-1 relative overflow-hidden"
      style={{ height: "43300px", display: "flex", flexDirection: "column" }}
    >
      <div className="group flex-grow">
        <div className="relative overflow-hidden aspect-w-1 aspect-h-1 group-hover:scale-105 transition-transform">
          <Link
            // state={{ id: productDetail?._id }}
            to={`/showProduct/${productDetail?._id}`}
          >
            <img
              // eslint-disable-next-line react/prop-types
              src={productDetail?.image}
              alt={productDetail?.yourName}
              className="w-full h-[200px] sm:h-[250px] object-cover rounded-md"
            />
          </Link>
        </div>
        <Link
          to={`/showProduct/${productDetail?._id}`}
          className="text-base text-deep-orange-900 font-semibold hover:text-deep-orange-700 transition duration-300 ease-in-out mt-2 flex justify-center overflow-hidden"
          style={{ height: "35px" }}
        >
          {productDetail?.title}
        </Link>

        {/* <div className="flex justify-center">
          <Rating
            value={productDetail?.averageRating}
            count={5}
            size={24}
            activeColor="#ffd700"
            edit={false}
          />
        </div> */}

        <div className="flex justify-center mb-2">
          <h3 className="text-sm font-medium mx-3 text-green-500">
            ৳ {productDetail?.price}
          </h3>
        </div>

        <div className="flex justify-center ">
          <h2
            className="text-xs text-black overflow-hidden"
            style={{ height: "20px" }}
          >
            {productDetail?.companyName}
          </h2>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <Link
            onClick={() => handleAddToCart(productDetail._id, 1)}
            className="text-center py-2 flex justify-center items-center rounded-md bg-[#349234] text-white hover:bg-indigo-700 transition duration-300 ease-in-out"
            style={{ marginTop: "auto" }}
          >
            <h1 className="text-sm md:text-xs md:font-semibold">Add to Cart</h1>
            <FaArrowRightLong className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
