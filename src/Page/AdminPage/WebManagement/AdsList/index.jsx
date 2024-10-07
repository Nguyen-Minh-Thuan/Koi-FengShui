import React from 'react';
import search from '../../../../assets/Icon//Search.png'
import { Link } from 'react-router-dom';
import AdminNavbar from '../../../../Component/AdminNavbar'
import AdminHeader from '../../../../Component/HeaderAdmin'
import api from '../../../../Config/axios'
import { useState, useEffect } from 'react';


const Index = () => {
  const [ads, setAds] = useState([]); //tao list

  const fetchAds = async () => {
    //goi api
    try {
      const response = await api.get('Advertisement/GetAll'); //goi api
      setAds(response.data.data);
    } catch (err) {
      console.error('Error fetching ads:', err); // Xử lý lỗi nếu có
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className='flex'>
        <AdminNavbar />
        <div className='flex-1'>
          <div className='relative w-full h-[630px] flex flex-col px-[15%] py-[3%]'>
            <div className='flex items-start mb-4'>
              <div className="border-2 border-black px-2 rounded-lg">
                <input
                  className="focus:border-transparent focus:outline-none py-2 w-72"
                  placeholder="Nhập từ khóa cần tìm kiếm"
                />
              </div>
              <Link to="/" className="bg-white focus:border-transparent cursor-pointer py-1 ml-2">
                <img src={search} className="h-8 w-8" alt="Search" />
              </Link>
            </div>

            <table className="min-w-full border-collapse border-4 border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Advertisement title</th>
                  <th className="p-2">Author</th>
                  <th className="p-2">Post at</th>
                  <th className="p-2">Package</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody className='items-center text-center'>
                {ads.map((ad, index) => (
                  <tr key={index}>
                    <td className="p-2">{ad.title}</td>
                    <td className="p-2">{ad.user?.userName || 'N/A'}</td> {/* Sử dụng email từ user */}
                    <td className="p-2">{new Date(ad.expiredDate).toLocaleDateString('vi-VN')}</td> {/* Định dạng ngày */}
                    <td className="p-2 text-center">{ad.package?.packageName || 'N/A'}</td> {/* Tên gói từ package */}
                    <td className="p-2">{ad.status}</td>
                    <td className="p-2">
                      <Link to="#" className="text-blue-500 hover:underline">Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-between items-center">
              <span>Rows per page: </span>
              <select className="border p-2">
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
              <span>1 – {ads.length} of {ads.length}</span>
              <button className="ml-2 px-4 py-2">⪡</button>
              <button className="ml-2 px-4 py-2">⪢</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;