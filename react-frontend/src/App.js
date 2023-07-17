import "./App.css";
import ContactUsPage from "./pages/ContactUsPage";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FAQ from "./pages/FAQ";
import Wishlist from "./pages/Wishlist";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/CreateListing" element={<CreateListing />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
