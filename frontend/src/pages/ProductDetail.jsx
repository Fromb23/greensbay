import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the URL

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
      {/* You can fetch and display full product details using the ID */}
    </div>
  );
}

export default ProductDetail;