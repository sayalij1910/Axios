import { Link } from "react-router-dom";
import logo from "../assets/logoo.png"; 

const Header = () => {
  return (
    <header className="bg-gray-300 text-black px-6 py-3 flex justify-between items-center">
    <Link to="/">
    <img
           src={logo}
           alt={"logo"}
           className="h-15 w-50 object-cover hover:opacity-80 transition-opacity duration-300"
         />
   </Link>
   <nav className="flex space-x-6">
     <Link to="/" className="text-lg font-semibold hover:text-gray-400 transition duration-300">Home</Link>
     <Link to="/products" className="text-lg font-semibold hover:text-gray-400 transition duration-300">Products</Link>
   </nav>
  </header>
  );
};

export default Header;