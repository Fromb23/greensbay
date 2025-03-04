import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ProductDescription from '../components/ProductDescription';
import DeliveryAddress from '../components/DeliveryAddress';

const ProductDetail = () => {
  const [product, setProducts] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:5001/api/products/fetch-product/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch product");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched product:", data);
        setProducts(data)
  })
      .catch((error) => console.error("Error fetching product:", error));
  }
  , [id]);

  if (!product) return <div className="text-center py-8 text-xl">Product not found</div>;

  return (
    <div className="md:ml-35 py-6 px-3 md:px-8 lg:px-16">
      <Header />
      <div className="flex flex-col md:flex-row justify-between items-start ">
        <div className="flex mb-3 w-full md:w-1/2">
          <ProductDescription product={product} />
        </div>

        <div className=" flex justify-start md:w-1/2">
          <DeliveryAddress product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;