import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
   const [WebListOpen, setWebManagementList] = useState(false);
   const [StatisticListOpen, setStatisticList] = useState(false);

  return (
    <div className='flex w-[300px] h-[630px] border-r-2 '>
      <ul className='w-full'>
        <li className='w-full'>
          <button 
            onClick={() => setWebManagementList(!WebListOpen)}
            className='w-full h-[40px] px-8 py-2 border-y-2 flex justify-between items-center text-white text-xl font-bold'
            style={{backgroundColor:'#484848'}}
          >
            Web Management
            <span className='ml-2'>{WebListOpen ? '▲' : '▼'}</span>
          </button>
          {WebListOpen && (
            <ul className='flex flex-col' style={{color:'#484848'}}>
              <li className='w-full h-[40px] px-8 py-2 border-t-2'>
                <Link to='/admin/accountlist'>Account</Link>
              </li>
              <li className='w-full h-[40px] px-8 py-2 border-t-2'>
                <Link to='/package'>Package</Link>
              </li>
              <li className='w-full h-[40px] px-8 py-2 border-t-2'>
                <Link to='/blog'>Blog</Link>
              </li>
              <li className='w-full h-[40px] px-8 py-2 border-t-2'>
                <Link to='/admin/adslist'>Advertise</Link>
              </li>
            </ul>
          )}
        </li>

        <li className='w-full'>
         <button onClick={() => setStatisticList(!StatisticListOpen)} className='w-full h-[40px] px-8 py-2 border-y-2 flex justify-between items-center text-white text-xl font-bold'
            style={{backgroundColor:'#484848'}}>
            Statistic 
            <span className='ml-2'>{StatisticListOpen ? '▲' : '▼'}</span>
         </button>       
         {StatisticListOpen && (
            <ul style={{color:'#484848'}}>
               <li className='w-full h-[40px] px-8 py-2 border-b-2'>
                  <Link to='/account'>Dashboard</Link>
               </li>
               <li className='w-full h-[40px] px-8 py-2 border-b-2'>
                  <Link to='/account'>....</Link>
               </li>
            </ul>
         )}   
        </li>
      </ul>
    </div>
  );
}

export default AdminNavbar;
