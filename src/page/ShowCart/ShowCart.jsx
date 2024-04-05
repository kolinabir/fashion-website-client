/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import ServiceCart from "./ServiceCart";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import NonUserCart from "./nonUserCart";
import { DotLoader } from "react-spinners";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const ShowCart = () => {
  const [cart, setCart] = useState([]);
  const [allCart, setAllCart] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const { user, setCartChange, cartChange } = useContext(AuthContext);
  const navigate = useNavigate();
  const shippingFee = 120;
  const handleOrder = () => {
    setLoading(true);
    const customerName = document.getElementById("name").value;
    const phoneNumber = document.getElementById("phoneNo").value;
    const address = document.getElementById("address").value;
    let productsAll = [];
    if (user) {
      productsAll = cart?.orders[0]?.products?.map((order) => {
        console.log(order);

        return {
          productId: order.productId._id,
          quantity: Number(order.quantity),
        };
      });
    } else {
      productsAll = cart.map((product) => {
        return {
          productId: product.productId._id,
          quantity: product.quantity,
        };
      });
    }
    const order = {
      products: productsAll,
      customerName,
      address,
      phoneNumber: Number(phoneNumber),
    };
    console.log(cart);
    const token = localStorage.getItem("token");
    // https://mern-ecom-backend-henna.vercel.app/api/order
    fetch("https://mern-ecom-backend-henna.vercel.app/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(order),
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
          navigate("/products");
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
  };

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true); // Set loading to true when fetching data

      try {
        let fetchedCart = [];

        if (user != null) {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `https://mern-ecom-backend-henna.vercel.app/api/cart/${user._id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const data = await response.json();
          fetchedCart = data.data;
        } else {
          // Fetch product details from localStorage for non-logged-in users
          const cartData = JSON.parse(localStorage.getItem("cart")) || [];
          for (const item of cartData) {
            const response = await fetch(
              `https://mern-ecom-backend-henna.vercel.app/api/product/${item.productId}`
            );
            const data = await response.json();
            const mainData = data.data;
            fetchedCart.push({ ...mainData, quantity: item.quantity });
          }
        }

        setCart(fetchedCart);
        setLoading(false); // Set loading to false after data fetching is done
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setLoading(false); // Set loading to false if an error occurs during fetching
      }
    };

    fetchCartData();
  }, [cartChange, setCartChange, user]);

  let totalPriceForNu = 0;
  if (!user && cart.length > 0) {
    totalPriceForNu = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  const handleDelete = (itemId) => {
    if (user) {
      fetch(
        `https://mern-ecom-backend-henna.vercel.app/api/cart/delete/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Item deleted successfully");
            // Fetch the updated cart data again
            fetch(
              `https://mern-ecom-backend-henna.vercel.app/api/cart/${user._id}`,
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            )
              .then((response) => response.json())
              .then((data) => {
                setCart(data.data);
                setCartChange(!cartChange);
              })
              .catch((error) => {
                console.error("Error fetching updated cart data:", error);
              });
            removeFromLocalStorage(itemId);
          }
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    } else {
      removeFromLocalStorage(itemId);
      setCartChange(!cartChange);
      setCart(cart.filter((item) => item._id !== itemId));
    }
  };

  const removeFromLocalStorage = (itemId) => {
    // Handle delete for local storage
    const cartInfo = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cartInfo.filter((item) => item.productId !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>

          {loading && (
            <div className="flex justify-center items-center h-96">
              <DotLoader color="#10B981" loading={loading} size={50} />
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="mt-2 space-y-3">
              <div className="">
                {cart?.orders?.map((service) => (
                  <ServiceCart
                    key={service._id}
                    service={service}
                    handleDelete={handleDelete}
                  ></ServiceCart>
                ))}
              </div>
              {!user ? (
                <div className="">
                  <div className="grid grid-cols-2 gap-5 md:grid-cols-1">
                    {cart?.map((product) => (
                      <NonUserCart
                        key={product._id}
                        product={product}
                        handleDelete={handleDelete}
                      ></NonUserCart>
                    ))}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div>
              {(cart?.orders?.length > 0 &&
                cart.orders[0].products.length > 0) ||
                (cart.length > 0 ? (
                  <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-gray-400">
                      Complete your order by providing your payment details.
                    </p>
                    <div className="">
                      <label
                        htmlFor="name"
                        className="mt-4 mb-2 block text-sm font-medium"
                      >
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Your full name here"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        htmlFor="phoneNo"
                        className="mt-4 mb-2 block text-sm font-medium"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phoneNo"
                          name="phoneNo"
                          className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="01234567891"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        htmlFor="address"
                        className="mt-4 mb-2 block text-sm font-medium"
                      >
                        Billing Address
                      </label>
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative !w-full flex-shrink-0 sm:w-7/12">
                          <input
                            type="text"
                            id="address"
                            name="address"
                            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Address"
                          />
                          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <img
                              className="h-4 w-4 object-contain"
                              src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-b py-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Subtotal
                          </p>
                          <p className="font-semibold text-gray-900">
                            {cart?.totalPrice}
                            {!user && totalPriceForNu} TK
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Shipping
                          </p>
                          <p className="font-semibold text-gray-900">
                            {shippingFee}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Total
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {user ? (
                            <p className="text-2xl font-semibold text-gray-900">
                              {cart?.totalPrice + shippingFee} TK
                            </p>
                          ) : (
                            <p className="text-2xl font-semibold text-gray-900">
                              {totalPriceForNu + shippingFee} TK
                            </p>
                          )}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleOrder}
                      className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                    >
                      Place Order
                    </button>
                  </div>
                ) : (
                  <div className="text-center my-32">
                    <p className="text-xl font-medium">No items in the cart</p>
                    <Link
                      to="/products"
                      className="text-blue-500
                hover:text-blue-700 font-semibold
                 border-b-2 border-blue-500 bg-transparent
                "
                    >
                      {" "}
                      Go to products
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCart;
