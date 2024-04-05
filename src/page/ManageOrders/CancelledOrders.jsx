import React, { useState, useEffect } from "react";

const CancelledOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://mern-ecom-backend-henna.vercel.app/api/order?status=cancelled", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data.data);
        setOrders(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
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
          {orders.map((order, index) => (
            <React.Fragment key={index}>
              <tr>
                <td colSpan="4"><strong>{order.customerName}</strong></td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CancelledOrders;