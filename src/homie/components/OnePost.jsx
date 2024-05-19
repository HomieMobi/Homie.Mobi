import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import createClient from "../../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { CiMenuFries } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const builder = imageUrlBuilder(createClient);
function urlFor(source) {
  return builder.image(source);
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
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
          body[]{
            ...,
            asset->{
              _id,
              url
            }
          },
          "name": author->name,
          "authorImage": author->image,
          publishedAt
        }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!postData) return <div>Loading...</div>;

  const { title, name, body, authorImage, publishedAt } = postData;
  const projectId = createClient.clientConfig?.projectId || "";
  const dataset = createClient.clientConfig?.dataset || "";

  return (
    <div className='w-screen   flex  justify-center'>
      <div className='w-full absolute border-2   border-black rounded md:w-1/2 lg:w-1/3 max-w-[400px]  justify-center overflow-hidden '>

        <div className='flex flex-col w-full h-1/6 '>
          <div className='h-1/3 flex flex-col w-full'>
            <div className='w-full h-2/6 flex flex-row items-center '>
              <div className="font-sriracha text-2xl w-full flex justify-start pl-6  items-center h-fit py-4 ">Homie.Mobi<span className='text-red-500'>/blog</span></div>
              <div className='w-1/3 flex items-center justify-end text-3xl p-0 px-4'>
                <CiMenuFries />
              </div>
            </div>
            <div></div>
            <div className='w-full bg-white px-6 flex items-center'>
              <Link to="/blog" className='flex flex-col justify-center'>
                <div className='flex flex-row w-fit items-center justify-center gap-0   shadow-md bg-black border-white border-2 px-2 rounded-lg py-2'>
                  <div className="text-yellow-500 text-2xl">
                    <BiArrowBack />
                  </div>
                  <div className='flex flex-col justify-center px-2'>

                    <div className='text-white'>Back</div>

                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-100 px-2 pt-4">
          <div className="text-2xl bg-white pt-2 flex flex-col items-center border-b-2 border-black border-double mb-0">
            <div className=" flex justify-center"><h2 className="font-bold  w-3/4 text-center ">{title}</h2></div>



            <div className="flex w-full justify-end">

              <p className="text-gray-800 text-lg">{formatDate(publishedAt)}</p>

            </div>
          </div>
          <div className="prose max-w-none bg-white p-4">
            <BlockContent
              blocks={body}
              projectId={projectId}
              dataset={dataset}
              serializers={{
                types: {
                  // Serializer for images
                  image: ({ node }) => (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <img
                        src={urlFor(node.asset).url()} // Render body images
                        alt={node.alt} // If alt text is provided
                        style={{ maxWidth: "100%", height: "auto" }} // Adjust image styles as needed
                      />
                    </div>
                  ),
                  // Serializer for other block types
                  block: (props) => {
                    const { style = 'normal' } = props.node;

                    // Check for style and apply appropriate HTML element
                    if (/^h\d/.test(style)) {
                      const level = style.replace(/[^\d]/g, '');
                      return React.createElement(style, { className: `heading-${level}` }, props.children);
                    }

                    // If it's a list, render it as ul or ol
                    if (['bullet', 'number'].includes(style)) {
                      return React.createElement(style === 'bullet' ? 'ul' : 'ol', {}, props.children);
                    }

                    // For other styles, render them as paragraphs
                    return <p>{props.children}</p>;
                  },
                },
              }}
            />



          </div>

        </div>
      </div></div>
  );
}
