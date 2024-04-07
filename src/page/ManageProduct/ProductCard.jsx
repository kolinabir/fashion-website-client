import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ProductCard = ({ itemDetails, handleDelete }) => {
  const { _id, title, price, image } = itemDetails;

  return (
    <div className="flex overflow-hidden border border-gray-300">
      <div>
        <img
          className="md:w-[75.63px] md:h-[75.63px] w-14 h-14 mt-2 md:mt-2 ml-1 object-cover"
          src={image}
          alt=""
        />
      </div>

      <div className="flex flex-col flex-grow pt-3 ml-2 md:p-4">
        <h3 className="md:text-lg text-sm font-normal mb-2">{title}</h3>
        <p className="text-base text-gray-600">${price}</p>
      </div>

      <div className="flex items-end justify-end p-3">
        <Link to={`/update/${_id}`}>
          <button className="flex items-center font bg-black text-white text-base md:px-2 md:py-2 rounded hover:bg-[#349234]">
            <AiFillEdit />
          </button>
        </Link>

        <button
          onClick={() => {
            handleDelete(_id);
          }}
          className="flex items-center bg-red-600 text-white md:px-2 text-base md:py-2 px-1 py-1 rounded hover:bg-red-700 ml-2"
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
