import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { imageUpload } from "../../api/utils";

const UpdateProduct = () => {
  const product = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [whyShouldBuyCount, setWhyShouldBuyCount] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch categories from the API
    if (product?.data?.description?.whyShouldBuy) {
      setWhyShouldBuyCount(product?.data?.description?.whyShouldBuy.length);
    }
    fetch("https://mernecomnoor.vercel.app/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      });
  }, [product?.data?.description?.whyShouldBuy]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let categoryId = "";
    categories.map((category) => {
      if (category.name === selectedCategory) {
        categoryId = category._id;
      }
    });
    const form = e.target;
    const sellerName = form.sellerName.value;
    const title = form.title.value;
    const price = form.price.value;
    const description = {
      title: form.descriptionTitle.value,
      whyShouldBuy: Array.from({ length: whyShouldBuyCount }).map(
        (_, index) => {
          return form[`whyShouldBuy${index}`].value;
        }
      ),
      extraInfo: form.extraInfo.value || "",
    };

    const images = form.image.files; // Access multiple files
    const imageData = await Promise.all(
      Array.from(images).map(async (image) => {
        const imageData = await imageUpload(image);
        return imageData.data.display_url;
      })
    );
    const companyName = form.companyName.value;
    const size = form.size.value;
    const sizes = [];
    sizes.push(size);
    const color = form.color.value;
    const policy = form.policy.value;
    const quantity = form.quantity.value;

    const service = {
      sellerName,
      title,
      price,
      description,
      image: imageData, // Pass the array of image URLs
      companyName,
      size,
      sizes,
      color,
      category: categoryId,
      policy,
      quantity,
    };

    const token = localStorage.getItem("token");

    fetch(`https://mernecomnoor.vercel.app/api/product/${product?.data?._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(service),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          Swal.fire({
            title: "Success!",
            text: "Product details update successfully!",
            icon: "success",
            confirmButtonText: "Cool",
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
        setLoading(false);
      });
    form.reset();
  };

  return (
    <div>
      <div className="flex items-center justify-center py-6">
        <h2
          className="text-3xl font-bold bg-black rounded-lg p-4 text-white shadow-lg
                "
        >
          <span className="text-red-700">Update</span> Your Product Details..
        </h2>
      </div>
      <div className="container my-5 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6">
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
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="title"
                id="title"
                defaultValue={product?.data?.title}
                className="block py-2.5 px-0 w-full text-sm text-gray-800  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Product Name
              </label>
            </div>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="companyName"
              id="companyName"
              defaultValue={product?.data?.companyName}
              className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Company Name
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="sellerName"
                id="sellerName"
                defaultValue={product?.data?.addedBy.username}
                readOnly
                className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Seller Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="size"
                id="size"
                defaultValue={product?.data?.sizes}
                className="block py-2.5 px-0 w-full text-sm text-gray-800  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Size
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="price"
                id="price"
                defaultValue={product?.data?.price}
                className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                defaultValue={product?.data?.color}
                className="block py-2.5 px-0 w-full text-sm text-gray-800  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Color
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="category"
                className="text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0  dark:text-blue-500"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="policy"
                id="policy"
                defaultValue={product?.data?.policy}
                className="block py-2.5 px-0 w-full text-sm text-gray-800  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Policy
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="quantity"
                id="quantity"
                className="block py-2.5 px-0 w-full text-sm text-gray-800  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                defaultValue={product?.data?.quantity}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Quantity
              </label>
            </div>
          </div>
          <div>
            <h1 className="text-xl text-center my-3">
              Description of the product
            </h1>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="descriptionTitle"
                id="descriptionTitle"
                className="block py-2.5 px-0 w-full text-sm text-gray-800  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                defaultValue={product?.data?.description?.title || ""}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Description Title
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
                    defaultValue={
                      product?.data?.description?.whyShouldBuy?.[index] || ""
                    }
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Why Should You Buy Point {index + 1 || ""}
                  </label>
                </div>
              ))
            }
            <button
              type="button"
              onClick={() => setWhyShouldBuyCount((prev) => prev + 1)}
              className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add More Why Should You Buy Points
            </button>
            <div className="relative mt-4 z-0 w-full mb-6 group">
              <textarea
                type="text"
                name="extraInfo"
                id="extraInfo"
                className="block py-2.5 px-0 w-full text-sm text-gray-800  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                defaultValue={product?.data?.description?.extraInfo || ""}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                extraInfo
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#349234] hover:bg-blue-800 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
