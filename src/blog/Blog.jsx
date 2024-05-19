import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { CiMenuFries } from "react-icons/ci";
import AllPosts from '../homie/components/AllPosts';
import CategoryPosts from '../homie/components/CategoryPost';

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <>
      <div className='w-screen h-screen flex justify-center'>
        <div className='w-full absolute border-2 h-full border-black rounded md:w-1/2 lg:w-1/3 max-w-[400px] max-h-[800px] justify-center overflow-hidden '>
          <div className='flex flex-col w-full bg-red-200'>
            {/* Header */}
            <div className='w-full h- bg-white flex flex-row '>
              <div className="font-sriracha text-2xl w-full flex justify-start pl-6 items-center h-fit py-4">
                Homie.Mobi<span className='text-red-500'>/blog</span>
              </div>
              <div className='w-1/3 bg-white flex h-fit items-center justify-end text-3xl py-4 px-6'>
                <CiMenuFries />
              </div>
            </div>
            <div className='w-full bg-white px-6 pb-2'>
              <Link to="/" className='flex flex-col justify-center'>
                <div className='px-2 flex flex-row w-fit items-center justify-center gap-0 rounded-lg shadow-md border-white border-2 bg-black'>
                  <div className="text-yellow-500 text-2xl">
                    <BiArrowBack />
                  </div>
                  <div className='flex flex-col justify-center p-2'>
                    <div className='text-white'>Home</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className='w-full flex flex-row bg-gray-100 px-2 py-2  justify-between text-black border-b-2'>
            <button className={selectedCategory === 'All' ? 'text-black font-bold border-b-2 border-yellow-500 px-4 py-2' : 'px-4 py-2'} onClick={() => setSelectedCategory('All')}>All</button>
            <button className={selectedCategory === 'Business' ? 'text-black font-bold border-b-2 border-yellow-500 px-4 py-2' : 'px-4 py-2'} onClick={() => setSelectedCategory('Business')}>Business</button>
            <button className={selectedCategory === 'Developer' ? 'text-black font-bold border-b-2 border-yellow-500 px-4 py-2' : 'px-4 py-2'} onClick={() => setSelectedCategory('Developer')}>Developer</button>
            <button className={selectedCategory === 'Other' ? 'text-black font-bold border-b-2 border-yellow-500 px-4 py-2' : 'px-4 py-2'} onClick={() => setSelectedCategory('Other')}>Other</button>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center w-full bg-slate-00 gap-2">
            {selectedCategory === 'All' ? (
              <AllPosts />
            ) : (
              <CategoryPosts category={selectedCategory} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
