import close_acc from "@/assets/close-acc-bg.webp";
import {Link} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import logo from "@/assets/logo.png";

const CloseAcc = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-gray-100"
            style={{
                backgroundImage: `url(${close_acc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <Link to="/" className="absolute top-20 left-40 z-10">
                <button className="flex items-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none">
                    <ArrowLeft />
                </button>
            </Link>

            <div className="relative w-full max-w-md p-6 bg-white rounded-3xl shadow-md z-10">
                <img src={logo} alt="CampusGo Logo" className="w-20 mx-auto" />

                <h2 className="text-2xl text-center font-semibold text-gray-900 mt-4">
                    Konto löschen
                </h2>

                <form onSubmit={handleSubmit}>
                    <button
                        type="submit"
                        className="mt-4 w-full py-3 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                    >
                        Aktion bestätigen
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CloseAcc;