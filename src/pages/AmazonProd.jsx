import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AmazonProd = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < Math.round(rating) ? "text-yellow-500" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  if (loading) return <div className="text-center text-xl font-bold p-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-500 font-bold p-10">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow-md p-5 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-lg font-bold mt-3 text-gray-800">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.category}</p>

            <div className="flex items-center text-lg">
              {renderStars(product.rating.rate)}
              <p className="text-gray-500 text-sm ml-2">({product.rating.count} reviews)</p>
            </div>

            <p className="text-green-600 font-bold text-xl mt-2">${product.price}</p>

            <Link to={`/products/${product.id}`}>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-3 transition duration-300">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmazonProd;
