import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Product not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center text-xl font-bold p-10">Loading product...</div>;
  if (error) return <div className="text-center text-red-500 font-bold p-10">{error}</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
      <img 
  src={product.images?.[0]} 
  alt={product.title} 
  className="w-64 h-64 object-contain mx-auto mb-4" 
/>
      <p className="text-lg text-gray-700">{product.description}</p>
      <p className="text-xl font-semibold text-green-600 mt-2">${product.price}</p>
    </div>
  );
};

export default ProductDetails;
