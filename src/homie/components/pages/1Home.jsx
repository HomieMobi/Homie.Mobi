// Home.js
import React from 'react';
import homie from "../../../assets/homie.png"
import example from "../../../assets/example.png"

const Home = ({ video }) => {
  console.log(video);
  return (
    <div className="w-full h-full px-2 flex justify-center items-center rounded-2xl object-contain overflow-hidden">

      <div className="w-4/6 h-full flex justify-center items-center object-contain rounded-3xl border-black border-8 bg-gray-700 px-0 py-8">
        <div className="bg-gray-800 px-0 w-full h-full flex justify-center  objects-cover">

          <video autoPlay loop muted playsInline className="w-full h-full">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        </div>
      </div>
      {/* <div className='flex flex-col items-center justify-center'>
        <div><img src={example} className='  border-2 border-black' /></div>
        <div className="flex flex-row w-full bg-purple-200 h-28 border-blue-900 border-2">
          <div className="flex bg-blue-50 border-blue-700  justify-center items-center p-4 border-2 ">
            <img src={homie} className='w-20 h-20 rounded-full border-2 border-black' />
          </div>
          <div className=" flex-col border-red-700 border-2 flex  flex-grow">
            <div className='bg-yellow-100 border-2 border-black h-1/3'>
              <h1>Text Here</h1>
            </div>
            <div className='bg-yellow-100 border-2 border-black h-1/3'>
              <h1>Text Here</h1>
            </div>
            <div className='bg-yellow-100 border-2 border-black h-1/3'>
              <h1>Text Here</h1>
            </div>
          </div>
        </div>
      </div> */}

    </div>
  );
};

export default Home;
