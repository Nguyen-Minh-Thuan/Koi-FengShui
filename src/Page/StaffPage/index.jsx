import React, { useEffect, useState } from 'react';
import StaffHeader from '../../Component/StaffHeader';
import api from '../../Config/axios';
import blog from '../../assets/Icon/blog_icon.png'
import ad from '../../assets/Icon/Ads.png'
import { DataGrid } from '@mui/x-data-grid';
import StaffSidebar from '../../Component/StaffSideBar';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [filteredAdvertisements, setFilteredAdvertisements] = useState([]);
  const [activeTab, setActiveTab] = useState('advertisements');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await api.get('https://localhost:7275/api/Advertisement/GetAll');
        if (response.data) {
          setAdvertisements(response.data.data);
          setFilteredAdvertisements(response.data.data); 
        }
      } catch (error) {
        console.error('Error fetching advertisements:', error);
      }
    };

    fetchAdvertisements();
  }, []);

  const columns = [
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'packageName', headerName: 'Package', width: 150 },
    { field: 'startedDate', headerName: 'Post Time', width: 150 },
    { field: 'expiredDate', headerName: 'Time Expired', width: 150 },
    { 
      field: 'action', 
      headerName: 'Action', 
      width: 150, 
      renderCell: (params) => (
        <button 
          className="bg-blue-600 text-white rounded px-2 py-1 text-sm hover:bg-blue-700 transition duration-300"
          onClick={() => navigate(`/staff/adslist/${params.row.id}`)}
        >
          Detail
        </button>
      )
    },
  ];

  const rows = advertisements.map((ad) => ({
    id: ad.adsId,
    title: ad.title,
    status: ad.status.status1,
    packageName: ad.packageId === 1 ? 'Normal package' : 'Exclusive package',
    startedDate: ad.startedDate ? new Date(ad.startedDate).toLocaleDateString() : 'Not Started',
    expiredDate: ad.expiredDate ? new Date(ad.expiredDate).toLocaleDateString() : 'Not Started',
    originalAd: ad,
  }));

  return (
    <>
      <StaffHeader />
      <div className="flex mx-auto" style={{ backgroundColor: '#F5F7F9' }}>
        <StaffSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="w-3/4">
          <div className="gap-8">
            {activeTab === 'advertisements' && (
              <div id="advertisements" className="bg-white shadow-lg rounded-lg border-2 p-6 my-14 mr-10">
                <h3 className="text-2xl font-semibold mb-4">Advertisements</h3>
                
                <div style={{ height: 500, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
                    pagination
                    page={page}
                    onPageChange={(newPage) => setPage(newPage)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
