import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [memberName, setMemberName] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      const userId = parsedData.userId;

      fetch(`https://localhost:7275/api/User/${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setMemberName(data.data.userName); 
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const menuItems = [
    { path: '/user/profile', text: 'Hồ sơ người dùng' },
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
        <p className="font-bold text-black">{memberName || "Member's name"}</p>
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
