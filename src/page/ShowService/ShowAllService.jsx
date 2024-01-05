import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useLoaderData } from "react-router-dom";

const ShowAllService = () => {
  const service = useLoaderData();

  const [searchInput, setSearchInput] = useState("");
  const [filteredService, setFilteredService] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchInput(searchText);

    const filteredItems = service.filter((serviceDetail) =>
      serviceDetail.serviceName.toLowerCase().includes(searchText)
    );

    setFilteredService(filteredItems);
  };

  return (
    <div>
      <Helmet>
        <title>FASHION | All Services</title>
      </Helmet>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-semibold mb-4">NEW ARRIVALS</h1>
        <div className="relative h-10 w-full min-w-[200px] my-4">
          <input
            name="search"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            value={searchInput}
            onChange={handleSearch}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Search Services by NAME
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(searchInput ? filteredService : service)
            .filter((_, index) => showAll || index < 6) 
            .map((serviceDetail, index) => (
              <div
                key={index}
                className={`bg-white p-4 rounded-lg shadow-md`}
              >
              <img
                src={serviceDetail.image}
                alt={serviceDetail.yourName}
                className="w-full h-[600px] object-cover rounded-md"
              />
              <h3 className="text-2xl font-medium mt-2 mx-5 text-black">
                {serviceDetail.serviceName}
              </h3>
              <h3 className="text-base font-light mt-2 mx-5 text-black">
                {serviceDetail.description}
              </h3>

              <h3 className="text-base font-light mt-2 mx-5 text-black">
                {serviceDetail.serviceArea}
              </h3>
              <h3 className="text-base  font-medium mt-2 mx-5 text-green-500">
                Price: ${serviceDetail.price}
              </h3>
              <div className="flex items-center mt-4 mb-3 mx-5 gap-3">
                <img
                  className="h-12 w-12 rounded-full"
                  src={serviceDetail.authorPhoto}
                  alt=""
                />
                <h2 className="text-base font-medium text-black mt-2">
                  {serviceDetail.yourName}
                </h2>
              </div>
              <Link
                to={`/showService/${serviceDetail._id}`}
                className="flex justify-end btn btn-ghost text-black"
              >
                View Details
                <FaArrowRightLong />
              </Link>
            </div>
          ))}
        </div>
        {service.length > 6 && !showAll && (
          <div className="flex justify-center mt-4">
            <button
              className="btn btn-ghost text-black hover:bg-gray-200"
              onClick={() => setShowAll(true) }
            >
              View All
            </button>
          </div>
         )}
      </div>
    </div>
  );
};

export default ShowAllService;
