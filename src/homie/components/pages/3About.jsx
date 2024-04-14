import React from 'react';
import { FaArrowTurnUp } from "react-icons/fa6";
import { GiLighthouse, GiHouse, GiMoneyStack } from "react-icons/gi";
import { MdShoppingCartCheckout } from "react-icons/md";

const About = () => {
  return (
    <div className="w-full h-full flex flex-col    px-0  bg-gray-100">
      <div className='text-2xl font-sriracha px-4 font-bold p-2 bg-gray-100'>Need Guidance??</div>

      <div className="grid grid-rows-1 gap-2 py-2 px-0 w-full   bg-gray-50 ">
        <div className="flex items-center gap-4 px-2 bg-white border-dashed border-t-0 border-black py">
          <div className="relative flex flex-col items-center justify-center ">
            <div className="text-xs font-bold text-black mb-1">Step</div>
            <div className="w-12 h-12 rounded-full bg-white border-2 border-black flex justify-center items-center text-black font-bold text-xl">1</div>
          </div>
          <div className="  text-base  font-bold ">
            <div className="flex items-center  ">
              Find a domain name you like <FaArrowTurnUp className="ml-1" />
            </div>
            <div className="flex items-center">Lock it down! $$</div>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-gray-50 px-2 border-dashed border-t-2 border-black  ">
          <div className="relative flex flex-col items-center justify-center w-fit ">
            <div className="text-xs font-bold text-black mb-1">Step</div>
            <div className="w-12 h-12 rounded-full bg-white border-2 border-black flex justify-center items-center text-black font-bold text-xl">2</div>
          </div>
          <div className="text-base  font-bold">
            <div className="flex gap-2 items-center  "><GiMoneyStack className='text-green-700 text-4xl' />
              Choose Type
            </div>
            <div className="flex items-center gap-2"><MdShoppingCartCheckout className='text-blue-700 text-4xl' /> Checkout!</div>
          </div>
        </div>
        <div className="flex gap-4 bg-white  items-center px-2 border-dashed border-t-2 border-black ">
          <div className="relative flex flex-col items-center justify-center">
            <div className="text-xs font-bold text-black mb-1">Step</div>
            <div className="w-12 h-12 rounded-full bg-white border-2 border-black flex justify-center items-center text-black font-bold text-xl">3</div>
          </div>
          <div className="text-base  font-bold">
            <div>A homie reaches out via email </div>
            <div>You submit your style/vision </div>
          </div>
        </div>
        <div className="flex gap-4 items-center px-2 bg-gray-50 border-dashed border-t-2 border-black ">
          <div className="relative flex flex-col items-center justify-center">
            <div className="text-xs font-bold text-black mb-1">Step</div>
            <div className="w-12 h-12 rounded-full bg-white border-2 border-black flex justify-center items-center text-black font-bold text-xl">4</div>
          </div>
          <div className="text-base  font-bold">
            <div>Rough build</div>
            <div>You review with feedback</div>

          </div>
        </div>
        <div className="flex gap-4 items-center px-2 bg-white border-dashed border-t-2 border-black ">
          <div className="relative flex flex-col items-center justify-center">
            <div className="text-xs font-bold text-black mb-1">Step</div>
            <div className="w-12 h-12 rounded-full bg-white border-2 border-black flex justify-center items-center text-black font-bold text-xl">5</div>
          </div>
          <div className="text-base  font-bold">
            <div>Production build</div>
            <div>And you're live bruh</div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default About
