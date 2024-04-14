import React from 'react';
import { CiMenuFries } from "react-icons/ci";
import SearchBar from './domainsearch/DomainSearch';
function Header({ searchTerm, setSearchTerm, handleIconClick, isMenuOpen, toggleMenu, setSelectedProduct }) {
  return (
    <div className='flex flex-col w-full h-1/6 bg-red-200'>
      {/* Header */}
      <div className='w-full h-1/2 bg-white flex flex-row '>
        <div className="font-sriracha text-2xl w-1/2 flex justify-center items-center h-full">Homie.Mobi</div>
        <div className='w-1/2 h-full items-center justify-end text-3xl  flex px-6'>
          <CiMenuFries onClick={toggleMenu} className={`${isMenuOpen ? 'text-yellow-500' : 'text-black'} cursor-pointer z-40`} />
        </div>
      </div>
      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleIconClick={handleIconClick} setSelectedProduct={setSelectedProduct} />
    </div>
  );
}

export default Header;
