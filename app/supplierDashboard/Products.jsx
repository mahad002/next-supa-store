import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductPage from './ProductPage';

const Products = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  if (selectedProduct) {
    return <ProductPage product={selectedProduct} />;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
      ))}
    </div>
  );
};

export default Products;
