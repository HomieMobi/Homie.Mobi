import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import createClient from "../../client";


export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);

  useEffect(() => {
    createClient
      .fetch(
        `*[_type == "post"]{
          title,
          slug,
          description,
          publishedAt,
          categories[]->{
            title
          },
          
          mainImage{
            asset->{
              _id,
              url
            }
          }
        }`
      )
      .then((data) => {
        console.log("Fetched data:", data); // Add this line
        setAllPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };


  return (
    <div className="bg-gray-200  flex flex-col gap-2 w-full py-2">


      {allPostsData &&
        allPostsData.map((post, index) => (
          <Link to={"/blog/" + post.slug.current} key={post.slug.current}>

            <span className="flex flex-col w-full gap-0 bg-gray-50 shadow-md pb-2" key={index}>
              <div className="flex items-center justify-center p-2">
                <h2 className="font-bold text-lg">{post.title}</h2>

              </div>

              <div className="flex flex-row gap-2 ">
                <img
                  className="w-32 h-32"
                  src={post.mainImage.asset.url}
                  alt=""
                />
                <div className="flex flex-col w-full ">
                  <div className="flex justify-end text-sm mt-[-10px] ">{formatDate(post.publishedAt)}</div>
                  <div className="flex text-lg bg-white">{post.description}</div>
                  <p className="flex items-end h-full text-gray-500 font-mono text-sm">
                    {post.categories.map((category) => category.title).join(", ")}
                  </p>
                </div>
              </div>
            </span>

          </Link>
        ))}
      {allPostsData && allPostsData.length === 0 && <p>No posts found</p>}
      {!allPostsData && <p>Loading...</p>}

    </div>
  );
}
