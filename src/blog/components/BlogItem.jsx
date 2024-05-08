import React, { useState } from 'react';

function BlogItem({ category, title, author, date, imgUrl, description, link, tags = [] }) {
  // State to track whether to show full description or not
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle full description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Truncate description to first 100 words
  const truncatedDescription = description.split(' ').slice(0, 30).join(' ');
  const numRows = Math.ceil(tags.length / 2);
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="border-2 border-stone-900 dark:border-white rounded-md w-full p-2"
    >
      <div className='flex flex-col w-full justify-center gap-2'>
        <div className='w-full flex items-center justify-center bg-blue-50 text-xl'>
          {title}
        </div>
        <div className='w-full flex flex-row justify-between items-center h-fit bg-red-50 '>
          <img
            src={imgUrl}
            alt="portfolio"
            className="w-1/2 h-16 md:h-16 object-cover cursor-pointer border-2 border-black"
          />
          <div className='w-2/4 flex flex-col items-end bg-blue-200 h-16 text-sm'>
            <div> {date}</div>
            <div className='flex flex-col bg-white w-full text-xs font-bold'>
              {[...Array(numRows)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-2">
                  {tags.slice(rowIndex * 2, rowIndex * 2 + 2).map((tag, index) => (
                    <div key={index}>#{tag}</div>
                  ))}
                </div>
              ))}

            </div>

          </div>
        </div>
      </div>

      <div className='w-full bg-red-300'>

      </div>
    </a>
  );
}

export default BlogItem;
