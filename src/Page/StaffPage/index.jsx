import React, { useEffect, useState } from 'react';
import StaffHeader from '../../Component/StaffHeader';
import api from '../../Config/axios';

const Index = () => {
  const [pendingAdvertisements, setPendingAdvertisements] = useState([]);
  const [allAdvertisements, setAllAdvertisements] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchPendingAdvertisements = async () => {
      try {
        const response = await api.get('Advertisement/GetPendingAds');
        if (response.data.status) {
          setPendingAdvertisements(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching pending advertisements:', error);
      }
    };

    const fetchAllAdvertisements = async () => {
      try {
        const response = await api.get('Advertisement/GetAll'); 
        if (response.data.status) {
          setAllAdvertisements(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching all advertisements:', error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await api.get('Blog/GetAll');
        if (response.data.status) {
          setBlogs(response.data.data); 
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchPendingAdvertisements();
    fetchAllAdvertisements();
    fetchBlogs();
  }, []);

  return (
    <>
      <StaffHeader />
      <div className="mx-auto p-6" style={{ backgroundColor: '#F5F7F9' }}>
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Staff Management</h2>
        <div className="gap-8">

          <div className="bg-white shadow-lg rounded-lg border-2 p-6 my-8">
            <h3 className="text-2xl font-semibold mb-4">Advertisements</h3>
            <div className="border rounded p-6 bg-gray-50 mb-4">

              <h4 className="font-bold mb-2 text-red-500">Pending Advertisements</h4>
              {pendingAdvertisements.length > 0 ? (
                pendingAdvertisements.slice(0, 3).map((ad) => (
                  <div key={ad.adsId} className="mb-2">
                    <h5 className="font-bold">{ad.title}</h5>
                    <p className="text-gray-700">{ad.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No pending advertisements available.</p>
              )}


              <hr className="my-4" />


              <h4 className="font-bold mb-2 text-red-500">All Advertisements</h4>
              {allAdvertisements.length > 0 ? (
                allAdvertisements.slice(0, 3).map((ad) => ( 
                  <div key={ad.adsId} className="mb-2">
                    <h5 className="font-bold">{ad.title}</h5>
                    <p className="text-gray-700">{ad.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No advertisements available.</p>
              )}
            </div>

            <div className='flex mb-4'>
              <button className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition duration-300 mr-2">
                View All Ads Pending
              </button>
              <button className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition duration-300 ml-2">
                View All Ads List
              </button>
            </div>
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
