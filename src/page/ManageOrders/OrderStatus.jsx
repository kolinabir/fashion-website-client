import React, { useState, useEffect } from "react";
import MainDashboard from "../../Components/Navbar/MainDashboard";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const CancelledOrders = () => {
  //get the status from state state={{ status: "pending" }}
  const location = useLocation();
  const status = location.state?.status;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://mern-ecom-backend-henna.vercel.app/api/order?status=${status}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        setOrders(data.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchOrders();
  }, [status]); // Fetch orders whenever the selected status changes

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://mern-ecom-backend-henna.vercel.app/api/order/change-status/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      // Update the status in the UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success(
        "Status updated successfully! Check Pending Orders for updated status."
      );
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  return (
    <div className="flex">
      <div>
        <MainDashboard />
      </div>
      <div className="w-[1500px] overflow-x-auto">
        <div>
          {status && (
            <h1 className="text-2xl text-center my-4 font-bold">
              {status === "cancelled" && "Cancelled Orders"}
              {status === "delivered" && "Delivered Orders"}
              {status === "processing" && "Processing Orders"}
              {status === "pending" && "Pending Orders"}
            </h1>
          )}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Product Title</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="text-center">
                  {error}
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td colSpan="5">
                      <strong>{order.customerName}</strong>
                    </td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleChangeStatus(order._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="delivered">Delivered</option>
                        <option value="processing">Processing</option>
                      </select>
                    </td>
                  </tr>
                  {order?.products?.map((product, productIndex) => (
                    <tr key={productIndex}>
                      <td></td>
                      <td>{product.productId?.title}</td>
                      <td>{product.productId?.price}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CancelledOrders;
