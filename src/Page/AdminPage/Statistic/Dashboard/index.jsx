import { useState, useEffect } from 'react';
import AdminNavbar from '../../../../Component/AdminNavbar';
import AdminHeader from '../../../../Component/HeaderAdmin';
import api from '../../../../Config/axios';
import { toast, ToastContainer } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';


function Index() {
  const [kois, setKois] = useState([]);
  const [ads, setAds] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyUser, setMonthlyUser] = useState(0);
  const [totalAds, setTotalAds] = useState(0);
  
  const [dailyUser, setDailyUser] = useState(0);
  const [monthlyAds, setMonthlyAds] = useState(0);
  const [dailyAds, setDailyAds] = useState(0);
  const [fengshuiStats, setFengshuiStats] = useState({
    total: 0,
    totalDir: 0,
    totalElement: 0,
    totalPoint: 0,
  });

  

  const [weeklyFengshuiStats, setWeeklyFengshuiStats] = useState([]);
  const [weeklyFenshuiStatsChart, setWeeklyFenshuiStatsChart] = useState([]);

  const fetchTotalAds = async () => {
    try {
      const response = await api.get(`Admin/TotalAds`);
      if (response.status === 200 && response.data.status === true) {
        setTotalAds(response.data.data);
      } else {
        toast.error("Failed to fetch total ads");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error.message || "Failed to fetch data"}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchKoi = async () => {
    try {
      const response = await api.get('Koi/GetAllKois');
      setKois(response.data.data);
    } catch (error) {
      console.log(error);
      toast.success("Error !!");
    } finally {
      setLoading(false);
    }
  };

  const fetchAds = async () => {
    try {
      const response = await api.get('Advertisement/GetAll'); 
      if(response.status === 200){
        setAds(response.data.data);
        // toast.success("Fetch all ads successful")
      }            
    } catch (error) {
      toast.error("Error !!");
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('User/GetUserByPage?pageIndex=0');  
      setUsers(response.data.data);
    } catch (error) {
      toast.success("Loading User error !!");
      console.log(error);
    }
  };

  const fetchDailyUser = async () => {
    try {
      const response = await api.get('Admin/DailyUser?skip=0');
      setDailyUser(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch daily user");
    }
  };
  
  const fetchMonthlyUser = async () => {
    try {
      const response = await api.get(`Admin/MonthlyUser?skip=0`);
      setMonthlyUser(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch monthly user");
    }
  };
  
  const fetchMonthlyAds = async () => {
    try {
      const response = await api.get('Admin/MonthlyAds?skip=0');
      setMonthlyAds(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch monthly ads");
    }
  };
  
  const fetchDailyAds = async () => {
    try {
      const response = await api.get('Admin/DailyAds?skip=0');
      setDailyAds(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch daily ads");
    }
  };
  
  const fetchDailyFengshuiStats = async () => {
    try {
      const response = await api.get(`Admin/MonthlyFengshui?skip=0`);
      setFengshuiStats(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch feng shui stats");
    }
  };

  const fetchWeeklyFengshuiStats = async () => {
    try {
      const responses = await Promise.all(
        [...Array(7).keys()].map((index) => api.get(`Admin/DailyFengshui?skip=${-index}`))
      );
      const stats = responses.map(response => response.data.data);
      
     
      const chartData = stats.map((stat, index) => ({
        name: `${7 - (7-index)} ngày trước`,
        totalDir: stat.totalDir || 0,
        totalElement: stat.totalElement || 0,
        totalPoint: stat.totalPoint || 0,
      }));
      
      setWeeklyFengshuiStats(chartData);
      setWeeklyFenshuiStatsChart(chartData); 
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch feng shui stats");
    }
  };

  const fetchWeeklyStats = async () => {
    for (let index = 0; index < 7; index++) {      
      fetchWeeklyFengshuiStats(-index);
    }
  }
  
  const fetchDashboardStats = async () => {
    await Promise.all([
      fetchDailyUser(),
      fetchMonthlyUser(),
      fetchMonthlyAds(),
      fetchDailyAds(),
      fetchDailyFengshuiStats(),
    ]);
  };

  
  useEffect(() => {
    fetchKoi();
    fetchAds();
    fetchUsers();
    fetchTotalAds();
    fetchDashboardStats(); 
    fetchWeeklyStats();
    console.log(weeklyFengshuiStats);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartData = [
    { name: 'Today', ads: dailyAds, users: dailyUser },
    { name: 'This Month', ads: monthlyAds, users: monthlyUser },
  ];

  return (
    <div className='bg-violet-100 min-h-screen'>
      <AdminHeader />
      <ToastContainer />
      <div className='flex'>
        <AdminNavbar/>
        <div className='flex-1 p-3'>
          <div className='grid grid-cols-12 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-xl font-semibold'>Tổng số Quảng Cáo</h2>
              <p className='text-3xl font-bold'>{totalAds}</p>
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

          <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
            <h2 className='text-xl font-semibold'>Thống kê hàng ngày và hàng tháng</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4'>
              <div className='bg-blue-100 p-4 rounded-lg shadow'>
                <h3 className='text-lg font-semibold'>Tổng quảng cáo đã đăng hôm Nay</h3>
                <p className='text-2xl font-bold'>{dailyAds}</p>
              </div>
              <div className='bg-blue-100 p-4 rounded-lg shadow'>
                <h3 className='text-lg font-semibold'>Tổng số quảng cáo trong tháng Này</h3>
                <p className='text-2xl font-bold'>{monthlyAds}</p>
              </div>
              <div className='bg-green-100 p-4 rounded-lg shadow'>
                <h3 className='text-lg font-semibold'>Người đăng kí tài khoản mới hôm Nay</h3>
                <p className='text-2xl font-bold'>{dailyUser}</p>
              </div>
              <div className='bg-green-100 p-4 rounded-lg shadow'>
                <h3 className='text-lg font-semibold'>Người đăng kí toàn khoản mới trong tháng Này</h3>
                <p className='text-2xl font-bold'>{monthlyUser}</p>
              </div>
              <div className='bg-purple-100 p-4 rounded-lg shadow'>
                <h3 className='text-lg font-semibold'>Tổng số lượt tra cứu: {fengshuiStats.total}</h3>
                <p className='text-lg'>Tra cứu hướng hồ cá: {fengshuiStats.totalDir}</p>
                <p className='text-lg'>Tra cứu Mệnh phong thủy: {fengshuiStats.totalElement}</p>
                <p className='text-lg'>Tra cứu độ tương thích: {fengshuiStats.totalPoint}</p>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
            <h2 className='text-3xl font-semibold mb-8 text-center'>Thống kê Quảng Cáo và Người Dùng</h2>
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
          <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
            <h2 className='text-3xl font-semibold mb-8 text-center'>Thống kê Phong Thủy hàng tuần</h2>
            <LineChart width={1200} height={600} data={weeklyFenshuiStatsChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalDir" stroke="#8884d8" strokeWidth={2}/>
              <Line type="monotone" dataKey="totalElement" stroke="#82ca9d" strokeWidth={2}/>
              <Line type="monotone" dataKey="totalPoint" stroke="#ff7300" strokeWidth={2}/>
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
