import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../../../Component/AdminNavbar';
import AdminHeader from '../../../../Component/HeaderAdmin';
import api from '../../../../Config/axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/Blog/GetAll');
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs: ", error);
      setError("Error loading blogs");
      toast.error("Error loading blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-violet-100 min-h-screen'>
      <AdminHeader />
      <ToastContainer />
      <div className='flex'>
        <AdminNavbar />
        <div className='flex-1 p-6'>
          <button className='bg-white rounded-xl pr-4 ml-3 shadow-lg font-semibold flex items-center text-xl'>
            <span className='m-3 text-3xl'>+</span>
            Create New Blog Post
          </button>

          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {blogs.map((blog) => (
                <div key={blog.blogId} className="bg-white shadow-lg rounded-lg p-4 m-2">
                  <img
                    className="w-full h-48 object-cover"
                    src={blog.imageUrl}
                    alt={blog.title}
                  />
                  <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
                  <p className="text-sm mt-2">{blog.content.substring(0, 50)}...</p>
                  <div className="mt-4 text-right">
                    <Link to={`/admin/blog/${blog.blogId}`} className='bg-blue-500 px-2 py-2 text-white rounded-lg hover:bg-blue-600'>View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
