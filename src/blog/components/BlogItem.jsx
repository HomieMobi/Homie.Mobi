import React from 'react';


function BlogItem({ category, title, author, date, imgUrl, description, link, tags = [] }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="border-2 border-stone-900 dark:border-white rounded-md w-full"
    >
      <div className='w-full flex justify-center'>{category}</div>
      <div className='w-full flex justify-center'>{title}</div>
      <div className='flex w-full justify-center gap-4'>
        <div>{author}</div>
        <div>{date}</div>
      </div>
      <img
        src={imgUrl}
        alt="portfolio"
        className="w-full h-36 md:h-48 object-cover cursor-pointer"
      />
      <div>{description}</div>
      <div className="w-full p-4">

        <p className="flex flex-wrap gap-2 flex-row items-center justify-start text-xs md:text-sm dark:text-white ">
          {tags.map(item => (
            <span className="inline-block px-2 py-1 font-semibold border-2 border-stone-900 dark:border-white rounded-md">
              {item}
            </span>
          ))}
        </p>
      </div>
    </a>
  )
}

export default BlogItem;