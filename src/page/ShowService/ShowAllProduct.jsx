import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const ShowAllProduct = () => {
  // const service = useLoaderData();

  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mern-ecom-backend-henna.vercel.app/api/product"
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
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

  return (
    <div>
      <Helmet>
        <title>FASHION | All Products</title>
      </Helmet>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-semibold mb-4">NEW ARRIVALS</h1>
        <div className="relative h-10 w-full min-w-[200px] my-4">
          <input
            name="search"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Search Products by NAME
          </label>
        </div>
        <div className="flex justify-center mb-4">
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              id="category-menu-button"
            ></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {product &&
            product?.data?.map((productDetail, index) => (
              <Link to={`/showProduct/${productDetail?._id}`} key={index}>
                <div className={`bg-white p-4 rounded-lg shadow-md`}>
                  <img
                    src={productDetail?.image}
                    alt={productDetail?.sellerName}
                    className="w-[335px] h-[335px] object-cover rounded-md"
                  />
                  <h3 className="text-base flex justify-center font-normal mt-2  text-gray-600">
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
