import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ServiceCard = ({ serviceDetail, handleDelete }) => {
  const { _id, title, price, image } = serviceDetail;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
      <div className="w-1/3">
        <img className="w-full h-[200px] object-cover" src={image} alt="" />
      </div>

      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">${price}</p>

        <div className="flex items-center justify-between mt-4">
          <Link to={`/update/${_id}`}>
            <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              <AiFillEdit className="mr-2" />
              Edit
            </button>
          </Link>

          <button
            onClick={() => {
              handleDelete(_id);
            }}
            className="flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            <AiFillDelete className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
