import uni_logo from "../assets/uni-bayreuth-logo.png";
import fim_logo from "../assets/fim-logo.svg";
import fhg_logo from "../assets/fhg-logo.svg";

const Footer = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 w-full mt-10">
            <div className="flex justify-between items-center w-7/12 mt-10 mb-5">
                <img className="w-1/4 h-auto" src={uni_logo} alt={"Uni Bayreuth"}/>
                <img className="w-1/4 h-auto" src={fim_logo} alt={"FIM"}/>
                <img className="w-1/4 h-auto" src={fhg_logo} alt={"FHG"}/>
            </div>
        </div>
    );
};

export default Footer;
