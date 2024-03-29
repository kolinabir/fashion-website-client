import { useContext, useEffect, useState } from "react";
import ServiceCart from "./ServiceCart";
import { Helmet } from "react-helmet-async";
import ConfirmServices from "./ConfirmProduct/ConfirmProduct";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import NonUserCart from "./nonUserCart";
import { DotLoader } from "react-spinners";
import Swal from "sweetalert2";

const ShowCart = () => {
  const [cart, setCart] = useState([]);
  const [allCart, setAllCart] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const { user, setCartChange, cartChange } = useContext(AuthContext);
  const shippingFee = 10;
  const handleOrder = () => {
    const customerName = document.getElementById("name").value;
    const phoneNumber = document.getElementById("phoneNo").value;
    const address = document.getElementById("address").value;
    let products = [];
    console.log(cart?.orders[0]?.products);
    if (user) {
      products = cart?.orders[0]?.products?.map((order) => {
        return {
          productId: order._id,
          quantity: order.quantity,
        };
      });
      console.log(products, "products");
    } else {
      products = cart.map((product) => {
        return {
          productId: product._id,
          quantity: product.quantity,
        };
      });
    }
    const order = {
      customerName,
      products: products,
      address,
      phoneNumber: Number(phoneNumber),
    };

    const token = localStorage.getItem("token");

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
      if (user) {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(
            `https://mern-ecom-backend-henna.vercel.app/api/cart/${user._id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const data = await response.json();
          setCart(data.data);
        } catch (error) {
          console.error("Error fetching user cart data:", error);
        }
      } else {
        // Fetch product details from localStorage for non-logged-in users
        const cartData = JSON.parse(localStorage.getItem("cart")) || [];
        const productDetails = [];

        for (const item of cartData) {
          try {
            const response = await fetch(
              `https://mern-ecom-backend-henna.vercel.app/api/product/${item.productId}`
            );
            const data = await response.json();
            const mainData = data.data;
            productDetails.push({ ...mainData, quantity: item.quantity });
            setCartChange(!cartChange);
          } catch (error) {
            console.error("Error fetching product data:", error);
          }
        }

        setCart(productDetails);
      }

      setLoading(false); // Set loading to false when data fetching is done
    };

    fetchCartData();
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(
      `https://mern-ecom-backend-henna.vercel.app/api/order?status=pending`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAllCart(data.data);
      });
  }, [user]);

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

  const handleBookingConfirm = (id, newStatus) => {
    fetch(`https://mern-ecom-backend-henna.vercel.app/api/order/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Update state with the new status
          const updatedOrder = allCart.map((booking) => {
            if (booking._id === id) {
              booking.status = newStatus;
            }
            return booking;
          });
          setAllCart(updatedOrder);
        }
      });
  };
  // Calculate subtotal and total

  return (
    // <div className="flex h-[80vh] md:mx-20 lg:mx-36">
    //   <div className="flex-grow">
    //     {loading ? ( // Display loading state
    //       <div className="flex items-center justify-center h-screen">
    //         <DotLoader color="#36d7b7" />{" "}
    //       </div>
    //     ) : user?.role === "user" ? (
    //       <div>
    //         <h2 className="text-center text-3xl dark:text-white font-normal my-4">
    //           CART
    //         </h2>
    //         {cart.length === 0 ? (
    //           <div className="text-center">
    //             <p className="text-red-700 mt-4 text-lg font-semibold">
    //               Oops! Your cart is empty.
    //             </p>
    //             <p className="text-gray-600">
    //               Add some items to your cart to get started.
    //             </p>
    //           </div>
    //         ) : (
    //           <div className="grid md:grid-cols-1 gap-2 px-2">
    //             {cart?.orders?.map((service) => (
    //               <ServiceCart
    //                 key={service._id}
    //                 service={service}
    //                 handleDelete={handleDelete}
    //               ></ServiceCart>
    //             ))}
    //           </div>
    //         )}
    //       </div>
    //     ) : (
    //       <div>
    //         <h2 className="text-center text-3xl dark:text-white font-normal my-4">
    //           CART
    //         </h2>
    //         {cart.length === 0 ? (
    //           <div className="text-center">
    //             <p className="text-red-700 mt-4 text-lg font-semibold">
    //               Oops! Your cart is empty.
    //             </p>
    //             <p className="text-gray-600">
    //               Add some items to your cart to get started.
    //             </p>
    //           </div>
    //         ) : (
    //           // if user isn't logged in

    //           <div className="grid md:grid-cols-1 gap-2 px-2">
    //             <div className="grid md:gap-6 md:grid-cols-4 md:mx-20">
    //               {/* Product table */}
    //               <div className="overflow-x-auto md:grid md:col-span-3">
    //                 <table className="min-w-full divide-y divide-gray-200">
    //                   {/* Table header */}
    //                   <thead className="">
    //                     <tr>
    //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                         Product
    //                       </th>
    //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                         Price
    //                       </th>
    //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                         Quantity
    //                       </th>
    //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                         SubTotal
    //                       </th>
    //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
    //                     </tr>
    //                   </thead>
    //                   {/* Table body */}
    //                   <tbody className="bg-white divide-y divide-gray-200">
    //                     {cart?.map((product) => (
    //                       <NonUserCart
    //                         key={product._id}
    //                         product={product}
    //                         handleDelete={handleDelete}
    //                       ></NonUserCart>
    //                     ))}
    //                   </tbody>
    //                 </table>
    //               </div>
    //               {/* Cart totals */}
    //               <div className="flex flex-col md:border-l border-gray-300 ">
    //                 <div className="md:mx-7">
    //                   <div>
    //                     <h2 className="text-[#3A89B4]  text-lg font-semibold">
    //                       CART TOTAL
    //                     </h2>
    //                   </div>
    //                   <div className="flex justify-between ">
    //                     <p className="text-base font-normal">Subtotal:</p>{" "}
    //                     <p>৳{roundedSubtotal}</p>
    //                   </div>
    //                   <hr />
    //                   <div>
    //                     <div className="flex justify-between ">
    //                       <p className="text-base font-normal">Shipping Fee:</p>{" "}
    //                       <p>৳{shippingFee}</p>
    //                     </div>
    //                   </div>
    //                   <hr />
    //                   <div className="flex justify-between ">
    //                     <p className="text-lg font-semibold">Total: </p>{" "}
    //                     <p>৳{totalPrice}</p>
    //                   </div>
    //                 </div>
    //                 <button className="bg-[#3A89B4] text-white px-4 py-2 mt-4 rounded-md mx-7 hover:bg-[#1F5F78] focus:outline-none">
    //                   Proceed to Buy
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     )}

    //     <div className="flex flex-wrap justify-center">
    //       <Helmet>
    //         <title>AN NOOR | Cart</title>
    //       </Helmet>

    //       <div className="overflow-x-auto w-full">
    //         {user?.role === "admin" && (
    //           <div>
    //             <h2 className="text-center text-3xl font-normal underline my-4">
    //               MY PENDING ORDERS
    //             </h2>
    //             {allCart.length === 0 ? (
    //               <p className="text-center text-red-700">No Pending Work</p>
    //             ) : (
    //               <div className="table-responsive overflow-x-auto">
    //                 <table className="table w-full">
    //                   <thead>
    //                     <tr>
    //                       <th></th>
    //                       <th>Customer Name</th>
    //                       <th>Product ID</th>
    //                       <th>Customer Email</th>
    //                       <th>Customer Phone Number</th>
    //                       <th>district</th>
    //                       <th>Thana</th>
    //                       <th>Full Address</th>
    //                       <th>Price</th>
    //                       <th>Status</th>
    //                     </tr>
    //                   </thead>
    //                   <tbody>
    //                     {allCart.map((booking) => (
    //                       <ConfirmServices
    //                         key={booking._id}
    //                         booking={booking}
    //                         handleBookingConfirm={handleBookingConfirm}
    //                       ></ConfirmServices>
    //                     ))}
    //                   </tbody>
    //                 </table>
    //               </div>
    //             )}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          sneekpeeks
        </a>
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
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {/* <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">
                  Nike Air Max Pro 8888 - Super Light
                </span>
                <span className="float-right text-gray-400">42EU - 8.5US</span>
                <p className="text-lg font-bold">$138.99</p>
              </div>
            </div> */}
            {cart?.orders?.map((service) => (
              <ServiceCart
                key={service._id}
                service={service}
                handleDelete={handleDelete}
              ></ServiceCart>
            ))}
            {!user ? (
              <div>
                {cart?.map((product) => (
                  <NonUserCart
                    key={product._id}
                    product={product}
                    handleDelete={handleDelete}
                  ></NonUserCart>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {/* Select Shipping Method */}
          {/* <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form> */}
        </div>
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
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  {cart?.totalPrice} TK
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">{""}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {cart?.totalPrice}
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
      </div>
    </div>
  );
};

export default ShowCart;
