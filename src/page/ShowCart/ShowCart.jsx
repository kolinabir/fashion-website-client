import { useContext, useEffect, useState } from "react";
import ServiceCart from "./ServiceCart";
import { Helmet } from "react-helmet-async";
import ConfirmServices from "./ConfirmProduct/ConfirmProduct";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import MainDashboard from "../../Components/Navbar/MainDashboard";
import NonUserCart from "./nonUserCart";

const ShowCart = () => {
  const [cart, setCart] = useState([]);
  console.log(cart.map((item) => item));
  const [allCart, setAllCart] = useState([]);
  const { user } = useContext(AuthContext);

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

  return (
    <div className="flex">
      <div>
        <MainDashboard></MainDashboard>
      </div>
      <div className="flex-grow">
       

{user?.role === "user" && (
  <div>
  <h2 className="text-center text-3xl dark:text-white font-normal my-4">
    CART
  </h2>
  {cart.length === 0 ? (
    <p className="text-center text-red-700">No Items in your cart</p>
  ) : (
    <div className="grid md:grid-cols-1 gap-2 px-2">
      {user ? (
        // User is logged in, render ServiceCart component
        cart.orders.map((service) => (
          <ServiceCart
            key={service._id}
            service={service}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        // User is not logged in, render product details directly
        cart?.map((product) => (
          <NonUserCart
            key={product._id}
            product={product}
            handleDelete={handleDelete}
          />
        ))
      )}
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
                  MY PENDING WORK
                </h2>
                {allCart.length === 0 ? (
                  <p className="text-center text-red-700">No Pending Work</p>
                ) : (
                  <div className="table-responsive overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>
                            {/* <label>
                    <input type="checkbox" className="checkbox" />
                  </label> */}
                          </th>
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
