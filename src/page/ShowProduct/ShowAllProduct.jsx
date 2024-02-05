import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const ShowAllProduct = () => {
  const [product, setProduct] = useState();
  const [sortBy, setSortBy] = useState("latest");
  const [category, setCategory] = useState("all");
  const [singleCategory, setSingleCategory] = useState();

  const handleSearchSubmit = () => {
    const search = document.querySelector("input[name=search]").value;
    const filteredProduct = product.data.filter((productDetail) => {
      return productDetail.title.toLowerCase().includes(search.toLowerCase());
    });
    setProduct({ data: filteredProduct });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "https://mern-ecom-backend-henna.vercel.app/api/product";

        if (category !== "all") {
          apiUrl += `?category=${category}`;
        }
        // Append sorting parameter to API URL based on sortBy value
        if (sortBy === "latest") {
          apiUrl += "?sort=-createdAt"; 
        } else if (sortBy === "lowToHigh") {
          apiUrl += "?sort=price";
        } else if (sortBy === "highToLow") {
          apiUrl += "?sort=-price";
        }

        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Error fetching product data");
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    fetchData();
  }, [sortBy, category]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mern-ecom-backend-henna.vercel.app/api/categories/"
        );

        if (response.ok) {
          const data = await response.json();
          // console.log(data.data);
          setSingleCategory(data.data); // Assuming the API response is an array of products
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

  const handleCategoryChange = async (categoryId) => {
    setCategory(categoryId);
    try {
      const response = await fetch(
        `https://mern-ecom-backend-henna.vercel.app/api/categories/${categoryId}`
      );

      if (response.ok) {
        const data = await response.json();
        setProduct(data.data);
        console.log(data.data.name);
      } else {
        console.error("Error fetching product data for the selected category");
      }
    } catch (error) {
      console.error("Error fetching product data", error);
    }
  };

  const toggleSortDropdown = () => {
    const dropdown = document.getElementById("sort-dropdown");
    dropdown.classList.toggle("invisible");
    dropdown.classList.toggle("opacity-100");
  };

  // const toggleCategoryDropdown = () => {
  //   const dropdown = document.getElementById("category-dropdown");
  //   dropdown.classList.toggle("invisible");
  //   dropdown.classList.toggle("opacity-100");
  // };

  return (
    <div>
      <Helmet>
        <title>FASHION | All Products</title>
      </Helmet>
      <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold mb-2 md:mb-0">All Products</h1>
          <div className="flex space-x-4 ">
            <div className="flex items-center text-left relative left-[98px]">
              <button
                onClick={toggleSortDropdown}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm  py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {sortBy === "latest" && "Sort by latest"}{" "}
                {sortBy === "lowToHigh" && "Price: Low to High"}{" "}
                {sortBy === "highToLow" && "Price: High to Low"}
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
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
        <div className="md:mr-6 mb-4 md:min-w-[200px]">
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
                        <Link
                          to={`/showProduct?category=${categoryItem._id}`}
                          onClick={() => handleCategoryChange(categoryItem._id)}
                        >
                        <span className="mr-2">{categoryItem.name}</span>
                        </Link>
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
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {product &&
            product?.data
              .filter((productDetail) => {
                if (category === "all") return true;
                return productDetail.category === category;
              })
              .map((productDetail, index) => (
                <Link to={`/showProduct/${productDetail?._id}`} key={index}>
                  <div className={`bg-white p-4 rounded-lg shadow-md mb-4`}>
                    <img
                      src={productDetail?.image}
                      alt={productDetail?.sellerName}
                      className="w-full h-[335px] object-cover rounded-md mb-2"
                    />
                    <h3 className="text-base text-center font-normal text-gray-600 mb-2">
                      {productDetail?.title}
                    </h3>
                    <h3 className="text-base text-center font-medium text-black">
                      Price: ${productDetail?.price}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAllProduct;
