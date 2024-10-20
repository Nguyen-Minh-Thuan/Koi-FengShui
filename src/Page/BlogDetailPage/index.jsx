import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://localhost:7275/api/Blog/GetBlogByElementId?id=${id}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        // Kiểm tra nếu dữ liệu trả về không có blog
        if (!data || Object.keys(data).length === 0) {
          setError("Blog not found or it may have been deleted.");
        } else {
          setBlog(data);
        }
      } catch (error) {
        setError("Error fetching blog details");
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

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
              <p className="text-gray-700 mb-4">{blog.content}</p>
              <Link
                to="/blog"
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
              >
                Back to Blogs
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
