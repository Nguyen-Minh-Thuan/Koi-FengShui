import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../../Component/AdminNavbar';
import AdminHeader from '../../../../Component/HeaderAdmin';
import { ToastContainer } from 'react-toastify';
import { Line } from '@ant-design/charts'; // Sử dụng Line cho biểu đồ theo thời gian

const Index = () => {
  const [chartData, setChartData] = useState([]);

  // Dữ liệu mẫu
  const fetchData = () => {
    // Giả lập dữ liệu, có thể thay thế bằng API để lấy dữ liệu thật
    const data = [];
    const currentTime = new Date();
    for (let i = 0; i < 10; i++) {
      data.push({
        time: new Date(currentTime.getTime() - i * 60000).toLocaleTimeString(), // Thời gian hiện tại trừ đi số phút
        queries: Math.floor(Math.random() * 100), // Số lượt tra cứu ngẫu nhiên
        ads: Math.floor(Math.random() * 50), // Số quảng cáo ngẫu nhiên
      });
    }
    setChartData(data.reverse()); // Đảo ngược dữ liệu để hiển thị đúng thứ tự thời gian
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Cập nhật dữ liệu mỗi phút
    return () => clearInterval(interval); // Dọn dẹp interval khi component bị gỡ bỏ
  }, []);

  const config = {
    data: chartData,
    xField: 'time',
    yField: 'queries',
    seriesField: 'ads',
    xAxis: {
      tickCount: 5,
    },
    yAxis: {
      label: {
        formatter: (v) => `${v}`, // Có thể thay đổi định dạng nếu cần
      },
    },
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
    tooltip: {
      shared: true,
      showMarkers: false,
    },
  };

  return (
    <div className='bg-violet-100 min-h-screen'>
      <AdminHeader />
      <ToastContainer />
      <div className='flex'>
        <AdminNavbar />
        <div className='flex-1 p-6'>
          {/* Section: Biểu đồ thống kê theo thời gian */}
          <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
            <h2 className='text-xl font-semibold'>Thống kê Realtime: Tra Cứu Mệnh và Quảng Cáo</h2>
            <Line {...config} />
          </div>

          {/* Các phần còn lại của trang */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-xl font-semibold'>Tổng số Quảng Cáo</h2>
              <p className='text-3xl font-bold'>30</p> {/* Số liệu mẫu */}
            </div>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-xl font-semibold'>Tổng số Người Dùng</h2>
              <p className='text-3xl font-bold'>45</p> {/* Số liệu mẫu */}
            </div>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-xl font-semibold'>Tổng số Koi</h2>
              <p className='text-3xl font-bold'>20</p> {/* Số liệu mẫu */}
            </div>
          </div>

          {/* Section: Danh sách Quảng Cáo */}
          <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
            <h2 className='text-xl font-semibold'>Các quảng cáo nổi bật</h2>
            <ul>
              <li className='p-2 border-b'>Quảng cáo 1 - Hoạt động</li>
              <li className='p-2 border-b'>Quảng cáo 2 - Ngừng hoạt động</li>
              <li className='p-2 border-b'>Quảng cáo 3 - Hoạt động</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
