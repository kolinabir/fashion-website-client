import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mern-ecom-backend-henna.vercel.app/api/categories/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const result = await response.json();

        if (result.success && result.data && Array.isArray(result.data)) {
          setCategories(result.data);
        } else {
          console.error("Invalid API response:", result);
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="border-t-0  border-b-neutral-300 border">
      <div className="lg:mx-36">
        <div className="px-4 mt-1  py-2 ">
          <div className="flex justify-center w-full gap-2">
            {categories.map((category, index) => (
              <div key={index} className="py-1 text-center">
                <div className="category-container">
                  <div className="category-header">
                    <NavLink
                      to={`/showProduct/category/${category._id}`}
                      className={
                        " font-normal hover:text-indigo-500 transition duration-300 ease-in-out"
                      }
                    >
                      <span
                        className="category-title text-base font-semibold text-black/70 hover:text-black transition-all duration-300
                  cursor-pointer "
                      >
                        {category.name}
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
