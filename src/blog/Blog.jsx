import React, { useState } from 'react';
import blogs from './data/blogs';
import BlogItem from './components/BlogItem';
import { Link } from 'react-router-dom';
import Ticker from './Ticker';
import { BiArrowBack } from "react-icons/bi";
import { CiMenuFries } from "react-icons/ci";
import AllPosts from '../homie/components/AllPosts';

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Function to filter blogs based on selected category
  // Function to filter blogs based on selected category
  const filteredBlogs = blogs.filter(blog => {
    if (selectedCategory === 'All') {
      return true;
    } else {
      // Case-insensitive comparison
      return blog.category.toLowerCase() === selectedCategory.toLowerCase();
    }
  });


  return (
    <>
      <div className='w-screen h-screen  flex  justify-center'>
        <div className='w-full absolute border-2 h-full  border-black rounded md:w-1/2 lg:w-1/3 max-w-[400px] max-h-[800px] justify-center overflow-hidden'>
          <div className='flex flex-col w-full h-1/6 bg-red-200'>
            <div className='h-1/2 flex flex-col w-full'>
              <div className='w-full h-full flex flex-row bg-white'>
                <div className="font-sriracha text-2xl w-2/3 flex justify-start items-center h-full pl-6">Homie.Mobi<span className='text-red-500'>/blog</span></div>
                <div className='w-1/3 bg-white flex items-center justify-end text-3xl p-6'>
                  <CiMenuFries />
                </div>
              </div>
              <div className='w-full bg-white px-4'>
                <Link to="/" className='flex flex-col justify-center'>
                  <div className='flex flex-row w-2/4 items-center justify-center gap-2  rounded-xl shadow-md border-black border-2 bg-black'>
                    <div className="text-yellow-500 text-2xl">
                      <BiArrowBack />
                    </div>
                    <div className='flex flex-col justify-center p-2'>
                      <div className='text-white'>homie.mobi</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-row py-2 bg-gray-50 px-2 justify-center gap-4'>
            <button className={selectedCategory === 'All' ? 'bg-blue-500 text-white px-4 py-2 rounded' : 'px-4 py-2'} onClick={() => setSelectedCategory('All')}>All</button>
            <button className={selectedCategory === 'Business' ? 'bg-gray-500 text-white px-4 py-2 rounded' : 'px-4 py-2'} onClick={() => setSelectedCategory('Business')}>Business</button>
            <button className={selectedCategory === 'Developer' ? 'bg-blue-500 text-white px-4 py-2 rounded' : 'px-4 py-2'} onClick={() => setSelectedCategory('Developer')}>Developer</button>
            <button className={selectedCategory === 'Other' ? 'bg-blue-500 text-white px-4 py-2 rounded' : 'px-4 py-2'} onClick={() => setSelectedCategory('Other')}>Other</button>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center w-full">
            <div className="grid grid-cols-1 gap-4 w-full p-2">
              <AllPosts />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog;
