import { useContext, useEffect, useState } from "react";
import ServiceCart from "./ServiceCart";
import { Helmet } from "react-helmet-async";
import ConfirmServices from "./ConfirmProduct/ConfirmProduct";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import MainDashboard from "../../Components/Navbar/MainDashboard";

const ShowCart = () => {
  const [cart, setCart] = useState([]);
  const [allCart, setAllCart] = useState([]);
  const { user } = useContext(AuthContext);
  // console.log(user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(
      `https://mern-ecom-backend-henna.vercel.app/api/order/user/${user._id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        setCart(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
        // console.log(data.data);
        setAllCart(data.data);
      });
  }, [user]);

  const handleDelete = (itemId) => {
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
        }
      });
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
        {user.role === "user" && (
          <div>
            <h2 className="text-center text-3xl dark:text-white font-normal my-4">
              MY CART
            </h2>
            {cart.length === 0 ? (
              <p className="text-center text-red-700">No Items in your cart</p>
            ) : (
              <div className="grid md:grid-cols-1 gap-2 px-2">
                {cart.map((service) => (
                  <ServiceCart
                    key={service._id}
                    service={service}
                    handleDelete={handleDelete}
                  ></ServiceCart>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap justify-center">
          <Helmet>
            <title>FASHION | Cart</title>
          </Helmet>

          <div className="overflow-x-auto w-full">
            {user.role === "admin" && (
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
