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
    <div className="relative">
      <div className="bg-white border-b-2 w-full py-2 flex justify-between px-10 shadow-md">
        <div className="text-2xl flex px-6 justify-between items-center w-[50%]">
          <Link to="/admin" className="font-bold w-[50%]">
            <div className="flex items-center ">
              <img className="w-10 h-10" src={logo}></img>
              <span className="ml-4 text-2xl font-semibold">FengShuiKoi</span>
            </div>
          </Link>
          {/* <Link to="/" className="w-[50%]"> */}
          Admin Chanel
          {/* </Link> */}
        </div>
        <div className="flex justify-end w-[50%] items-center h-[60%]">
          {/* <Link to="/"> */}
          <img src={User} alt="UserIcon" className="h-12" />
          {/* </Link> */}
          <img
            src={Logout}
            alt="Logout"
            className="h-12 ml-12"
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      {/* <div className='h-[0px] w-full'/> */}
    </div>
  );
};

export default AdminHeader;
