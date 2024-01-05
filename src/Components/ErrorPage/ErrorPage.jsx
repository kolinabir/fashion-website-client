import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Footer from "../../page/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const ErrorPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="container mx-auto h-screen flex flex-col justify-center items-center">
        
        <img
          src="https://i.ibb.co/C051gJT/Pngtree-error-404-page-not-found-6501259.png"
          alt="Error Illustration"
          className="w-96 h-96 mb-8"
        />
        <Link to="/" className="flex items-center mt-6">
          <FaHome className="text-xl mr-2" />
          Back to Home
        </Link>
        
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ErrorPage;
