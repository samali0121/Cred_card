import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap CSS
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js"); // ✅ Bootstrap JS
    }, []);

    return (
        <>
            <Header /> {/* ✅ Header always visible */}
            <Component {...pageProps} />
            <Footer /> {/* ✅ Footer always visible */}
        </>
    );
}

export default MyApp;
