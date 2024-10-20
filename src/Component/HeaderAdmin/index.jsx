import React from "react";
import User from "../../assets/Icon/Login.png";
import Logout from "../../assets/Icon/Logout.png";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <div className="relative">
      <div className="bg-white border-b-2 w-full py-2 flex justify-between px-10 shadow-md">
        <div className="text-2xl flex px-6 justify-between items-center w-[50%]">
          <Link to="/admin" className="font-bold w-[50%]">
            Feng Shui Koi
          </Link>
          <Link to="/" className="w-[50%]">
            Admin Chanel
          </Link>
        </div>
        <div className="flex justify-end w-[50%] items-center h-[60%]">
          <Link to="/">
            <img src={User} alt="UserIcon" className="h-12" />
          </Link>
          <Link to="/">
            <img src={Logout} alt="Logout" className="h-12 ml-12" />
          </Link>
        </div>
      </div>
      {/* <div className='h-[0px] w-full'/> */}
    </div>
  );
};

export default AdminHeader;
