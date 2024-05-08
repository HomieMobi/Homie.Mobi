import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import createClient from "../../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(createClient);
function urlFor(source) {
  return builder.image(source);
}

export default function OnePost() {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    createClient
      .fetch(
        `*[slug.current == $slug]{
          title,
          slug,
          mainImage{
            asset->{
              _id,
              url
             }
           },
         body,
        "name": author->name,
        "authorImage": author->image
       }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!postData) return <div>Loading...</div>;

  const { title, name, body, mainImage, authorImage } = postData;
  const projectId = createClient.clientConfig?.projectId || "";
  const dataset = createClient.clientConfig?.dataset || "";

  console.log("projectId:", projectId);
  console.log("dataset:", dataset);

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <div>
        
          <h4>{name}</h4>
        </div>
      </div>
      {mainImage && (
        <img src={urlFor(mainImage).width(200).url()} alt="" />
      )}
      <div>
        <BlockContent
          blocks={body}
          projectId={projectId}
          dataset={dataset}
        />
      </div>
    </div>
  );
}
