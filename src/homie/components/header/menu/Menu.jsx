import React, { useState } from 'react';
import { ImDiamonds } from "react-icons/im";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Test from '../../../../Test'

const Menu = ({ isOpen, handleIconClick, toggleMenu }) => {
  const [selectedTab, setSelectedTab] = useState('Our Name');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`z-30 absolute top-0 right-0 w-full h-full transform transition-transform duration-300 flex items-end ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full w-full  p-2 py-6 border-2 bg-white border-black flex flex-col">
        <div className='border-b-2 border-black w-full flex gap-2 p-4 items-center cursor-pointer hover:bg-gray-100' onClick={() => { handleIconClick('house'); toggleMenu(); setIsDropdownOpen(false); }}>
          <ImDiamonds className='text-2xl' />
          <div className='h-fit text-2xl'>Home</div>
        </div>
        <div className='border-b-2 border-black w-full flex gap-2 p-4 items-center cursor-pointer hover:bg-gray-100' onClick={() => { handleIconClick('money'); toggleMenu(); setIsDropdownOpen(false); }}>
          <ImDiamonds className='text-2xl' />
          <div className='h-fit text-2xl'>Products</div>
        </div>
        <div className='border-b-2 border-black w-full flex gap-2 p-4 items-center cursor-pointer hover:bg-gray-100' onClick={() => { handleIconClick('lighthouse'); toggleMenu(); setIsDropdownOpen(false); }}>
          <ImDiamonds className='text-2xl' />
          <div className='h-fit text-2xl'>Guidance</div>
        </div>
        <div className='border-b-2 border-black w-full flex gap-2 p-4 items-center cursor-pointer hover:bg-gray-100' onClick={toggleDropdown}>
          <ImDiamonds className='text-2xl' />
          <div className='h-fit text-2xl'>About Us</div>
          <AiOutlineCaretDown />
        </div>
        {isDropdownOpen && (
          <div className="bg-gray-100 p-4  flex flex-col  gap-4">
            <div className='flex flex-row gap-4'>
              <p className={`cursor-pointer ${selectedTab === 'Our Name' ? 'underline' : ''}`} onClick={() => setSelectedTab('Our Name')}>Our Name</p>
              <p className={`cursor-pointer ${selectedTab === 'Services' ? 'underline' : ''}`} onClick={() => setSelectedTab('Services')}>Services</p>
              <p className={`cursor-pointer ${selectedTab === 'Mission' ? 'underline' : ''}`} onClick={() => setSelectedTab('Mission')}>Mission</p>
              <p className={`cursor-pointer ${selectedTab === 'Blog' ? 'underline' : ''}`} onClick={() => setSelectedTab('Blog')}>Blog</p>
              {/* <Link to="/blog">
                <p className={`cursor-pointer ${selectedTab === 'Disclaimer' ? 'underline' : ''}`}>Blog</p>
              </Link> */}
            </div>
            {selectedTab === 'Our Name' && (
              <>
                <div className='flex flex-col bg-white rounded-xl p-4 border-2 shadow-lg justify-center'>
                  <div className="flex flex-row  items-center gap-4">
                    <div className='text-2xl'> homie </div>
                    <div>/ ˈhōmē /</div>
                  </div>
                  <div className="bg-blue">noun</div>
                  <div className="text-sm pl-2">an acquaintance or a friend</div>
                </div>
                <div className='flex flex-col bg-white rounded-xl p-4 border-2 shadow-lg justify-center'>
                  <div className="flex flex-row  items-center gap-4">
                    <div className='text-2xl'> .mobi </div>
                    <div>/ ˈmōbē /</div>
                  </div>
                  <div className="bg-blue">noun</div>
                  <div className="text-sm pl-2">a .mobi domain name is a generic top-level domain (TLD) originally created to indicate that a site was optimized for mobile devices.</div>
                </div>
              </>
            )}
            {selectedTab === 'Services' && (

              <div className="flex flex-row justify-between gap-4 px-2 bg-white py-2">
                <div className="list-disc text-md flex flex-col gap-2">
                  <li>Website Design</li>
                  <li>SEO</li>
                  <li>Hosting</li>
                  <li>Payment <span className='pl-4'>Integration</span></li>
                  <li>Business Email</li>
                  <li>Advertisements</li>
                </div>
                <div className="list-disc text-md flex flex-col gap-2">
                  <li>Link in Domain</li>
                  <li>Domain Provider</li>
                  <li>Mobi Websites</li>
                  <li>Google Analytics</li>
                  <li>Social Media <span className='pl-5'>Marketing</span></li>
                </div>
              </div>

            )}
            {selectedTab === 'Mission' && (
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col bg-white rounded-xl p-4 border-2 shadow-lg justify-center'>
                  <div></div>
                  <div>
                    The homies want to offer a creative alternative to the link in bio process. We want to use code to bring other peoples vision to life. We want to make homies along the way!
                  </div>
                </div>
                <div className='p-2 text-sm'>
                  <span className='text-red-500 text-xl'>*</span>Not sure if we can help? Feel free to reach out with any questions to our support email: {' '}
                  <a href="mailto:support@homie.mobi" className="underline">support@homie.mobi</a>
                </div>

              </div>
            )}
            {selectedTab === 'Blog' && (
              <Link to="/blog" >
                <h1 className='text-lg'>
                  [beta]
                </h1>
                <div className='flex justify-start p-4 rounded-xl border-2 underline shadow-sm shadow-black border-black bg-white'>

                  <div className='flex flex-col gap-2'>

                    <h1 className='text-2xl pl-4'> Go to homie.mobi<span className='text-red-500'>/blog</span></h1>
                  </div>


                </div>
              </Link>
            )}
          </div>
        )}

        <div className='  justify-end items-start flex flex-col h-full cursor-pointer  w-full'>
          <a href="https://www.instagram.com/homie.mobi" target="_blank" rel="noopener noreferrer">
            <div className='flex flex-row  h-14 p-4 pb-0 justify-center items-center gap-4 text-xl'><AiOutlineInstagram className='text-3xl' />
              <div>homie.mobi</div>
            </div>
          </a>
          <div className='flex flex-row bg h-14 p-4 pb-0 justify-center items-center gap-4 text-xl' onClick={() => window.location.href = "mailto:support@homie.mobi"}>
            <BsSend className='text-3xl' />
            <div>support@homie.mobi</div>

          </div>
          <div className='w-full flex flex-row  h-14 p-0 justify-end items-end gap-4 text-xl'>
            <Test />
          </div>
        </div>

      </div>

    </div >
  );
};

export default Menu;
