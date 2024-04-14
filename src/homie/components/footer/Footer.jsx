// Footer.js

import React from 'react';
import { GiLighthouse, GiHouse, GiMoneyStack } from 'react-icons/gi';
import { MdShoppingCartCheckout } from 'react-icons/md';

const Footer = ({ selectedIcon, handleIconClick }) => {
  return (
    <div className="absolute bottom-0 h-20 mb-[-0px] opacity-100 text-6xl pb-0 items-center pt-2 justify-center flex w-full">
      <div className="flex flex-row justify-evenly items-center border-black border-2 w-full h-full bg-white ">
        <GiHouse
          className={`text-black ${selectedIcon === 'house' ? 'border-yellow-400 bg-white border-2 drop-shadow-lg rounded-2xl  ' : ' rounded-xl p-0 shadow-none'}`}
          onClick={() => handleIconClick('house')}
        />
        <GiMoneyStack
          className={`text-black ${selectedIcon === 'money' ? 'border-yellow-400 bg-white border-2 rounded-xl drop-shadow-lg  ' : 'p-0 shadow-none rounded-xl'} ${selectedIcon === 'lighthouse' ? 'text-green-700 animate-pulse ' : 'p-0'}`}
          onClick={() => handleIconClick('money')}
        />
        <GiLighthouse
          className={`text-black ${selectedIcon === 'lighthouse' ? 'border-yellow-400 bg-white border-2 rounded-xl drop-shadow-lg   ' : 'p-0 shadow-none'}`}
          onClick={() => handleIconClick('lighthouse')}
        />
        <MdShoppingCartCheckout
          className={`text-black ${selectedIcon === 'cart' ? 'border-yellow-400 bg-white border-2 rounded-xl drop-shadow-lg' : 'shadow-none p-0'} ${selectedIcon === 'lighthouse' ? 'text-blue-700 ' : 'p-0'}`}
          onClick={() => handleIconClick('cart')}
        />
      </div>
    </div>
  );
};

export default Footer;
