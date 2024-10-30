import React from "react";
import ad from "../../assets/Icon/Ads.png";
import blog from "../../assets/Icon/blog_icon.png";

const StaffSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-1/4 bg-white shadow-lg border-2 p-8 mr-6 max-h">
      <h3 className="text-xl font-semibold mb-4 text-gray-500">
        Web Management
      </h3>
      <ul>
        <li className="mb-4 flex items-center">
          <img
            src={ad}
            alt="Advertisement Icon"
            className="h-8 w-8 mr-4 ml-1"
          />
          <button
            onClick={() => setActiveTab("advertisements")}
            className={`text-gray-700 hover:underline ${
              activeTab === "advertisements" ? "font-bold" : ""
            }`}
          >
            Advertisement
          </button>
        </li>
        <li className="flex items-center">
          <img src={blog} alt="Blog Icon" className="h-8 w-8 mr-4 ml-1" />
          <button
            onClick={() => setActiveTab("blogs")}
            className={`text-gray-700 hover:underline ${
              activeTab === "blogs" ? "font-bold" : ""
            }`}
          >
            Blog
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default StaffSidebar;
