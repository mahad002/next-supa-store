import React from 'react';

const ProductCard = ({ product }) => {
  const { name, category, description } = product;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 cursor-pointer hover:shadow-xl" style={{ height: '200px', width: '300px' }}>
      <div className="px-4 py-2">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 mb-2">{category}</p>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;