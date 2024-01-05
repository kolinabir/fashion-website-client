import { useContext, useEffect, useState } from "react";
import ServiceCart from "./ServiceCart";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import ConfirmServices from "./ConfirmService/ConfirmServices";
// import { useLoaderData } from "react-router-dom";

const ShowCart = () => {
  // const allData = useLoaderData();
  // console.log(allData);
  const [cart, setCart] = useState([]);
  const [allCart, setAllCart] = useState([]);

  console.log(allCart);
  // const [pending, setPending] = useState([]);
  const { user } = useContext(AuthContext);
  //  console.log(cart);
  useEffect(() => {
    fetch(`https://fashion-server-nine.vercel.app/orders/${user?.email}`,{credentials: 'include'} )
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  useEffect(() => {
    fetch(`https://fashion-server-nine.vercel.app/serviceMail/${user?.email}`,{credentials: 'include'} )
      .then((res) => res.json())
      .then((data) => {
        setAllCart(data);
      });
  }, [user]);

  const handleDelete = (itemId) => {
    fetch(`https://fashion-server-nine.vercel.app/deleteOrder/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deletedCount === 1) {
          setCart((prevCartItems) =>
            prevCartItems.filter((item) => item._id !== itemId)
          );
        }
      });
  };

  const handleBookingConfirm = (id, newStatus) => {
    fetch(`https://fashion-server-nine.vercel.app/updateOrder/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
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
    <div>
      <h2 className="text-center font-normal text-3xl underline my-4">
        My Bookings
      </h2>
      <div className="flex flex-wrap justify-center">
        <Helmet>
          <title>FASHION | Cart</title>
        </Helmet>

        <div className="flex">
          {cart.length === 0 ? (
            <p className="text-red-700">You have no Booking Service at cart</p>
          ) : (
            cart.map((service) => (
              <ServiceCart
                key={service.id}
                handleDelete={handleDelete}
                service={service}
              />
            ))
          )}
        </div>

        <div className="overflow-x-auto w-full">
          <h2 className="text-center text-3xl font-normal underline my-4">
            MY PENDING WORK
          </h2>
          {allCart.length === 0 ? (
            <p className="text-center text-red-700">No Pending Work</p>
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Service Image</th>
                  <th>Service</th>
                  <th>Customer Email</th>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCart;
