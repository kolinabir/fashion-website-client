import { useState, useEffect } from "react";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://mern-ecom-backend-henna.vercel.app/api/categories/");
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
    <div className="px-4 bg-blue-gray-100">
      <div className="flex w-full gap-2">
        {categories.map((category, index) => (
          <div key={index} className="py-1 text-center">
            <div>
              <h3 className="text-base text-black font-normal">{category.name + " " + "|"}</h3>
            </div>
            {/* Add additional category-specific information or images here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
