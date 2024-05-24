import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import createClient from "../../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { CiMenuFries } from "react-icons/ci";
import { BiArrowBack } from "react-icons/bi";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Menu from './header/menu/Menu';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null); // State to store selected icon
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleIconClick = useCallback((icon, product, searchTerm) => {
    setSelectedIcon(icon); // Update selected icon state
    navigate("/", { state: { selectedIcon: icon } }); // Navigate with selected icon state
  }, [navigate]);

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
    <div className='w-screen h-screen flex justify-center'>
      <div className='w-full absolute border-2 h-full border-black rounded md:w-1/2 lg:w-1/3 max-w-[400px] max-h-[800px] justify-center overflow-hidden'>
        <div className='w-full h-16 flex flex-row items-center py-0 border-b-2 border-black bg-gray-300'>
          <div className="h-full w-1/5 flex justify-center pl-2">
            <Link to="/blog" className='flex flex-col justify-center'>
              <div className='px-0 flex flex-row w-fit items-center justify-center gap-0 rounded-lg shadow-md border-gray-400 border-2 bg-black h-fit'>
                <div className="text-yellow-500 text-lg">
                  <BiArrowBack />
                </div>
                <div className='flex flex-col justify-center p-2'>
                  <div className='text-white text-lg'>Back</div>
                </div>
              </div>
            </Link>
          </div>
          <div className="font-sriracha w-3/5 flex justify-center items-center h-full pr-2">
            <span className="text-2xl">Homie.Mobi</span>
            <span className='text-red-500 text-xl'>/blog</span>
          </div>
          <div className='h-full w-1/5 flex items-center justify-center text-3xl px-0'>
            <CiMenuFries onClick={toggleMenu} className={`${isMenuOpen ? 'text-yellow-500' : 'text-black'} cursor-pointer z-40`} />
          </div>
        </div>
        <Menu isOpen={isMenuOpen} handleIconClick={handleIconClick} toggleMenu={toggleMenu} />
        <div className="w-full overflow-y-auto bg-black h-full pb-20">
          <div className="w-full overflow-y-auto bg-gray-100 px-2 pt-4">
            <div className="text-2xl bg-white pt-2 flex flex-col items-center border-b-2 border-black border-double mb-0">
              <div className="flex justify-center">
                <h2 className="font-bold w-3/4 text-center">{title}</h2>
              </div>
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
                    image: ({ node }) => {
                      if (node.asset) {
                        return (
                          <div className="flex justify-center h-fit m-0">
                            <img
                              src={urlFor(node.asset).url()}
                              alt={node.alt}
                              className="max-w-full h-auto cover"
                            />
                          </div>
                        );
                      } else {
                        return null;
                      }
                    },
                    code: ({ node }) => (
                      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                        {node.code}
                      </SyntaxHighlighter>
                    ),

                    block: (props) => {
                      const { style = 'normal' } = props.node;
                      if (/^h\d/.test(style)) {
                        const level = style.replace(/[^\d]/g, '');
                        return React.createElement(
                          style,
                          { className: `text-${level === '1' ? '4xl' : level === '2' ? '3xl' : level === '3' ? '2xl' : 'xl'} font-bold my-4` },
                          props.children
                        );
                      }
                      if (style === 'blockquote') {
                        return <blockquote className="border-l-4 border-gray-500 pl-4 my-4 italic">{props.children}</blockquote>;
                      }
                      return <p className="my-2">{props.children}</p>;
                    },
                    list: ({ type, children }) => {
                      const className = type === 'bullet' ? 'list-disc ml-5' : 'list-decimal ml-5';
                      return <ul className={className}>{children}</ul>;
                    },
                    listItem: ({ children }) => <li className="my-2">{children}</li>,
                  },
                  marks: {
                    textColor: ({ mark, children }) => {
                      return (
                        <span style={{ color: mark.color }}>
                          {children}
                        </span>
                      );
                    },
                    fontFamily: ({ mark, children }) => {
                      const style = { fontFamily: mark.font === 'roboto' ? 'Roboto, sans-serif' : 'inherit' };
                      return <span style={style}>{children}</span>;
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
