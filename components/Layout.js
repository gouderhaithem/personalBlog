import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { Toaster } from "react-hot-toast";
export default function Layout({ children }) {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-gray-900 min-h-screen text-white">
      <Navbar />
      <Toaster position="top-center" />
      {children}
      <Footer />
    </div>
  );
}
