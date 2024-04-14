// Home.js
import React from 'react';

const Home = ({ video }) => {
  console.log(video);
  return (
    <div className="w-full h-full px-2 flex justify-center items-center rounded-2xl object-contain overflow-hidden">

      <div className="w-4/6 h-full flex justify-center items-center object-contain rounded-3xl border-black border-8 bg-gray-700 px-0 py-8">
        <div className="bg-gray-800 px-0 w-full h-full flex justify-center  objects-cover">
          {/* <div className='absolute self-center text-white text-xl pb-8'>WELCOME</div> */}
          <video autoPlay loop muted playsInline className="w-full h-full">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        </div>
      </div>

    </div>
  );
};

export default Home;
