import { useContext, useEffect, useState } from "react";
import ServiceCart from "./ServiceCart";
import { Helmet } from "react-helmet-async";
import ConfirmServices from "./ConfirmProduct/ConfirmProduct";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import MainDashboard from "../../Components/Navbar/MainDashboard";
import NonUserCart from "./nonUserCart";

const ShowCart = () => {
  const [cart, setCart] = useState([]);
  console.log(cart);

  const [allCart, setAllCart] = useState([]);
  const { user } = useContext(AuthContext);
  const shippingFee = 10; // Sample shipping fee

  useEffect(() => {
    const fetchCartData = async () => {
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
          console.log(error);
        }
      } else {
        // User is not logged in, fetch product details from localStorage
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
          } catch (error) {
            console.error("Error fetching product data:", error);
          }
        }
        setCart(productDetails);
      }
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
      fetch(`https://mern-ecom-backend-henna.vercel.app/api/order/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCart((prevCartItems) =>
              prevCartItems.filter((item) => item._id !== itemId)
            );
            removeFromLocalStorage(itemId);
          }
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    } else {
      removeFromLocalStorage(itemId);
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
  const subtotal = cart.length > 0 ? cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0) : 0;
  
  // console.log("Cart:", cart);
  const totalPrice = subtotal + shippingFee;


  return (
    <div className="flex">
      <div>
        <MainDashboard></MainDashboard>
      </div>
      <div className="flex-grow">
        {user?.role === "user" ? (
          <div>
            <h2 className="text-center text-3xl dark:text-white font-normal my-4">
              CART
            </h2>
            {cart.length === 0 ? (
              <p className="text-center text-red-700">No Items in your cart</p>
            ) : (
              <div className="grid md:grid-cols-1 gap-2 px-2">
                {cart?.orders?.map((service) => (
                  <ServiceCart
                    key={service._id}
                    service={service}
                    handleDelete={handleDelete}
                  ></ServiceCart>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-center text-3xl dark:text-white font-normal my-4">
              CART
            </h2>
            {cart.length === 0 ? (
              <p className="text-center text-red-700">No Items in your cart</p>
            ) : (
              // if user isn't logged in

            
              <div className="grid md:grid-cols-1 gap-2 px-2">
                <div className="grid md:gap-6 md:grid-cols-4 md:mx-20">
                  {/* Product table */}
                  <div className="overflow-x-auto md:grid md:col-span-3">
                    <table className="min-w-full divide-y divide-gray-200">
                      {/* Table header */}
                      <thead className="">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            SubTotal
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="bg-white divide-y divide-gray-200">
                        {cart?.map((product) => (
                          <NonUserCart
                            key={product._id}
                            product={product}
                            handleDelete={handleDelete}
                          ></NonUserCart>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Cart totals */}
                  <div className="flex  flex-col md:border-l border-gray-300 ">
                    <div className="md:mx-7">
                      <div>
                        <h2 className="text-[#3A89B4]  text-lg font-semibold">
                          CART TOTAL
                        </h2>
                      </div>
                      <div className="flex justify-between ">
                        <p className="text-base font-normal">Subtotal:</p>{" "}
                        <p>${subtotal}</p>
                      </div>
                      <hr />
                      <div>
                        <div className="flex justify-between ">
                          <p className="text-base font-normal">Shipping Fee:</p>{" "}
                          <p>${shippingFee}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="flex justify-between ">
                        <p className="text-lg font-semibold">Total: </p>{" "}
                        <p>${totalPrice}</p>
                      </div>
                    </div>
                    <button className="bg-[#3A89B4] text-white px-4 py-2 mt-4 rounded-md mx-7 hover:bg-[#1F5F78] focus:outline-none">
                      Proceed to Buy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap justify-center">
          <Helmet>
            <title>AN NOOR | Cart</title>
          </Helmet>

          <div className="overflow-x-auto w-full">
            {user?.role === "admin" && (
              <div>
                <h2 className="text-center text-3xl font-normal underline my-4">
                  MY PENDING ORDERS
                </h2>
                {allCart.length === 0 ? (
                  <p className="text-center text-red-700">No Pending Work</p>
                ) : (
                  <div className="table-responsive overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Customer Name</th>
                          <th>Product ID</th>
                          <th>Customer Email</th>
                          <th>Customer Phone Number</th>
                          <th>district</th>
                          <th>Thana</th>
                          <th>Full Address</th>
                          <th>Price</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allCart.map((booking) => (
                          <ConfirmServices
                            key={booking._id}
                            booking={booking}
                            handleBookingConfirm={handleBookingConfirm}
                          ></ConfirmServices>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCart;
