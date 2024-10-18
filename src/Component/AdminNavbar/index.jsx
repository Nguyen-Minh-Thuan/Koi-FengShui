import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/Logo/FengShuiKoi_Logo.jpg";
import BlogIcon from "../../assets/Icon/blog_icon.png";
import AdsIcon from "../../assets/Icon/advertisement.png";
import AccountIcon from "../../assets/Icon/account.png";
import ChartIcon from "../../assets/Icon/chart.png";
import PackageIcon from "../../assets/Icon/money-box.png";
import NotificationIcon from "../../assets/Icon/Notification_icon.png";

const AdminNavbar = () => {
  // const [WebListOpen, setWebManagementList] = useState(false);
  // const [StatisticListOpen, setStatisticList] = useState(false);

  return (
    <div className="w-64  bg-white p-6 shadow-2xl">
      <div className="flex items-center mb-8">
        <img className="w-10 h-10" src={logo}></img>
        <span className="ml-4 text-xl font-semibold">FengShuiKoi</span>
      </div>

      <div className="mb-8">
        <h3 className="text-gray-400 mb-2 text-sm">Web Management</h3>
        <ul>
          <li className="mb-4">
            <Link to='/admin/adslist' className="flex items-center ">
              <img src={AdsIcon} className="w-5 h-5  rounded-full flex items-center justify-center mr-4"></img>
              Advertisement
            </Link>
          </li>
          <li className="mb-4">
            <Link to='/admin/accountlist' className="flex items-center ">
              <img src={AccountIcon} className="w-5 h-5  rounded-full flex items-center justify-center mr-4"></img>
              Accounts
            </Link>
          </li>
          <li className="mb-4">
            <Link to='/admin/packages' className="flex items-center ">
              <img src={PackageIcon} className="w-5 h-5   flex items-center justify-center mr-4"></img>
              Package
            </Link>
          </li>
          <li className="mb-4">
            <Link to='/admin/blog' className="flex items-center ">
              <img src={BlogIcon} className="h-4 w-4 mr-4 ml-1 rounded-sm"></img>
              Blog
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-gray-400 mb-2 text-sm">Statistic</h3>
        <ul>
          <li className="mb-4">
            <Link to='/admin' className="flex items-center text-gray-600">
              <img src={ChartIcon} className="mr-4 h-4"></img>
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to='/admin' className="flex items-center text-gray-600">
              <span className="w-3 h-3 mr-4"></span>
              ......
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminNavbar;
