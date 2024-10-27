import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogIcon from "../../assets/Icon/blog_icon.png";
import AdsIcon from "../../assets/Icon/ads.png";
import AccountIcon from "../../assets/Icon/profile.png";
import ChartIcon from "../../assets/Icon/line-graph.png";
import PackageIcon from "../../assets/Icon/package.png";
import realTime from "../../assets/Icon/real-time.png";
import NotificationIcon from "../../assets/Icon/Notification_icon.png";
import Koi from "../../assets/Icon/koi-fish.png"

const AdminNavbar = () => {
  // const [WebListOpen, setWebManagementList] = useState(false);
  // const [StatisticListOpen, setStatisticList] = useState(false);

  return (
    <div className="w-64 min-h-screen bg-white p-6 shadow-2xl">
     

      <div className="mb-8">
        <h3 className="text-gray-400 mb-2 text-2xl">Web Management</h3>
        <ul className='font-semibold'>
          <li className="mb-4">
            <Link to='/admin/adslist' className="flex items-center ">
              <img src={AdsIcon} className="w-8 h-8   flex items-center justify-center mr-4"></img>
              Advertisement
            </Link>
          </li>
          <li className="mb-4">
            <Link to='/admin/accountlist' className="flex items-center ">
              <img src={AccountIcon} className="w-8 h-8   flex items-center justify-center mr-4"></img>
              Accounts
            </Link>
          </li>
          <li className="mb-4">
            <Link to='/admin/packages' className="flex items-center ">
              <img src={PackageIcon} className="w-8 h-8   flex items-center justify-center mr-4"></img>
              Package
            </Link>
          </li>
          <li className="mb-4">
            <Link to='/admin/blog' className="flex items-center ">
              <img src={BlogIcon} className="h-8 w-8 mr-4 ml-1 "></img>
              Blog
            </Link>
          </li>
          <li className="mb-4">
            <Link to='/admin/koilist' className="flex items-center ">
              <img src={Koi} className="h-8 w-8 mr-4 ml-1 "></img>
              Koi
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-gray-400 mb-2 text-2xl">Statistic</h3>
        <ul className='font-semibold'>
          <li className="mb-4">
            <Link to='/admin/dashboard' className="flex items-center ">
              <img src={ChartIcon} className="mr-4 h-8 w-8"></img>
              Dashboard
            </Link>
          </li>
          {/* <li className="mb-4">
            <Link to='/admin/realtime' className="flex items-center ">
              <img className="mr-4 h-8 w-8" src={realTime}></img>
              Real Time Stats
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default AdminNavbar;
