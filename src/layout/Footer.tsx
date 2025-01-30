import uni_logo from "../assets/images/uni-bayreuth-logo.png";
import fim_logo from "../assets/images/fim-logo.svg";
import fhg_logo from "../assets/images/fhg-logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 w-full mt-10">
      <div className="flex justify-between items-center w-7/12 mt-10 mb-5">
        <img className="w-1/4 h-auto" src={uni_logo} alt={"Uni Bayreuth"} />
        <img className="w-1/4 h-auto" src={fim_logo} alt={"FIM"} />
        <img className="w-1/4 h-auto" src={fhg_logo} alt={"FHG"} />
      </div>

      <div className="flex justify-center items-center w-full my-5 gap-10">
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
