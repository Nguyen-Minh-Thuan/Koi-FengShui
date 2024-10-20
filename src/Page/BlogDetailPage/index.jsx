import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch(
          "https://localhost:7275/api/Element/GetElement"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.status) {
          setElements(data.data);
        }
      } catch (error) {
        console.error("Error fetching elements:", error);
      }
    };

    const fetchBlog = async () => {
      console.log("Fetching blog with ID:", id);
      try {
        const blogId = parseInt(id, 10);
        const response = await fetch(
          `https://localhost:7275/api/Blog/GetBlogById?id=${blogId}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Blog data:", data);

        if (
          data &&
          data.status &&
          data.data &&
          data.data.blogId !== undefined
        ) {
          setBlog(data.data);
        } else {
          setError("Blog not found or it may have been deleted.");
        }
      } catch (error) {
        setError("Error fetching blog details");
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchElements();
    fetchBlog();
  }, [id]);

  const getElementName = (elementId) => {
    const element = elements.find((el) => el.elementId === elementId);
    return element ? element.element1 : "Unknown";
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-xl font-semibold text-red-500">{error}</h2>
        <Link
          to="/blog"
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        {blog ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-80 object-cover transition-transform duration-300 hover:scale-110"
              />
              <h1 className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-3xl font-bold p-4">
                {blog.title}
              </h1>
            </div>
            <div className="p-6">
              {blog.elementId && (
                <div
                  className={`mb-4 p-2 border-l-4 font-semibold ${
                    getElementName(blog.elementId) === "Kim"
                      ? "bg-gray-100 border-gray-500 text-gray-700"
                      : getElementName(blog.elementId) === "Mộc"
                      ? "bg-green-100 border-green-500 text-green-700"
                      : getElementName(blog.elementId) === "Thủy"
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : getElementName(blog.elementId) === "Hỏa"
                      ? "bg-red-100 border-red-500 text-red-700"
                      : getElementName(blog.elementId) === "Thổ"
                      ? "bg-yellow-100 border-yellow-600 text-yellow-700"
                      : ""
                  }`}
                >
                  Mệnh: {getElementName(blog.elementId)}
                </div>
              )}
              <div
                className="text-gray-700 mb-4"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              <Link
                to="/blog"
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
              >
                Quay về
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Blog not found</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlogDetailPage;
