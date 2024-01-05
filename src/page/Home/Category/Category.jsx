import React from 'react';

const Category = () => {
  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Kitchen',
    'Toys',
    'Beauty',
    'Sports',
  ];

  return (
    <div className="px-4 bg-blue-gray-100">
      <div className="flex w-full gap-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className=" py-1 text-center "
          >
           <div className=''>
           <h3 className="text-base text-black font-normal">{category}</h3>
           </div>
            {/* You can add additional category-specific information or images here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
