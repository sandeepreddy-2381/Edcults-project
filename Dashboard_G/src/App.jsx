import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";

import DashBoard from "./pages/DashBoard/DashBoard.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Products from "./pages/Products/Products.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import EditProductForm from "./components/EditProduct/EditProductForm.jsx";
import AuthForm from "./pages/AuthForm/AuthForm.jsx";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";

      console.log(userLoggedIn);

      setIsAuthenticated(userLoggedIn);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    console.log("true");
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("token");
    console.log("Removed");
    setIsAuthenticated(false);
    window.location.href = "/auth";
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <BrowserRouter>
          <Sidebar
            isAuthenticated={isAuthenticated}
            onSignOut={handleSignOut}
          />
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <DashBoard /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/orders"
              element={isAuthenticated ? <Orders /> : <Navigate to="/auth" />}
            />
            <Route
              path="/allproducts"
              element={
                isAuthenticated ? <ProductDetail /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/products"
              element={isAuthenticated ? <Products /> : <Navigate to="/auth" />}
            />
            <Route
              path="/editproduct"
              element={
                isAuthenticated ? <EditProductForm /> : <Navigate to="/auth" />
              }
            />
            <Route path="/auth" element={<AuthForm onLogin={handleLogin} />} />
            {/* Redirect to auth if no other routes match */}
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
