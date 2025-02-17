import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDescription from '../components/ProductDescription';
import DeliveryAddress from '../components/DeliveryAddress';
import products from "/src/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(item => item.id === parseInt(id));

  if (!product) return <div className="text-center py-8 text-xl">Product not found</div>;

  return (
    <div className="py-6 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex w-full md:w-1/2">
          <ProductDescription product={product} />
        </div>

        <div className=" flex justify-start w-full md:w-1/2">
          <DeliveryAddress product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;