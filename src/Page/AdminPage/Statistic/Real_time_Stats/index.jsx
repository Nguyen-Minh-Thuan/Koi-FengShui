import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../../../Component/AdminNavbar';
import AdminHeader from '../../../../Component/HeaderAdmin';
import api from '../../../../Config/axios';
import { toast, ToastContainer } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Biểu đồ Recharts
import { Line } from 'antd'; // Biểu đồ Ant Design

function Index() {
  const [kois, setKois] = useState([]);
  const [ads, setAds] = useState([]); // Quảng cáo
  const [users, setUsers] = useState([]); // Người dùng
  const [loading, setLoading] = useState(true);

  const fetchKoi = async () => {
    try {
      const response = await api.get('FengShui/GetKois');
      setKois(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi xảy ra khi tải dữ liệu.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAds = async () => {
    try {
      const response = await api.get('Advertisement/GetAll');
      setAds(response.data.data);
    } catch (error) {
      toast.error('Có lỗi khi tải quảng cáo');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('FengShui/GetUsers');
      setUsers(response.data.data);
    } catch (error) {
      toast.error('Có lỗi khi tải dữ liệu người dùng');
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

  const lineChartData = [
    { name: 'Jan', activeAds: 20, inactiveAds: 10 },
    { name: 'Feb', activeAds: 15, inactiveAds: 5 },
    { name: 'Mar', activeAds: 25, inactiveAds: 15 },
  ];

  return (
    <div className='bg-violet-100 min-h-screen'>
      <AdminHeader />
      <ToastContainer />
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

          {/* Section: Biểu đồ Recharts */}
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

          {/* Section: Biểu đồ Ant Design */}
          <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
            <h2 className='text-xl font-semibold'>So Sánh Quảng Cáo Hoạt Động và Không Hoạt Động</h2>
            <Line
              data={lineChartData}
              xField="name"
              yField={['activeAds', 'inactiveAds']}
              seriesField="type"
              title="Quảng Cáo Hoạt Động vs Không Hoạt Động"
              color={['#8884d8', '#82ca9d']}
              point={{ size: 5, shape: 'diamond' }}
            />
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
