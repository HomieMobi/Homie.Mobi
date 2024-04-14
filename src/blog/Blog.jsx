import React from 'react';
import blogs from './data/blogs';
import BlogItem from './components/BlogItem';
import { Link } from 'react-router-dom';
import Ticker from './Ticker';


function Blog() {
  return (
    <>

      <div className='flex flex-col'>

        <div className='flex flex-col h-24  '>
          <div className='text-3xl w-full flex flex-row gap-2 bg-yellow-200 px-8'>
            <div>Homie.Mobi</div>
            <div className='text-red-500'>/blog</div>
          </div>
          <div className='px-8'>
            <Link to="/"> <div className='text-xl font-bold border-2 w-fit p-2 border-black'>BACK HOME</div></Link>
          </div>
          <div>
            <Ticker />
          </div>

        </div>





        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-2">
            {blogs.map(project => (
              <BlogItem
                imgUrl={project.imgUrl}
                title={project.title}
                tags={project.tags}
                link={project.link}
                category={project.category}
                author={project.author}
                date={project.date}
                description={project.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog;
