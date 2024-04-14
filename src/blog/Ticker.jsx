
import React from "react";

function Ticker() {
  return (
    <div
      className="bg-[#FEBD16]
		 mt-0 border-black border-y-2 mb-0 py-0 "
    >
      <div className="relative overflow-x-hidden flex flex-row  ">
        <div className="px-6 animate-marquee whitespace-nowrap textdecoration-bold text-base text-black font-bold  ">
          <span className=" mx-2">Under</span>
          <span className=" mx-2">Construction</span>
          <span className="mx-2"> This Page Is Under Construction</span>
          <span className="ml-6"></span>
        </div>
        <div className="px-6 animate-marquee2  whitespace-nowrap textdecoration-bold text-base text-black font-bold  ">
          <span className=" mx-2">Yo</span>
          <span className=" mx-2">Yo</span>
          <span className="mx-2">Yo</span>
          <span className="ml-6">This Page Is Under Construction</span>
        </div>
      </div>
    </div>
  );
}

export default Ticker;