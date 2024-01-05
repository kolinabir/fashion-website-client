import { Link } from "react-router-dom";

const ServiceCard = ({ serviceDetail, handleDelete }) => {
  const { _id,  serviceName, price, image } =
    serviceDetail;

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img className="w-full h-[500px] object-cover" src={image} alt="" />

        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold mb-2">{serviceName}</h3>
          <p className="text-gray-600">${price}</p>
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-gray-100">
          <Link to={`/update/${_id}`}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Edit
            </button>
          </Link>

          <button
            onClick={() => {
              handleDelete(_id);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
