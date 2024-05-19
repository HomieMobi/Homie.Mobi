import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import createClient from "../../client";

export default function CategoryPosts({ category }) {
  const [categoryPostsData, setCategoryPostsData] = useState(null);

  useEffect(() => {
    createClient
      .fetch(
        `*[_type == "post" && "${category}" in categories[]->title]{
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
        console.log("Fetched data for category:", category, data);
        setCategoryPostsData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [category]);

  return (
    <div className="bg-gray-400 flex flex-col gap-2 w-full py-2">
      {categoryPostsData &&
        categoryPostsData.map((post, index) => (
          <Link to={"/blog/" + post.slug.current} key={post.slug.current}>
            <span className="flex flex-col w-full bg-gray-50 " key={index}>
              <div className="flex items-center justify-center">
                <h2>{post.title}</h2>
              </div>
              <div className="flex flex-row gap-2">
                <img
                  className="w-32 h-32"
                  src={post.mainImage.asset.url}
                  alt=""
                />
                <div className="flex flex-col w-full">
                  <div className="flex justify-end">date</div>
                  <div className="flex ">{post.description}</div>
                  <p className="flex items-end h-full">
                    {post.categories.map((category) => category.title).join(", ")}
                  </p>
                </div>
              </div>
            </span>
          </Link>
        ))}
      {categoryPostsData && categoryPostsData.length === 0 && <p>No posts found for this category</p>}
      {!categoryPostsData && <p>Loading...</p>}
    </div>
  );
}
