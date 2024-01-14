import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";

const ShowAllProduct = () => {
  const [product, setProduct] = useState();
  const [sortBy, setSortBy] = useState("latest");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mern-ecom-backend-henna.vercel.app/api/product"
        );

        if (response.ok) {
          const data = await response.json();
          setProduct(data); // Assuming the API response is an array of products
        } else {
          console.error("Error fetching product data");
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    fetchData();
  }, []);

  const handleSortChange = (value) => {
    setSortBy(value);
    // Implement your sorting logic here based on the selected value (latest, lowToHigh, highToLow)
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    // Implement your logic to filter products by category
  };

  const toggleSortDropdown = () => {
    const dropdown = document.getElementById("sort-dropdown");
    dropdown.classList.toggle("invisible");
    dropdown.classList.toggle("opacity-100");
  };

  const toggleCategoryDropdown = () => {
    const dropdown = document.getElementById("category-dropdown");
    dropdown.classList.toggle("invisible");
    dropdown.classList.toggle("opacity-100");
  };

  return (
    <div>
    <Helmet>
      <title>FASHION | All Products</title>
    </Helmet>
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">NEW ARRIVALS</h1>
        <div className="flex space-x-4">
          <div className="relative inline-block text-left">
            <button
              onClick={toggleSortDropdown}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {sortBy === "latest" && "Sort by latest"} {sortBy === "lowToHigh" && "Price: Low to High"} {sortBy === "highToLow" && "Price: High to Low"} 
              <FaChevronDown className="ml-8 h-4 w-5" />
            </button>
            <div
              id="sort-dropdown"
              className="invisible opacity-0 dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95"
            >
              <div className="rounded-md bg-white shadow-xs">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    onClick={() => {
                      handleSortChange("latest");
                      toggleSortDropdown();
                    }}
                    className={`${
                      sortBy === "latest"
                        ? "text-indigo-500 font-semibold"
                        : "text-gray-700"
                    } block px-4 py-2 text-sm leading-5 w-full text-left`}
                    role="menuitem"
                  >
                    Latest
                  </button>
                  <button
                    onClick={() => {
                      handleSortChange("lowToHigh");
                      toggleSortDropdown();
                    }}
                    className={`${
                      sortBy === "lowToHigh"
                        ? "text-indigo-500 font-semibold"
                        : "text-gray-700"
                    } block px-4 py-2 text-sm leading-5 w-full text-left`}
                    role="menuitem"
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => {
                      handleSortChange("highToLow");
                      toggleSortDropdown();
                    }}
                    className={`${
                      sortBy === "highToLow"
                        ? "text-indigo-500 font-semibold"
                        : "text-gray-700"
                    } block px-4 py-2 text-sm leading-5 w-full text-left`}
                    role="menuitem"
                  >
                    Price: High to Low
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="relative inline-block text-left">
            <button
              onClick={toggleCategoryDropdown}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Category
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 0 1 1.414 0L10 11.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                />
              </svg>
            </button>
            <div
              id="category-dropdown"
              className="invisible opacity-0 dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95"
            >
              <div className="rounded-md bg-white shadow-xs">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    onClick={() => {
                      handleCategoryChange("all");
                      toggleCategoryDropdown();
                    }}
                    className={`${
                      category === "all"
                        ? "text-indigo-500 font-semibold"
                        : "text-gray-700"
                    } block px-4 py-2 text-sm leading-5 w-full text-left`}
                    role="menuitem"
                  >
                    All
                  </button>
                  <button
                    onClick={() => {
                      handleCategoryChange("clothing");
                      toggleCategoryDropdown();
                    }}
                    className={`${
                      category === "clothing"
                        ? "text-indigo-500 font-semibold"
                        : "text-gray-700"
                    } block px-4 py-2 text-sm leading-5 w-full text-left`}
                    role="menuitem"
                  >
                    Clothing
                  </button>
                  <button
                    onClick={() => {
                      handleCategoryChange("electronics");
                      toggleCategoryDropdown();
                    }}
                    className={`${
                      category === "electronics"
                        ? "text-indigo-500 font-semibold"
                        : "text-gray-700"
                    } block px-4 py-2 text-sm leading-5 w-full text-left`}
                    role="menuitem"
                  >
                    Electronics
                  </button>
                  <button
                    onClick={() => {
                      handleCategoryChange("accessories");
                      toggleCategoryDropdown();
                    }}
                    className={`${
                      category === "accessories"
                        ? "text-indigo-500 font-semibold"
                        : "text-gray-700"
                    } block px-4 py-2 text-sm leading-5 w-full text-left`}
                    role="menuitem"
                  >
                    Accessories
                  </button>
                  
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="relative h-10 w-full min-w-[200px] my-4">
            <input
              name="search"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Search Products by NAME
            </label>
          </div> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {product &&
          product?.data
            .filter((productDetail) => {
              if (category === "all") return true;
              return productDetail.category === category;
            })
            .map((productDetail, index) => (
              <Link to={`/showProduct/${productDetail?._id}`} key={index}>
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
              </Link>
            ))}
      </div>
    </div>
  </div>
);
};

export default ShowAllProduct;