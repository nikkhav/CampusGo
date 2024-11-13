import Header from "@/layout/Header.tsx";
import Footer from "@/layout/Footer.tsx";

const Layout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Header/>
            {children}
            <Footer/>
        </div>
    );
};

export default Layout;