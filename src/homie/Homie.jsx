import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import videoFile from "../assets/videoversion.mp4";

// Icons --
import { CiMenuFries } from "react-icons/ci";
import { FaSearch, FaCode } from "react-icons/fa";
import { GiLighthouse, GiHouse, GiMoneyStack } from "react-icons/gi";
import { MdShoppingCartCheckout } from "react-icons/md";

// App Layout Top To Bottom
import Menu from './components/header/menu/Menu';
import SearchBar from './components/header/domainsearch/DomainSearch';
import Home from './components/pages/1Home';
import Products from './components/pages/2Products';
import About from './components/pages/3About';
import Payment from './components/pages/4Payment';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function Homie() {

  // State and update state
  const location = useLocation();
  const [selectedIcon, setSelectedIcon] = useState(location.state?.selectedIcon || 'house');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [price, setPrice] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Not sure if this preloader even works
  useEffect(() => {
    const video = document.createElement('video');
    video.src = videoFile;
  }, []);

  // Open and close menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  // Handle icon click updates selected icon, product, and if need be search term.
  const handleIconClick = useCallback((icon, product, searchTerm) => {
    setSelectedIcon(icon);
    setSelectedProduct(product); // Update selected product
    setSearchTerm(searchTerm); // Update active search term
  }, [setSelectedIcon, setSelectedProduct, setSearchTerm]);

  // Are we using this?
  const handleBuyClick = () => {
    if (selectedIcon === 'search') {
      handleIconClick('cart', 'Domain', searchTerm); // Pass searchTerm as the third argument
    }
  };

  // Add class to body element
  useEffect(() => {
    document.body.classList.add('homie-body');

    // Cleanup function to remove class when the component unmounts
    return () => {
      document.body.classList.remove('homie-body');
    };
  }, []);

  return (
    <div className='w-screen h-screen flex justify-center'>
      <div className='w-full absolute border-2 h-full border-black rounded md:w-1/2 lg:w-1/3 max-w-[400px] max-h-[800px] justify-center overflow-hidden'>
        {/* Header */}
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleIconClick={handleIconClick}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          setSelectedProduct={setSelectedProduct}
        />
        <Menu isOpen={isMenuOpen} handleIconClick={handleIconClick} toggleMenu={toggleMenu} />

        {/* Pages */}
        <div className='flex h-3/4 bg-white items-center justify-center px-0 pb-6'>
          {/* Render components based on selectedIcon */}
          {selectedIcon === 'house' && (
            <Home video={videoFile} />
          )}
          {selectedIcon === 'money' && (
            <Products handleIconClick={handleIconClick} />
          )}
          {selectedIcon === 'lighthouse' && (
            <About />
          )}
          {selectedIcon === 'cart' && (
            <div className="w-full h-full flex flex-col justify-center items-center bg-white text-base">
              <Payment selectedProduct={selectedProduct} searchTerm={searchTerm} />
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer selectedIcon={selectedIcon} handleIconClick={handleIconClick} />
      </div>
    </div>
  )
}

export default Homie;
