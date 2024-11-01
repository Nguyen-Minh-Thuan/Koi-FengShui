import React from "react";
import User from "../../assets/Icon/Login.png";
import Logout from "../../assets/Icon/Logout.png";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo/FengShuiKoi_Logo.jpg";


const handleLogout = () => {
  localStorage.removeItem('user');
  window.location.href = '/login';
};

const AdminHeader = () => {
  return (
    <>
    <div className="relative w-full h-18 bg-blue-50">
      <div className="bg-white border-b-1 py-2 flex justify-between px-10 shadow-md">
        <div className="text-2xl flex px-6 justify-between items-center w-[50%]">
          <Link to="/admin" className="font-bold w-[50%]">
            <div className="flex items-center ">
              <img className="w-10 h-10" src={logo}></img>
              <span className="ml-4 text-2xl font-semibold">FengShuiKoi</span>
            </div>
          </Link>
          Admin Chanel
        </div>
        <div className="flex justify-end w-[50%] items-center h-[60%]">
          <img src={User} alt="UserIcon" className="h-12" />
          <img
            src={Logout}
            alt="Logout"
            className="h-12 ml-12"
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminHeader;
