import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ProductCard from "./ProductCard";
import MainDashboard from "../../Components/Navbar/MainDashboard";

const ManageProduct = () => {
  const [addedItem, setAddedItem] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`https://mernecomnoor.vercel.app/api/product/all`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAddedItem(data.data);
        setLoading(false);
      });
  }, []);

  const handleDelete = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        fetch(`https://mernecomnoor.vercel.app/api/product/${itemId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              Swal.fire({
                icon: "success",
                title: "Your Product has been deleted!",
                showConfirmButton: false,
                timer: 1500,
              });

              const newAddedItem = addedItem.products.filter(
                (item) => item._id !== itemId
              );
              setAddedItem({ ...addedItem, products: newAddedItem });
            }
          });
      }
    });
  };

  return (
    <div className="flex">
      <div>
        <MainDashboard></MainDashboard>
      </div>
      <div className="md:w-[1290px] ml-4 md:mx-4 md:my-6">
        <Helmet>
          <title>AN NOOR | Manage Service</title>
        </Helmet>
        {loading && (
          <div className="flex items-center justify-center h-screen">
            <div className="w-20 h-20 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin"></div>
          </div>
        )}
        {!loading && addedItem.length === 0 ? (
          <p>You Have No Service Available</p>
        ) : (
          <div>
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2">
                {addedItem?.products?.map((itemDetails, index) => (
                  <ProductCard
                    key={index}
                    itemDetails={itemDetails}
                    handleDelete={handleDelete}
                  ></ProductCard>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProduct;
