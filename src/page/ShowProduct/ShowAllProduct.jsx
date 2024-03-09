import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, NavLink } from "react-router-dom";
import { FaArrowRightLong, FaChevronDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Rating from "react-rating-stars-component";
import { DotLoader } from "react-spinners";

const ShowAllProduct = () => {
  const [product, setProduct] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [category, setCategory] = useState("all");
  const [singleCategory, setSingleCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchSubmit = () => {
    const search = document.querySelector("input[name=search]").value;
    const filteredProduct = product?.data?.products?.filter((productDetail) => {
      return productDetail.title.toLowerCase().includes(search.toLowerCase());
    });
    setProduct({ data: filteredProduct } || []);
  };

  useEffect(() => {
    const loadAllProduct = async () => {
      try {
        const response = await fetch(
          "https://mern-ecom-backend-henna.vercel.app/api/product"
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data || []);
        } else {
          console.error("Error fetching product data");
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      } finally {
        setLoading(false);
      }
    };
    loadAllProduct();

    const loadAllCategory = async () => {
      try {
        const response = await fetch(
          "https://mern-ecom-backend-henna.vercel.app/api/categories/"
        );
        if (response.ok) {
          const data = await response.json();
          setSingleCategory(data.data || []);
        } else {
          console.error("Error fetching category data");
        }
      } catch (error) {
        console.error("Error fetching category data", error);
      }
    };
    loadAllCategory();
  }, []);

  const handleSortChange = (value) => {
    setLoading(true);

    // Copy the product data to avoid mutating the original state
    const sortedProducts = [...product.data.products];

    if (value === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setProduct({ data: { products: sortedProducts } });
    setSortBy(value);
    setLoading(false);
  };

  const handleCategoryChange = async (categoryId) => {
    setLoading(true);

    try {
      const url =
        categoryId === "all"
          ? "https://mern-ecom-backend-henna.vercel.app/api/product"
          : `https://mern-ecom-backend-henna.vercel.app/api/product/category/${categoryId}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setCategory(categoryId);
      } else {
        console.error("Error fetching product data");
      }
    } catch (error) {
      console.error("Error fetching product data", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSortDropdown = () => {
    const dropdown = document.getElementById("sort-dropdown");
    dropdown.classList.toggle("invisible");
    dropdown.classList.toggle("opacity-100");
  };

  return (
    <div className="mx-3 md:mx-20 lg:mx-36">
      <Helmet>
        <title>AN NOOR | All Products</title>
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
                Search by Name
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
                    <li key={index} className="flex items-center font-semibold">
                      <div className="w-full">
                        <NavLink
                          onClick={() => handleCategoryChange(categoryItem._id)}
                          className={
                            category === categoryItem._id
                              ? "text-indigo-500"
                              : ""
                          }
                        >
                          <div className="flex items-center justify-between">
                            <span className="mr-2">{categoryItem.name}</span>
                          </div>
                        </NavLink>
                        <hr className="w-full border-gray-300" />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading categories...</p>
              )}
            </div>
          </div>

          {loading ? (
            <div className="mx-auto h-[500px]">
              <div className="flex items-center justify-center ">
                <div className="flex flex-col items-center">
                  <div>
                    <DotLoader color="#36d7b7" />
                  </div>
                  <p className="mt-4 text-gray-700">Loading...</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {product?.data?.products?.map((productDetail, index) => (
                <Link to={`/showProduct/${productDetail?._id}`} key={index}>
                  <div>
                    <div
                      key={index}
                      className={`bg-white p-4 !h-[450px] rounded-lg shadow-md col-span-1 relative overflow-hidden ${
                        index >= 15 ? "hidden" : ""
                      }`}
                      style={{
                        height: "400px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div className="group flex-grow">
                        <div className="relative overflow-hidden aspect-w-1 aspect-h-1 group-hover:scale-105 transition-transform">
                          <Link to={`/showProduct/${productDetail?._id}`}>
                            <img
                              src={productDetail?.image}
                              alt={productDetail?.yourName}
                              className="w-full h-[200px] sm:h-[250px] object-cover rounded-md"
                            />
                          </Link>
                        </div>
                        <Link
                          to={`/showProduct/${productDetail?._id}`}
                          className="text-base text-deep-orange-900 font-semibold 
                    hover:text-deep-orange-700 transition duration-300 ease-in-out
                  mt-2 flex justify-center overflow-hidden"
                          style={{ height: "50px" }}
                        >
                          {productDetail?.title}
                        </Link>

                        <div className="flex justify-center">
                          <Rating
                            value={
                              typeof productDetail?.averageRating === "number"
                                ? productDetail?.averageRating
                                : 0
                            }
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            edit={false}
                          />
                        </div>

                        <div className="flex justify-center mb-2">
                          <h3 className="text-sm font-medium mx-3 text-green-500">
                            ৳ {productDetail?.price}
                          </h3>
                        </div>

                        <div className="flex justify-center mb-2">
                          <h2
                            className="text-xs text-black overflow-hidden"
                            style={{ height: "20px" }}
                          >
                            {productDetail?.companyName}
                          </h2>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0">
                        <Link
                          className="text-center py-2 flex justify-center items-center rounded-md bg-blue-400 text-white hover:bg-indigo-700 transition duration-300 ease-in-out"
                          style={{ marginTop: "auto" }}
                        >
                          <h1 className="text-sm md:text-xs md:font-semibold">
                            Show details
                          </h1>
                          <FaArrowRightLong className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowAllProduct;
