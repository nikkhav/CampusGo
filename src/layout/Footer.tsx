import uni_logo from "../assets/images/uni-bayreuth-logo.png";
import fim_logo from "../assets/images/fim-logo.svg";
import fhg_logo from "../assets/images/fhg-logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 w-full mt-10 py-6">
      <div className="flex flex-wrap justify-between items-center w-10/12 sm:w-7/12 mt-6 mb-4">
        <Link
          className="w-20 sm:w-3/12 h-auto"
          to="https://www.uni-bayreuth.de/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={uni_logo} alt="Uni Bayreuth" />
        </Link>
        <Link
          to="https://www.fim-rc.de/"
          target="_blank"
          rel="noreferrer"
          className="w-24 sm:w-1/4 h-auto"
        >
          <img src={fim_logo} alt="FIM" />
        </Link>
        <Link
          to="https://www.fhg.de/"
          target="_blank"
          rel="noreferrer"
          className="w-24 sm:w-1/4 h-auto"
        >
          <img src={fhg_logo} alt="FHG" />
        </Link>
      </div>

      <div className="flex flex-wrap justify-center items-center w-full my-4 gap-6 sm:gap-10">
        <Link to="/impressum" className="text-gray-600 hover:text-gray-900">
          Impressum
        </Link>
        <Link to="/datenschutz" className="text-gray-600 hover:text-gray-900">
          Datenschutz
        </Link>
        <Link to="/agb" className="text-gray-600 hover:text-gray-900">
          AGB
        </Link>
      </div>
    </div>
  );
};

export default Footer;
