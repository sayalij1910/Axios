import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import banner from "../assets/baner.jpg";

const Home = () => {
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
        console.error("Error fetching products:", error);
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
      <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <img src={banner} alt="Store Banner" className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {products.slice(0, 4).map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow-md p-5 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-3 text-gray-800">{product.title}</h2>
            <p className="text-gray-600 text-sm">{product.category}</p>

           
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

      <div className="text-center mt-8">
        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default Home;
