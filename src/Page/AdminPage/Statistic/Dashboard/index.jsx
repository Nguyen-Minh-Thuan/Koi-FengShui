import React from 'react';
import AdminNavbar from '../../../../Component/AdminNavbar';
import AdminHeader from '../../../../Component/HeaderAdmin';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales over the Months',
    },
  },
};

const index = () => {
  return (
    <div>
      <AdminHeader />
      <div className='flex'>
        <AdminNavbar />
        <div className='p-6'>
          <h2 className="text-2xl font-semibold mb-4">Advertisement</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Sales Data</h3>
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
