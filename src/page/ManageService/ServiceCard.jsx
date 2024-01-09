import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ServiceCard = ({ itemDetails, handleDelete }) => {
  const { _id, title, price, image } = itemDetails;

  return (
    <div className="flex overflow-hidden border border-gray-300">
      <div>
        <img className="w-[75.63px] h-[75.63px] mt-2 ml-1 object-cover" src={image} alt="" />
      </div>

      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-normal mb-2">{title}</h3>
        <p className="text-gray-600">${price}</p>
      </div>

      <div className="flex items-end justify-end p-3">
        <Link to={`/update/${_id}`}>
          <button className="flex items-center font bg-black text-white text-base px-2 py-2 rounded hover:bg-blue-700">
            <AiFillEdit />
            
          </button>
        </Link>

        <button
          onClick={() => {
            handleDelete(_id);
          }}
          className="flex items-center bg-red-600 text-white px-2 text-base py-2 rounded hover:bg-red-700 ml-2"
        >
          <AiFillDelete  />
          
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
