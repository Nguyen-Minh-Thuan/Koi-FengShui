import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  const [WebListOpen, setWebManagementList] = useState(false);
  const [StatisticListOpen, setStatisticList] = useState(false);

  return (
    <>
    <div className='flex w-[300px] border-r-2 shadow-lg h-full'>
      <ul className='w-full'>
        <li className='w-full'>
          <button
            onClick={() => setWebManagementList(!WebListOpen)}
            className='w-full h-[40px] px-8 flex justify-between items-center text-white text-xl font-bold boeder-b-2'
            style={{ backgroundColor: '#4C7A7A' }}
          >
            Web Management
            <span className='ml-2'>{WebListOpen ? '▲' : '▼'}</span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              WebListOpen ? 'max-h-[300px]' : 'max-h-0'
            }`}
          >
            <ul>
              <li className='w-full h-[40px] px-8 py-2 border-t-2'>
                <Link to='/admin/accountlist'>Account</Link>
              </li>
              <li className='w-full h-[40px] px-8 py-2 border-t-2'>
                <Link to='/admin/packages'>Package</Link>
              </li>
              <li className='w-full h-[40px] px-8 py-2 border-t-2'>
                <Link to='/admin/blog'>Blog</Link>
              </li>
              <li className='w-full h-[40px] px-8 py-2 border-t-2'>
                <Link to='/admin/adslist'>Advertise</Link>
              </li>
            </ul>
          </div>
        </li>

        <li className='w-full'>
          <button
            onClick={() => setStatisticList(!StatisticListOpen)}
            className='w-full h-[40px] px-8 py-2 border-y-2 flex justify-between items-center text-white text-xl font-bold'
            style={{ backgroundColor: '#4C7A7A' }}
          >
            Statistic
            <span className='ml-2'>{StatisticListOpen ? '▲' : '▼'}</span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              StatisticListOpen ? 'max-h-[120px]' : 'max-h-0'
            }`}
          >
            <ul>
              <li className='w-full h-[40px] px-8 py-2 border-b-2'>
                <Link to='/admin'>Dashboard</Link>
              </li>
              <li className='w-full h-[40px] px-8 py-2 border-b-2'>
                <Link to='/admin'>....</Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>      
    </div>
    </>
  );
}

export default AdminNavbar;
