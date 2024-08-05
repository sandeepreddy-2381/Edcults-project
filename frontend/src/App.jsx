import { createContext, useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home/index';
import { Header } from './components/Header/index';
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Footer from './components/Footer';
import ProductModal from './components/ProductModal/index';
import Listing from './pages/Listings';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AuthForm from './pages/RegisterAndLogin';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Checkout from './pages/CheckOut';
import ForgotPassword from './pages/ForgotPassword/index';
import ResetPassword from './pages/ResetPassword/index';
import ThankYou from './pages/ThankYou';

const MyContext = createContext();

function App() {
  const [placeList, setPlaceList] = useState([]);
  const [isOpenModal, setIsOpenModel] = useState(false);
  const [isHeaderFooterShow, setIsHeaderFooterShow] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";
      console.log(userLoggedIn);
      setIsAuthenticated(userLoggedIn);
    };

    checkAuth();
    getCountry('https://countriesnow.space/api/v0.1/countries/');
  }, []);

  const handleLogin = () => {
    console.log("true");
    setIsAuthenticated(true);
    localStorage.setItem("userLoggedIn", 'true');
    console.log(isAuthenticated);
  };

  const handleSignOut = () => {

    console.log("true");

    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("token");
    console.log("Removed");
    setIsAuthenticated(false);
    window.location.href = "/auth";
  };

  const getCountry = async (url) => {
    try {
      const response = await axios.get(url);
      setPlaceList(response.data.data);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  const values = {
    placeList,
    setPlaceList,
    setIsOpenModel,
    isOpenModal,
    isHeaderFooterShow,
    setIsHeaderFooterShow,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Header 
          isAuthenticated={isAuthenticated}
          onSignOut={handleSignOut} 
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/forgotpassword" 
            element = {<ForgotPassword />} 
          />
          <Route 
            path="/resetpassword" 
            element = {<ResetPassword />} 
          />
          <Route 
            path="/cat/:id" 
            element={isAuthenticated ? <Listing /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/product/:id" 
            element={isAuthenticated ? <ProductDetails /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/cart" 
            element={isAuthenticated ? <Cart /> : <Navigate to="/auth" />} 
          />
          <Route path="/auth" element={<AuthForm onLogin={handleLogin} />} />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/orders" 
            element={isAuthenticated ? <Orders /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/checkout" 
            element={isAuthenticated ? <Checkout /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/thankyou" 
            element={isAuthenticated ? <ThankYou /> : <Navigate to="/auth" />} 
          />
        </Routes>
        
        <Footer />
        {isOpenModal && <ProductModal />}
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
