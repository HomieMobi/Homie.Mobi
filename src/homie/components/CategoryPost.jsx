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
    <div className="bg-gray-200 flex flex-col gap-2 w-full py-2 px-4">
      {categoryPostsData &&
        categoryPostsData.map((post, index) => (
          <Link to={"/blog/" + post.slug.current} key={post.slug.current}>
            <div className="bg-white rounded-lg shadow-md p-4" key={index}>
              <div className="flex items-center justify-center">
                <h2 className="font-bold text-lg">{post.title}</h2>
              </div>
              <div className="flex flex-row items-center gap-2 mt-2">
                <img className="w-24 h-24 rounded-md" src={post.mainImage.asset.url} alt="" />
                <div className="flex flex-col w-full">
                  <div className="flex justify-end text-sm">{new Date(post.publishedAt).toLocaleDateString()}</div>
                  <div className="text-md">{post.description}</div>
                  <p className="text-gray-500 text-sm">{post.categories.map((category) => category.title).join(", ")}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      {categoryPostsData && categoryPostsData.length === 0 && <p>No posts found for this category</p>}
      {!categoryPostsData && <p>Loading...</p>}
    </div>
  );
}
