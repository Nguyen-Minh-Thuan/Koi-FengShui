import React from 'react';
import ad from '../../assets/Icon/Ads.png';
import blog from '../../assets/Icon/blog_icon.png';

const StaffSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-1/4 bg-white shadow-lg border-2 p-8 mr-6" style={{ height: '720px' }}>
      <h3 className="text-xl font-semibold mb-4 text-gray-500">Web Management</h3>
      <ul>
        <li className="mb-4 flex items-center">
          <img src={ad} alt="Advertisement Icon" className="h-8 w-8 mr-4 ml-1" />
          <button
            onClick={() => setActiveTab('advertisements')}
            className={`text-gray-700 hover:underline ${activeTab === 'advertisements' ? 'font-bold' : ''}`}
          >
            Advertisement
          </button>
        </li>
        <li className="flex items-center">
          <img src={blog} alt="Blog Icon" className="h-8 w-8 mr-4 ml-1" />
          <button
            onClick={() => setActiveTab('blogs')}
            className={`text-gray-700 hover:underline ${activeTab === 'blogs' ? 'font-bold' : ''}`}
          >
            Blog
          </button>
        </li>
      </ul>
      <div className="mt-6">
        {activeTab === 'advertisements' && (
          <div>
            <h4 className="text-lg font-semibold">Advertisement Content</h4>
            <p>This is the content for the Advertisement tab.</p>
          </div>
        )}
        {activeTab === 'blogs' && (
          <div>
            <h4 className="text-lg font-semibold">Blog Content</h4>
            <p>This is the content for the Blog tab.</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default StaffSidebar;
