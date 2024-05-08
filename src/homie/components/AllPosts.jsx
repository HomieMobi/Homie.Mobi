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
        console.log("Fetched data:", data);
        setAllPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>

      <div>
        {allPostsData &&
          allPostsData.map((post, index) => (
            <Link to={"/blog/" + post.slug.current} key={post.slug.current}>

              <span className="flex flex-col w-full " key={index}>
                <div className="flex items-center justify-center"><h2 className="">{post.title}</h2></div>
                <div className="flex flex-row gap-2">
                  <img
                    className="w-32 h-32"
                    src={post.mainImage.asset.url}
                    alt=""
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex justify-end">date</div>
                    <div className="flex ">description</div>
                    <p className="flex items-end h-full">
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
    </div>
  );
}
