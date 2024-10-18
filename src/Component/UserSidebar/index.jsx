import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/user/profile', text: 'User Profile' },
    { path: '/user/ads/list', text: 'Danh sách tin' },
    { path: '/user/password/change', text: 'Đổi mật khẩu' },
  ];

  const handleTabChange = (path) => {
    navigate(path);
  };

  return (
    <aside className="col-span-3 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <div className="h-12 w-12 bg-gray-300 rounded-full mr-3">
          <img
            src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
            alt="Avatar"
            className="rounded-full"
          />
        </div>
        <p className="font-bold text-black">Member's name</p>
      </div>
      <ul className="space-y-2 text-black">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`text-black cursor-pointer p-2 rounded-md ${
              location.pathname === item.path ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange(item.path)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserSidebar;
