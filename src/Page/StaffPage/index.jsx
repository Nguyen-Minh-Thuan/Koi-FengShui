import React, { useEffect, useState } from 'react';
import StaffHeader from '../../Component/StaffHeader';
import api from '../../Config/axios';

const Index = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Fetch advertisements
  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await api.get('Advertisement/GetAll');
        if (response.data.status) {
          setAdvertisements(response.data.data); // Assuming this is an array
        }
      } catch (error) {
        console.error('Error fetching advertisements:', error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await api.get('Blog/GetAll');
        if (response.data.status) {
          setBlogs(response.data.data); // Assuming this is an array
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchAdvertisements();
    fetchBlogs();
  }, []);

  return (
    <>
      <StaffHeader />
      <div className="mx-auto p-6" style={{ backgroundColor: '#F5F7F9' }}>
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Staff Management</h2>
        <div className="gap-8">
          <div className="bg-white shadow-lg rounded-lg my-8 p-6 border-2">
            <h3 className="text-2xl font-semibold mb-4">Advertisements</h3>
            <div className="border rounded p-6 bg-gray-50 mb-4">
              {advertisements.length > 0 ? (
                advertisements.slice(0, 3).map((ad) => (
                  <div key={ad.adsId} className="mb-2">
                    <h4 className="font-bold">{ad.title}</h4>
                    <p className="text-gray-700">{ad.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No advertisements added yet.</p>
              )}
            </div>
            <button className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition duration-300">
              View all Advertisements
            </button>
          </div>
          <div className="bg-white shadow-lg rounded-lg border-2 p-6">
            <h3 className="text-2xl font-semibold mb-4">Blogs</h3>
            <div className="border rounded p-6 bg-gray-50 mb-4">
              {blogs.length > 0 ? (
                blogs.slice(0, 3).map((blog) => (
                  <div key={blog.blogId} className="mb-2">
                    <h4 className="font-bold">{blog.title}</h4>
                    <p className="text-gray-700">{blog.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No blogs added yet.</p>
              )}
            </div>
            <button className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition duration-300">
              View all Blogs
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
