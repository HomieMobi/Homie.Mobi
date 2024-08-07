import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { CiMenuFries } from "react-icons/ci";
import AllPosts from '../homie/components/AllPosts';
import CategoryPosts from '../homie/components/CategoryPost';
import Menu from '../homie/components/header/menu/Menu';

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('house');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleIconClick = useCallback((icon, product, searchTerm) => {
    setSelectedIcon(icon);
    navigate("/", { state: { selectedIcon: icon } });
  }, [navigate]);

  return (
    <div className='w-screen h-screen flex justify-center'>
      <div className='w-full absolute border-2 h-full border-black rounded md:w-1/2 lg:w-1/3 max-w-[400px] max-h-[800px] justify-center overflow-hidden'>
        <div className='w-full h-  flex flex-row '>
          <div className="font-sriracha text-2xl w-full flex justify-start pl-6 items-center h-fit py-4">
            homie.mobi<span className='text-red-500'>/blog</span>
          </div>
          <div className='w-1/3  flex h-fit items-center justify-end text-3xl py-4 px-6'>
            <CiMenuFries onClick={toggleMenu} className={`${isMenuOpen ? 'text-yellow-500' : 'text-black'} cursor-pointer z-40`} />
          </div>
          <Menu isOpen={isMenuOpen} handleIconClick={handleIconClick} toggleMenu={toggleMenu} />
        </div>
        <div className='w-full  px-6 pb-2'>
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

        <div className='w-full px-2 py-2  justify-between text-black border-b-2 bg-gray-50'>
          <button className={selectedCategory === 'All' ? 'text-black font-bold border-b-2 border-yellow-500 px-4 py-2' : 'px-4 py-2'} onClick={() => setSelectedCategory('All')}>All</button>
          <button className={selectedCategory === 'Business' ? 'text-black font-bold border-b-2 border-yellow-500 px-4 py-2' : 'px-4 py-2'} onClick={() => setSelectedCategory('Business')}>Business</button>
          <button className={selectedCategory === 'Developer' ? 'text-black font-bold border-b-2 border-yellow-500 px-4 py-2' : 'px-4 py-2'} onClick={() => setSelectedCategory('Developer')}>Developer</button>
          <button className={selectedCategory === 'Other' ? 'text-black font-bold border-b-2 border-yellow-500 px-4 py-2' : 'px-4 py-2'} onClick={() => setSelectedCategory('Other')}>Other</button>
        </div>

        <div className=" w-full  overflow-y-auto bg-gray-200 h-5/6 pt-2 pb-20">
          {selectedCategory === 'All' ? (
            <AllPosts />
          ) : (
            <CategoryPosts category={selectedCategory} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Blog;
