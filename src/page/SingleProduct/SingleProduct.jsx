import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { DotLoader } from "react-spinners";
import "../SingleProduct/Main.style.scss";
import Images from "../SingleProduct/ImageGallery/ImageGallery";
import useShoppingCart from "../../hooks/useShoppingCart";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartAmount, setcartAmount] = useState(1);
  const [productDetail, setProductDetail] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true); // Set isLoading to true when data is being fetched
    fetch(`https://mernecomnoor.vercel.app/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductDetail(data.data);
        setIsLoading(false); // Set isLoading to false once data is loaded
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  //use params to get the id of the product from the url

  const { handleAddToCart } = useShoppingCart();
  // console.log(cartAmount);
  // const [sneakerAmountFinal, setSneakerAmountFinal] = useState(0);

  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("description");

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    // You can add further logic here if needed
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    // You can add further logic here if needed
  };

  useEffect(() => {
    //make the screen scroll to top when the component is mounted
    window.scrollTo(0, 0);

    setIsLoading(false); // Set isLoading to false once data is loaded
  }, [productDetail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const customerName = form.customerName.value;
    const address = form.address.value;
    const additionalInfo = form.additionalInfo.value || "N/A";
    const phoneNumber = Number(form.phoneNumber.value);
    const booking = {
      productId: productDetail?._id,
      quantity: Number(form.quantity.value),
    };
    const service = {
      customerName,
      products: [booking],
      address,
      additionalInfo,
      phoneNumber,
    };

    const token = localStorage.getItem("token");

    fetch("https://ecomannoor.vercel.app/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(service),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Success!",
            text: "Order Completed Successfully!",
            icon: "success",
            confirmButtonText: "Cool",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Order Failed!",
            icon: "error",
            confirmButtonText: "Okay",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    form.reset();
    closeModal();
  };

  const closeModal = () => {
    document.getElementById("my_modal_1").close();
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const increase = () => {
    if (cartAmount < productDetail?.quantity) {
      setcartAmount(cartAmount + 1);
    }
  };

  const decrease = () => {
    if (cartAmount > 1) {
      setcartAmount(cartAmount - 1);
    }
  };

  return (
    <div className="mx-2 md:mx-0 overflow-hidden">
      <div className="container mx-auto my-6">
        {
          // Show a loader if the data is still loading
          isLoading && (
            <div className="flex justify-center items-center h-screen">
              <DotLoader color="#000" />
            </div>
          )
        }
        <Helmet>
          <title>AN NOOR </title>
          <meta
            name="description"
            content={`Buy ${productDetail?.title} at the best price from AN NOOR. ${productDetail?.description}`}
          />
          <link
            rel="canonical"
            href={`https://mernecomnoor.vercel.app/api/product/${productDetail?._id}`}
          />
        </Helmet>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          <div>
            <div className="images">
              {/* <Images product={productDetail} /> */}
              {
                // Show a loader if the data is still loading
                !isLoading && productDetail?.image?.length > 0 ? (
                  <Images product={productDetail} />
                ) : (
                  <div className="flex justify-center items-center h-96">
                    <DotLoader color="#000" />
                  </div>
                )
              }
            </div>
          </div>
          <div className="right-side">
            <div className="wrapper">
              <h2 className="text-3xl md:text-2xl font-light mb-4 text-gray-700">
                {productDetail?.title || "Loading..."}
              </h2>
              <hr className="w-10 border-2 mt-5" />
              <p className="text-lg md:text-xl mt-2 text-black font-semibold mb-2">
                ৳ {productDetail?.price}
              </p>
              <p className="text-base md:text-lg text-blue-gray-900  mb-2">
                {productDetail?.policy}
              </p>
              <div className="relative">
                <label
                  htmlFor="sizes"
                  className="text-base md:text-lg text-blue-gray-700 mb-2 block"
                >
                  Sizes:
                </label>
                <select
                  id="sizes"
                  onChange={(e) => handleSizeChange(e.target.value)}
                  className="text-base md:text-lg text-blue-gray-700 mb-2 appearance-none bg-white border border-blue-gray-200 rounded px-3 py-2 pr-8 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {/* <option disabled selected>
                    Select Size
                  </option> */}
                  {productDetail?.sizes?.map((sizes, index) =>
                    sizes.split(",").map((size, subIndex) => (
                      <option key={`${index}-${subIndex}`} value={size}>
                        {size}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="relative mt-4">
                <label
                  htmlFor="color"
                  className="text-base md:text-lg text-blue-gray-700 mb-2 block"
                >
                  Color:
                </label>
                <select
                  id="color"
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="text-base md:text-lg text-blue-gray-700 mb-2 appearance-none bg-white border border-blue-gray-200 rounded px-3 py-2 pr-8 leading-tight focus:outline-none focus:border-blue-500"
                >
                  {/* <option disabled selected>
                    Select Color
                  </option> */}

                  {productDetail?.color?.map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-1 my-3 w-1/2 md:w-full">
                <button
                  id="decrease"
                  onClick={decrease}
                  className="w-1/3 md:w-12 rounded-xl bg-blue-gray-100 md:h-12"
                >
                  -
                </button>
                <button
                  id="amount-in-cart"
                  className="w-1/3 h-12 md:w-12 rounded-xl bg-blue-gray-100 md:h-12"
                >
                  {cartAmount}
                </button>
                <button
                  id="increase"
                  onClick={increase}
                  className="w-1/3 md:w-12 rounded-xl bg-blue-gray-100 md:h-12"
                >
                  +
                </button>
              </div>
              <div className="flex md:flex-row gap-3">
                <button
                  className="btn btn-outline"
                  onClick={() =>
                    handleAddToCart(productDetail._id, Number(cartAmount))
                  }
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Buy Now
                </button>
              </div>
              <div className="mt-5">
                <div>
                  <p>
                    {productDetail.quantity > 0 ? (
                      <span className="text-green-500">In Stock</span>
                    ) : (
                      <span className="text-red-500">Out of Stock</span>
                    )}
                  </p>
                </div>
                <p className="text-base md:text-xs text-blue-gray-700">
                  <div>
                    ................................................................................
                  </div>
                  Category: {productDetail?.category?.name}
                  <div>
                    ................................................................................
                  </div>
                </p>
              </div>
            </div>
            <div className="mt-4">
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <div className="flex justify-end">
                    <button
                      className="text-gray-500 mb-4 hover:text-gray-700 cursor-pointer"
                      onClick={closeModal}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <h3 className="font-bold text-lg">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-5">
                        <div className="relative h-11 w-full min-w-[200px]">
                          <input
                            required
                            defaultValue={user?.displayName}
                            name="customerName"
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                          />
                          <label className="behtmlFore:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Customer Name *
                          </label>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                          <input
                            name="address"
                            required
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                          />
                          <label className="behtmlFore:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Full Address *
                          </label>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                          <input
                            type="number"
                            name="phoneNumber"
                            required
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                          />
                          <label className="behtmlFore:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Your Phone Number *
                          </label>
                        </div>
                        {/* <div className="relative h-11 w-full min-w-[200px]">
                          <input
                            type="email"
                            name="email"
                            required
                            defaultValue={user?.email}
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                          />
                          <label className="behtmlFore:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Your Email
                          </label>
                        </div> */}
                        <div className="relative h-11 w-full min-w-[200px]">
                          <input
                            name="additionalInfo"
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                          />
                          <label className="behtmlFore:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Additional Info
                          </label>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                          <input
                            name="quantity"
                            type="number"
                            required
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                          />
                          <label className="behtmlFore:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Quantity *
                          </label>
                        </div>
                        <button type="submit" className="btn">
                          Buy this product
                        </button>
                      </div>
                    </form>
                  </h3>
                </div>
              </dialog>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mx-20 lg:mx-36">
          <div className="flex  md:flex-row justify-between items-center">
            <button
              className={`tab-btn mb-2 md:mb-0 ${
                activeTab === "description" ? "active" : ""
              }`}
              onClick={() => handleTabClick("description")}
            >
              <span
                className={`${
                  activeTab === "description"
                    ? "border-b-2 border-blue-500"
                    : ""
                }`}
              >
                Description
              </span>
            </button>

            <button
              className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => handleTabClick("reviews")}
            >
              <span
                className={`${
                  activeTab === "reviews" ? "border-b-2 border-blue-500" : ""
                }`}
              >
                Reviews
              </span>
            </button>
          </div>
          <div className="tab-content">
            {activeTab === "description" && (
              <div className="mt-8">
                <p className="text-base md:text-lg text-blue-gray-900 mb-5">
                  Title: {productDetail?.description?.title}
                </p>
                {/* whyShouldBuy is array */}
                <h1 className="text-base md:text-xl font-semibold mb-2">
                  Why Should You Buy This Product?{" "}
                </h1>
                {productDetail?.description?.whyShouldBuy?.map(
                  (item, index) => (
                    <p
                      key={index}
                      className="text-base md:text-lg text-blue-gray-900 mb-2"
                    >
                      {index + 1}: {item}
                    </p>
                  )
                )}
                <div className=" text-base md:text-lg mt-3">
                  Extra Description:{" "}
                  <h1 className=" text-base md:text-lg text-blue-gray-900 mb-2">
                    <h1 className="">
                      {productDetail?.description?.extraInfo}
                    </h1>
                  </h1>
                </div>
                {/* Display other description data here */}
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="mt-8">
                {productDetail.review.length === 0 && (
                  <p className="text-base md:text-lg text-red-700 mb-4">
                    No reviews yet.
                  </p>
                )}
                {productDetail.review.map((review) => (
                  <div key={review._id} className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl font-bold text-blue-500">
                        Rating: {review.rating} / 5
                      </span>
                      <span className="text-gray-600 ml-2">|</span>
                      <span className="text-gray-600 ml-2">
                        By User: {productDetail.addedBy.username}
                      </span>
                    </div>
                    <p className="text-base md:text-lg text-blue-gray-900 mb-2">
                      {review.review}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
