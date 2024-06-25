import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import ShopCategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import women_banner from './Components/Assets/banner_women.png';
import men_banner from './Components/Assets/banner_mens.png';
import kid_banner from './Components/Assets/banner_kids.png';
import LatestCollection from './Components/LatestCollection/latestcollection'; 
import Checkout from './Components/CheckOut/checkout'; // Adjusted import

function App() {
  return (
    <div>
      <Router>
        <Navbar />
      {/* Correct usage of Checkout component */}
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/latestCollection" element={<LatestCollection />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
