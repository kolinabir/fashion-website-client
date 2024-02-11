import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink, useLoaderData } from "react-router-dom";

const ShowProductByCategory = () => {
  const data = useLoaderData();
  //   console.log(data.data.map((item) => item.category.name));
  const [singleCategory, setSingleCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const uniqueCategories = [
    ...new Set(data.data.map((item) => item.category.name)),
  ];

  const handleSearchSubmit = () => {
    const search = document
      .querySelector("input[name=search]")
      .value.toLowerCase();
    const filteredProduct = data.data.filter((productDetail) => {
      return productDetail.title.toLowerCase().includes(search);
    });
    setFilteredProducts(filteredProduct);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mern-ecom-backend-henna.vercel.app/api/categories/"
        );

        if (response.ok) {
          const data = await response.json();
          setSingleCategory(data.data);
        } else {
          console.error("Error fetching product data");
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-3 md:mx-20 lg:mx-36">
      <Helmet>
        <title> AN NOOR | {uniqueCategories.join(", ")} </title>
      </Helmet>
      <div className="container mx-auto my-20">
        <div className="flex flex-col md:flex-row">
          <div className="md:mr-6 mb-4 md:min-w-[200px]">
            <h2 className="text-lg font-semibold mb-2">
              Category {uniqueCategories.join(", ")}
            </h2>

            <div className="relative flex ">
              <input
                name="search"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Search Products by NAME
              </label>
              <button
                className="absolute right-0 top-0 h-full w-10 text-gray-600 hover:text-gray-800 transition-all outline-none focus:outline-none"
                onClick={handleSearchSubmit}
              >
                <FaSearch className="ml-3" />
              </button>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Product Category</h2>
              {singleCategory ? (
                <ul className="space-y-2">
                  {singleCategory.map((categoryItem, index) => (
                    <li key={index} className="flex items-center">
                      <div>
                        <NavLink
                          to={`/showProduct/category/${categoryItem._id}`}
                          className={
                            " font-normal hover:text-indigo-500 transition duration-300 ease-in-out"
                          }
                        >
                          <span className="mr-2">{categoryItem.name}</span>
                        </NavLink>
                        <hr className="w-60  border-gray-300" />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading categories...</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(filteredProducts.length > 0 ? filteredProducts : data.data).map(
              (productDetail, index) => (
                <NavLink to={`/showProduct/${productDetail?._id}`} key={index}>
                  <div className={`bg-white p-4 rounded-lg shadow-md`}>
                    <img
                      src={productDetail?.image}
                      alt={productDetail?.sellerName}
                      className="w-[335px] h-[335px] object-cover rounded-md"
                    />
                    <h3 className="text-base flex justify-center font-normal mt-2 text-gray-600">
                      {productDetail?.title}
                    </h3>
                    <h3 className="text-base flex justify-center font-medium mt-2 text-black">
                      Price: ${productDetail?.price}
                    </h3>
                  </div>
                </NavLink>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProductByCategory;
