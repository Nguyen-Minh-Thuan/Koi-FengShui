import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from "../../assets/Icon/Logout.png";

const index = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Staff chanel</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <img
                src={Logout}
                alt="Logout"
                className="h-12 ml-12"
                onClick={handleLogout}
                style={{ cursor: 'pointer' }}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default index;
