import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../../../Component/AdminNavbar';
import AdminHeader from '../../../../Component/HeaderAdmin';
import koiImg from  '../../../../assets/img/Home_banner.jpg';
import api from '../../../../Config/axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';  // Thư viện biểu đồ

function Index() {
  const [kois, setKois] = useState([]);
  const [ads, setAds] = useState([]);  // Quảng cáo
  const [users, setUsers] = useState([]);  // Người dùng
  const [loading, setLoading] = useState(true);



  const fetchKoi = async () => {
    try {
      const response = await api.get('FengShui/GetKois');
      setKois(response.data.data);
    } catch (error) {
      console.log(error);
      toast.success("Error !!")
    } finally {
      setLoading(false);
    }
  };

  const fetchAds = async () => {
    try {
      const response = await api.get('Advertisement/GetAll');  // Thay đổi endpoint nếu cần
      setAds(response.data.data);
    } catch (error) {
      toast.success("Error !!")
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('FengShui/GetUsers');  // Thay đổi endpoint nếu cần
      setUsers(response.data.data);
    } catch (error) {
      toast.success("Loading User error !!")
      console.log(error);
    }
  };

  useEffect(() => {
    fetchKoi();
    fetchAds();
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartData = [
    { name: 'Jan', ads: 30, users: 45 },
    { name: 'Feb', ads: 20, users: 35 },
    { name: 'Mar', ads: 50, users: 60 },
  ];

  return (
    <div className='bg-violet-100 min-h-screen'>
      <AdminHeader />
      <ToastContainer/>
      <div className='flex'>
        <AdminNavbar />
        <div className='flex-1 p-6'>

          {/* Section: Tổng quan */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-xl font-semibold'>Tổng số Quảng Cáo</h2>
              <p className='text-3xl font-bold'>{ads.length}</p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-xl font-semibold'>Tổng số Người Dùng</h2>
              <p className='text-3xl font-bold'>{users.length}</p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-xl font-semibold'>Tổng số Koi</h2>
              <p className='text-3xl font-bold'>{kois.length}</p>
            </div>
          </div>

          {/* Section: Biểu đồ */}
          <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
            <h2 className='text-xl font-semibold'>Thống kê Quảng Cáo và Người Dùng</h2>
            <BarChart width={600} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ads" fill="#8884d8" />
              <Bar dataKey="users" fill="#82ca9d" />
            </BarChart>
          </div>

          {/* Section: Danh sách Quảng Cáo */}
          <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
            <h2 className='text-xl font-semibold'>Các quảng cáo nổi bật</h2>
            {ads.length > 0 ? (
              <ul>
                {ads.map(ad => (
                  <li key={ad.id} className='p-2 border-b'>{ad.title} - {ad.status}</li>
                ))}
              </ul>
            ) : (
              <p>Không có quảng cáo.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
