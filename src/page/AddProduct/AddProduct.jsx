import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import MainDashboard from "../../Components/Navbar/MainDashboard";
import { imageUpload } from "../../api/utils";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [whyShouldBuyCount, setWhyShouldBuyCount] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch categories from the API
    fetch("https://mernecomnoor.vercel.app/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      });
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const price = Number(form.price.value);
    const images = form.image.files; // Access multiple files
    const imageData = await Promise.all(
      Array.from(images).map(async (image) => {
        const imageData = await imageUpload(image);
        return imageData.data.display_url;
      })
    );
    const description = {
      title: form.descriptionTitle.value,
      whyShouldBuy: Array.from({ length: whyShouldBuyCount }).map(
        (_, index) => {
          return form[`whyShouldBuy${index}`].value;
        }
      ),
      extraInfo: form.extraInfo.value || "",
    };
    const companyName = form.companyName.value;
    const policy = form.policy.value;
    const singleSize = form.singleSize.value;
    const color = form.color.value.split(",");
    const quantity = Number(form.quantity.value);
    let categoryId = "";
    categories.forEach((category) => {
      if (category.name === selectedCategory) {
        categoryId = category._id;
      }
    });

    // Push singleSize value to the sizes array
    const sizes = [singleSize];
    const service = {
      title,
      sellerName: user.email,
      price,
      description,
      image: imageData, // Update to include multiple images as an array
      companyName,
      sizes, // Pushed singleSize value to the sizes array
      color,
      policy,
      category: categoryId,
      quantity,
    };

    const token = localStorage.getItem("token");

    fetch("https://mernecomnoor.vercel.app/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(service),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setLoading(false);
          form.reset();
          setWhyShouldBuyCount(1);
          Swal.fire({
            title: "Success!",
            text: "Product added successfully!",
            icon: "success",
            confirmButtonText: "Cool",
          });
        } else {
          Swal.fire({
            title: "Failed!",
            text: "Failed to add product!",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Swal.fire({
          title: "Failed!",
          text: "Failed to add service!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div className="flex ">
      <div>
        <MainDashboard></MainDashboard>
      </div>
      <div className="flex-grow ">
        <Helmet>
          <title>AN NOOR | Add Product</title>
        </Helmet>

        <div className="flex justify-center">
          <div className=" md:mx-4 md:my-6 my-3 p-6 ml-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl  font-medium md:font-extrabold text-center text-gray-800 dark:text-white md:mb-8">
              ADD A <span className="text-red-600">PRODUCT</span> HERE...
            </h2>
          </div>
        </div>
        <div className="ml-1 my-4">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div>
              <label htmlFor="image" className="block  mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full py-2.5 px-4 text-sm text-gray-800 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                multiple // Add the multiple attribute
              />
            </div>
            <div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block py-2.5 px-0 w-full text-sm text-gray-700  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Product Name
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-700  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Company Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="policy"
                  id="policy"
                  className="block py-2.5 px-0 w-full text-sm text-gray-700  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Policy
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="block py-2.5 px-0 w-full text-sm text-gray-700  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Price
                </label>
              </div>

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="color"
                  id="color"
                  className="block py-2.5 px-0 w-full text-sm text-gray-700  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Color
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  className="block py-2.5 px-0 w-full text-sm text-gray-700  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Quantity
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="singleSize"
                  id="singleSize"
                  className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Product Size
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <label
                  htmlFor="category"
                  className="text-sm text-gray-600 dark:text-gray-400 font-medium"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full py-2.5 px-4 text-sm text-gray-800 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h1 className="my-3 text-2xl text-center">Description</h1>
            <br />
            <div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="descriptionTitle"
                  id="descriptionTitle"
                  className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Title of Description
                </label>
              </div>
              {
                // Add multiple input fields for the description
                Array.from({ length: whyShouldBuyCount }).map((_, index) => (
                  <div key={index} className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name={`whyShouldBuy${index}`}
                      id={`whyShouldBuy${index}`}
                      className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      whyShouldBuy {index + 1}
                    </label>
                  </div>
                ))
              }
              {/* button to add more description fields */}
              <button
                type="button"
                onClick={() => setWhyShouldBuyCount((prev) => prev + 1)}
                className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add More whyShouldBuy Points
              </button>
              <div className="relative z-0 w-full mb-6 group">
                <textarea
                  type="text"
                  name="extraInfo"
                  id="extraInfo"
                  className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  extraInfo (optional)
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
