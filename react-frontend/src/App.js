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
import Product from "./pages/Product";
import LoginPage from "../src/pages/LoginPage/LoginPage";
import RegisterPage from "../src/pages/RegisterPage/RegisterPage";
import LandingPage from "./pages/LandingPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ForgotPasswordSetPage from "../src/pages/ForgotPasswordSetPage/ForgotPasswordSetPage";
import UserProfilePage from "../src/pages/UserProfile/UserProfile";
import Admin from "../src/pages/Admin";
import EditListing from "./pages/EditListing";
import MyListings from "./pages/MyListings";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/CreateListing" element={<CreateListing />} />
          <Route path="/EditListing/:productID" element={<EditListing />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="/user/register" element={<RegisterPage />} />
          <Route path="/user/forgotpassword" element={<ForgotPasswordPage />} />
          <Route
            path="/user/forgotsetpassword"
            element={<ForgotPasswordSetPage />}
          />
          <Route path="myListings" element={<MyListings />} />
          <Route path="/user/userprofile" element={<UserProfilePage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
