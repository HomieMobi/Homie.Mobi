import React, { useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from "react-icons/md";
import Payment from './4Payment';

function Products({ handleIconClick }) {
  const [emailClicked, setEmailClicked] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = 'support@homie.mobi';

  const handleEmailClick = () => {
    setEmailClicked(!emailClicked);
    setCopied(false); // Reset copied state when email button is clicked
  };

  const handleCopyToClipboard = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="w-full h-full flex flex-col gap-0 bg-gray-300">
      <div className='text-2xl font-sriracha px-4 font-bold p-2 bg-gray-100'>
        Product Pricing
      </div>
      <div className='bg- w-full h-full flex flex-col gap-4 pt-0 pb-2'>
        <div className='flex flex-col  h-1/3 w-full border-2 shadow-md shadow-black p-2 bg-white gap-2'>
          <div className='flex flex-row justify-between items-center h-1/3 '>
            <div className='text-2xl font-sriracha '>2D.Mobi</div>
            <div className='text-2xl font-sriracha'>$320</div>
          </div>
          <div className='flex flex-row'>
            <div className=' w-full'>
              <ul className="list-disc pl-4 w-fit font-semibold text-sm">
                <li>Socials, Links, Business</li>
                <li>Your colors, Photos, Whatver</li>
                <li>Single Page, Single Viewport .Mobi</li>
              </ul>
            </div>
            <div className='flex flex-row w-fit justify-end items-end  '>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded h-fit" onClick={() => handleIconClick('cart', '2D')}>
                Buy
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 h-1/3 w-full border-2 shadow-md shadow-black p-2 bg-white justify-start'>
          <div className='w-full flex flex-row justify-between items-center h-fit'>
            <div className='text-2xl font-sriracha'>3D.Mobi</div>
            <div className='text-2xl font-sriracha'>$640</div>
          </div>
          <div className='flex flex-row'>
            <div className='w-full'>
              <ul className="list-disc pl-4 w-fit font-semibold text-sm">
                <li>Socials, Links, Business</li>
                <li>Add the Third Dimension</li>
                <li>Single Page, Single Viewport .Mobi</li>
              </ul>
            </div>
            <div className='flex flex-row w-fit justify-end items-end   '>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded h-fit" onClick={() => handleIconClick('cart', '3D')}>
                Buy
              </button>
            </div>
          </div>
        </div>

        {/* Product card 3 */}
        <div className='flex flex-col h-1/3 w-full gap-2 border-2 shadow-yellow-500 shadow-sm p-2 bg-white'>
          <div className='flex flex-row justify-between '>
            <div className='text-2xl font-sriracha'>Mobi.Developer</div>
            <div className='text-2xl font-sriracha'><FaCode /></div>
          </div>
          <div className='flex flex-row h-full'>
            <div className={`w-full h-full ${emailClicked ? '' : ''}`}>
              <ul className={`list-disc pl-4 font-semibold text-sm ${emailClicked ? 'hidden' : ''}`}>
                <li>Custom Project?</li>
                <li>Need Help Setting Up Business?</li>
                <li>We have the developers! Holler</li>
              </ul>
            </div>
            <div className='flex flex-row items-end'>
              {emailClicked && (
                <CopyToClipboard text={email} onCopy={handleCopyToClipboard}>
                  <button className="bg-white text-lg hover:bg-white text-black border-2 border-black font-bold py-2 px-2 rounded mr-2">
                    {copied ? <div className='text-sm'>Copied!</div> : <MdContentCopy className='text-xl' />}
                  </button>
                </CopyToClipboard>
              )}
              <button className={`bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded h-fit ${emailClicked ? 'w-full' : ''}`} onClick={handleEmailClick}>
                {emailClicked ? 'support@homie.mobi' : 'Email'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
