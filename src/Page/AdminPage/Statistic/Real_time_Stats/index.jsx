import { useState, useEffect } from 'react';
import AdminNavbar from '../../../../Component/AdminNavbar';
import AdminHeader from '../../../../Component/HeaderAdmin';
import api from '../../../../Config/axios';
import { toast, ToastContainer } from 'react-toastify';


function Index() {
  const [kois, setKois] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyUser, setMonthlyUser] = useState(0);
  const [totalAds, setTotalAds] = useState(0);
  
  const [dailyUser, setDailyUser] = useState(0);
  const [monthlyAds, setMonthlyAds] = useState(0);
  const [dailyAds, setDailyAds] = useState(0);
  const [monthlyFengshui, setMonthlyFengshui] = useState({
    total: 0,
    totalDir: 0,
    totalElement: 0,
    totalPoint: 0,
  });

  const [dailyFengshui, setdailyFengshui] = useState({
    total: 0,
    totalDir: 0,
    totalElement: 0,
    totalPoint: 0,
  });


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
  
  const fetchMonthlyFengshui = async () => {
    try {
      const response = await api.get(`Admin/MonthlyFengshui`);
      setMonthlyFengshui(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch feng shui stats");
    }
  };

  const fetchDailyFengshui = async () => {
    try {
      const response = await api.get(`Admin/DailyFengshui`);
      setdailyFengshui(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch feng shui stats");
    }
  };

  const fetchDashboardStats = async () => {
    await Promise.all([
      fetchDailyUser(),
      fetchMonthlyUser(),
      fetchMonthlyAds(),
      fetchDailyAds(),
      fetchMonthlyFengshui(),
      fetchDailyFengshui(),
    ]);
  };

  
  useEffect(() => {
    fetchKoi();
    fetchUsers();
    fetchTotalAds();
    fetchDashboardStats(); 
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className='bg-violet-100 min-h-screen'>
      <AdminHeader />
      <ToastContainer />
      <div className='flex'>
        <AdminNavbar/>
        <div className='flex-1'>
          <div className='scale-95'>
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
                <h3 className='text-lg font-semibold'>Tổng quảng cáo đã đăng hôm nay</h3>
                <p className='text-2xl font-bold'>{dailyAds}</p>
              </div>
              <div className='bg-blue-100 p-4 rounded-lg shadow'>
                <h3 className='text-lg font-semibold'>Tổng số quảng cáo trong tháng này</h3>
                <p className='text-2xl font-bold'>{monthlyAds}</p>
              </div>
              <div className='bg-green-100 p-4 rounded-lg shadow'>
                <h3 className='text-lg font-semibold'>Người đăng kí tài khoản mới hôm nay</h3>
                <p className='text-2xl font-bold'>{dailyUser}</p>
              </div>
              <div className='bg-green-100 p-4 rounded-lg shadow'>
                <h3 className='text-lg font-semibold'>Người đăng kí toàn khoản mới trong tháng này</h3>
                <p className='text-2xl font-bold'>{monthlyUser}</p>
              </div>
              <div className='bg-purple-100 p-4 rounded-lg shadow'>
                <h3 className='text-lg font-semibold'>Tổng số lượt tra cứu tháng này: {monthlyFengshui.total}</h3>
                <p className='text-lg'>Tra cứu hướng hồ cá: {monthlyFengshui.totalDir}</p>
                <p className='text-lg'>Tra cứu Mệnh phong thủy: {monthlyFengshui.totalElement}</p>
                <p className='text-lg'>Tra cứu độ tương thích: {monthlyFengshui.totalPoint}</p>
              </div>
              <div className='bg-purple-100 p-4 rounded-lg shadow'>
                <h3 className='text-lg font-semibold'>Tổng số lượt tra cứu hôm nay: {dailyFengshui.total}</h3>
                <p className='text-lg'>Tra cứu hướng hồ cá: {dailyFengshui.totalDir}</p>
                <p className='text-lg'>Tra cứu Mệnh phong thủy: {dailyFengshui.totalElement}</p>
                <p className='text-lg'>Tra cứu độ tương thích: {dailyFengshui.totalPoint}</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
