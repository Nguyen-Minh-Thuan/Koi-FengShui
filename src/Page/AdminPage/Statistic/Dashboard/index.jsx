import { useState, useEffect } from "react";
import AdminNavbar from "../../../../Component/AdminNavbar";
import AdminHeader from "../../../../Component/HeaderAdmin";
import api from "../../../../Config/axios";
import { toast, ToastContainer } from "react-toastify";
import { DatePicker } from "antd";
import moment from "moment"; 
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell, Legend } from "recharts";

const Index = () => {
  const [startDate, setStartDate] = useState(moment().subtract(7, 'days')); 
  const [toDate, setToDate] = useState(moment());
  const [fengshuiData, setFengshuiData] = useState([]);
  const [adsData, setAdsData] = useState([]);

  const fetchFengshuiData = async () => {
    try {
      const formattedStartDate = startDate.format("MM-DD-YYYY"); 
      const formattedToDate = toDate.format("MM-DD-YYYY"); 
      const response = await api.get(
        `DashboardSearch/GetFengShuiFromTo?FromDate=${formattedStartDate}&ToDate=${formattedToDate}`
      );
      if (response.status === 200) {
        setFengshuiData(response.data.data);
      }
    } catch (error) {
      console.log(error.response.status);
      toast.error(`Fetch Fengshui Data error: ${error.response.data}`);
    }
  };

  const fetchAdsData = async () => {
    try {
      const formattedStartDate = startDate.format("MM-DD-YYYY"); 
      const formattedToDate = toDate.format("MM-DD-YYYY"); 
      const response = await api.get(`DashboardSearch/GetTotalAdsFromTo?FromDate=${formattedStartDate}&ToDate=${formattedToDate}`); 
      if (response.status === 200) {
        setAdsData(response.data.data);
      }
    } catch (error) {
      console.log(error.response.status);
      toast.error(`Fetch Ads Data error: ${error.response.data}`);
    }
  };

  useEffect(() => {
    fetchFengshuiData();
    fetchAdsData();
  }, [startDate, toDate]);

  const AdsChartData = adsData.map((data) => ({
    Time: data.date,
    totalAds: data.total,
  }));

  const totalPond = fengshuiData.reduce((sum, curr) => sum + curr.pond, 0); 
  const totalKoi = fengshuiData.reduce((sum, curr) => sum + curr.koi, 0); 
  const totalPoint = fengshuiData.reduce((sum, curr) => sum + curr.point, 0); 

  const FengshuiChartData =  [
    { name: 'Total pond  check requests', value: totalPond },
    { name: 'Total Destiny check requests', value: totalKoi },
    { name: 'Total compatibility check requests', value: totalPoint },
  ];

  const COLORS = [
    '#FF6384', // Đỏ
    '#36A2EB', // Xanh dương
    '#4BC0C0', // Xanh ngọc
    '#FF9F40', // Cam
    '#FF5733', // Đỏ cam
    '#FFB6C1', // Hồng nhạt
    '#90EE90', // Xanh lá nhạt
    '#FF69B4', // Hồng nóng
    '#00BFFF', // Xanh biển sáng
    '#FFA07A'  // Cam nhạt
  ];

  return (
    <>
    <div className="bg-violet-100 min-h-screen w-auto">
      <AdminHeader />
      <ToastContainer />
      <div className="flex">
        <AdminNavbar />
        <div className="flex-1 bg-violet-100 scale-95"> 
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="flex justify-center scale-110">
              <div>
                <h1 className="mb-2 font-semibold text-xl">Select start date</h1>
                <DatePicker
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  format="MM-DD-YYYY"
                />
              </div>
              <div className="ml-8">
                <h1 className="mb-2 font-semibold text-xl">Select end date</h1>
                <DatePicker
                  value={toDate}
                  onChange={(date) => setToDate(date)}
                  format="MM-DD-YYYY"
                />
              </div>
              <div className="ml-8 flex items-end">
                <button
                  className="bg-blue-500 text-white py-2 rounded-lg px-4 hover:bg-blue-600"
                  onClick={fetchFengshuiData}
                >
                  Save
                </button>
              </div>
            </div>

            <div className="mt-8 bg-red-50 mb-16 pt-6 rounded-lg">
              <h2 className='text-3xl font-semibold mb-8 text-center'>Daily advertisement count statistics</h2>
              <LineChart width={1200} height={500} data={AdsChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Time" />
                <YAxis />
                <Tooltip/>
                <Line type="monotone" dataKey="totalAds" name="New Ads daily" stroke="#00B8A9" strokeWidth={2} />
                <Legend verticalAlign="bot"/>
              </LineChart>
            </div>

            <div className="mt-8 w-full bg-blue-50 pt-6 rounded-lg">
              <h2 className='text-3xl font-semibold mb-8 text-center'>Number of Fengshui queries</h2>
              <div className="flex justify-center items-center h-full">
                <PieChart width={1200} height={600}>
                    <Pie 
                    data={FengshuiChartData} 
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                    >
                    {FengshuiChartData.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Legend verticalAlign="top"/>
                </PieChart>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Index;
