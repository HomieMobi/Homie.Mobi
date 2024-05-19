import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { TfiMoney } from "react-icons/tfi";
import { FaSpinner } from 'react-icons/fa';


const SearchBar = ({ handleIconClick, setSelectedProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [borderColor, setBorderColor] = useState('border-yellow-300');
  const [iconColor, setIconColor] = useState('text-black'); // Default color is black
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleSearchInputClick = () => {
    // Reset the result state to null
    setResult(null);
  };

  const handleSearch = async () => {
    try {
      console.log("Search icon clicked. Current searchTerm:", searchTerm); // Log the current value of searchTerm
      setIsLoading(true); // Set loading state to true

      const response = await fetch('https://us-central1-homiemobie.cloudfunctions.net/checkDomainAvailability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domainNames: [searchTerm] }), // No need to add .mobi suffix here
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.text(); // Parse response as text
      console.log("Response from server:", data);

      // Determine availability based on response text
      const isAvailable = data === "Lock it down";

      setResult({ available: isAvailable }); // Set result based on availability

      // Change border color based on availability
      if (isAvailable) {
        setBorderColor('border-green-700');
        setIconColor('text-green-700'); // Change icon color to green if available
      } else {
        setBorderColor('border-red-700');
        setIconColor('text-red-700'); // Change icon color to red if not available
      }

      // If the domain is available, trigger the payment process
      if (isAvailable) {
        setSelectedProduct('domain');
        setSearchTerm(searchTerm);
        console.log('searchTerm:', searchTerm);// Set the searchTerm
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setError(error.message);
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or error
    }
  };



  return (
    <div className="w-full h-1/2 bg-gray-500 pb-0 flex flex-col justify-center border-2">
      <div className="bg-gray-200 w-full h-3/4 pr-2 flex flex-row rounded- items-center justify-center border-b-2 border-gray-200">
        <div className='flex flex-row h-full'>
          <div className={`bg-white w-1/2 items-center h-full rounded-xl flex flex-row justify-center ${borderColor} border-2`}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.trim())}

              onClick={handleSearchInputClick}
              onFocus={handleSearchInputClick}
              className="w-full h-full rounded-xl px-2 justify-end flex items-end"
            />
          </div>
          <div className="w-1/2 flex flex-row justify-between font-semibold text-2xl">
            <div className="px-2 font-sriracha">.mobi</div>
            <div
              className={`border-2 rounded-xl text-xl flex justify-center items-center px-2 ${iconColor}`}
              onClick={handleSearch}
            >
              {isLoading ? ( // Check loading state
                <div className='bg-yellow-300 w-fit h-full flex rounded-xl flex-row items-center px-2 border-2 border-black text-black text-lg '>
                  {/* Show loading icon */}
                  <FaSpinner className='animate-spin' />
                </div>
              ) : (
                <div className=' h-full'>
                  {result && result.available ? (
                    <button className='bg-green-500 w-fit flex rounded-xl flex-row items-center px-2 border-2 border-black text-base text-black' onClick={() => handleIconClick('cart', 'domain', searchTerm)}>
                      <TfiMoney className="text-black bg-green-500" />
                      <div className='text-lg bg-green-500'>25</div>
                    </button>
                  ) : (
                    <div className='bg-yellow-300 w-fit h-full   flex rounded-xl flex-row items-center px-2 border-2 border-black text-black text-lg '>
                      <FaSearch onClick={handleSearch} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='w-full font-sriracha h-full  text-xs flex justify-center items-center text-white'>
        {result && result.available !== undefined ? (
          result.available ? (
            <p>Lock it down</p>
          ) : (
            <p>Not available</p>
          )
        ) : (
          <p>Find your .mobi</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
