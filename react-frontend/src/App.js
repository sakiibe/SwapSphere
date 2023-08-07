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
import ForgotPasswordPage from "../src/pages/ForgotPasswordPage/ForgotPasswordPage";
import ForgotPasswordSetPage from "../src/pages/ForgotPasswordSetPage/ForgotPasswordSetPage";
import UserProfilePage from "../src/pages/UserProfile/UserProfile";
function App() {
  return (
    <BrowserRouter>
      <div className="app">
    
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/CreateListing" element={<CreateListing />} />
          <Route path="/product" element={<Product />} />
          <Route path = "/user/login" element = {<LoginPage />}/>
          <Route path = "/user/register" element = {<RegisterPage />}/>
          <Route path = "/user/forgotpassword" element = {<ForgotPasswordPage />}/>
          <Route path = "/user/forgotsetpassword" element = {<ForgotPasswordSetPage />}/>
          <Route path = "/user/userprofile" element = {<UserProfilePage />}/>
        </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
