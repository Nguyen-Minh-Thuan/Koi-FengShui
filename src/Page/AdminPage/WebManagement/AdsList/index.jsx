import search from '../../../../assets/Icon/Search.png';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../../../Component/AdminNavbar';
import AdminHeader from '../../../../Component/HeaderAdmin';
import api from '../../../../Config/axios';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

const Index = () => {
  const [pendingAds, setPendingAds] = useState([]); 
  const [allAds, setAllAds] = useState([]);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [rowPerPageAll, setRowPerPageAll] = useState(5);
  const [rowPerPagePending, setRowPerPagePending] = useState(5);


  // Pagination for Pending Ads
  const startIndexPending = (currentPagePending - 1) * rowPerPagePending;
  const endIndexPending = startIndexPending + rowPerPagePending;
  const currentPendingAds = pendingAds.slice(startIndexPending, endIndexPending);

  // Pagination for All Ads
  const startIndexAll = (currentPageAll - 1) * rowPerPagePending;
  const endIndexAll = startIndexAll + rowPerPagePending;
  const currentAllAds = allAds.slice(startIndexAll, endIndexAll);

  // Fetch pending advertisements
  const fetchPendingAds = async () => {
    try {
      const response = await api.get('Advertisement/GetPendingAds'); 
      setPendingAds(response.data.data);
    } catch (err) {
      console.error('Error fetching pending ads:', err); 
    }
  };

  // Fetch all advertisements
  const fetchAllAds = async () => {
    try {
      const response = await api.get('Advertisement/GetAll'); 
      setAllAds(response.data.data);
    } catch (err) {
      console.error('Error fetching all ads:', err); 
    }
  };

  useEffect(() => {
    fetchPendingAds();
    fetchAllAds();
  }, []);

  // Pagination handlers for Pending Ads
  const handleNextPagePending = () => {
    if (currentPagePending < Math.ceil(pendingAds.length / rowPerPagePending))
      setCurrentPagePending(currentPagePending + 1);
  };

  const handlePrevPagePending = () => {
    if (currentPagePending > 1)
      setCurrentPagePending(currentPagePending - 1);
  };

  // Pagination handlers for All Ads
  const handleNextPageAll = () => {
    if (currentPageAll < Math.ceil(allAds.length / rowPerPagePending))
      setCurrentPageAll(currentPageAll + 1);
  };

  const handlePrevPageAll = () => {
    if (currentPageAll > 1)
      setCurrentPageAll(currentPageAll - 1);
  };

  const handleChangeRowPerPage = (event) => {
    setRowPerPagePending(parseInt(event.target.value, 10));
    setCurrentPagePending(1); // Reset to first page for Pending Ads
    setCurrentPageAll(1); // Reset to first page for All Ads
  };

  return (
    <>
      <AdminHeader />
      <ToastContainer />
      <div className='flex'>
        <AdminNavbar />
        <div className='flex-1 p-6 bg-violet-100 min-h-screen'>
          <div className='bg-white shadow-lg p-8 mb-6'>
            <h1 className='text-center font-semibold text-2xl'>Pending Advertisements</h1>
            <div className='relative w-full h-min flex flex-col px-[5%] py-[3%]'>
              <div className='flex items-start mb-4'>
                <div className="border-2 border-black px-2 rounded-lg">
                  <input
                    className="focus:border-transparent focus:outline-none py-2 w-72"
                    placeholder="Search"
                  />
                </div>
                <Link to="/" className="bg-white focus:border-transparent cursor-pointer py-1 ml-2">
                  <img src={search} className="h-8 w-8" alt="Search" />
                </Link>
              </div>

              <table className="min-w-full border-collapse border-4 border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Advertisement Title</th>
                    <th className="p-2">User Name</th>
                    <th className="p-2">Post At</th>
                    <th className="p-2">Package</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody className='items-center text-center'>
                  {currentPendingAds.map((ad, index) => (
                    <tr key={index}>
                      <td className="p-2">{ad.title}</td>
                      <td className="p-2">{ad.user?.userName || 'N/A'}</td>
                      <td className="p-2">{new Date(ad.startedDate).toLocaleDateString('vi-VN')}</td>
                      <td className="p-2 text-center">{ad.package?.packageName || 'N/A'}</td>
                      <td className="p-2">{ad.status.status1}</td>
                      <td className="p-2">
                        <Link to={`/admin/adslist/${ad.adsId}`} className="text-blue-500 hover:underline">Details</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex justify-between items-center">
                <span>Rows per page: </span>
                <select className="border p-2" value={rowPerPagePending} onChange={handleChangeRowPerPage}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
                <span>
                  {startIndexPending + 1}-{endIndexPending > pendingAds.length ? pendingAds.length : endIndexPending} of {pendingAds.length}
                </span>
                <div>
                  <button
                    onClick={handlePrevPagePending}
                    className={`ml-2 px-4 py-2 ${currentPagePending === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPagePending === 1}
                  >
                    ⪡
                  </button>
                  <button
                    onClick={handleNextPagePending}
                    className={`ml-2 px-4 py-2 ${currentPagePending === Math.ceil(pendingAds.length / rowPerPagePending) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPagePending === Math.ceil(pendingAds.length / rowPerPagePending)}
                  >
                    ⪢
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white shadow-lg p-8'>
            <h1 className='text-center font-semibold text-2xl'>All Advertisements</h1>
            <div className='relative w-full h-min flex flex-col px-[5%] py-[3%]'>
              <table className="min-w-full border-collapse border-4 border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Advertisement Title</th>
                    <th className="p-2">User Name</th>
                    <th className="p-2">Post At</th>
                    <th className="p-2">Package</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody className='items-center text-center'>
                  {currentAllAds.map((ad) => (
                    <tr key={ad.adsId}>
                      <td className="p-2">{ad.title}</td>
                      <td className="p-2">{ad.user?.userName || 'N/A'}</td>
                      <td className="p-2">{new Date(ad.startedDate).toLocaleDateString('vi-VN')}</td>
                      <td className="p-2 text-center">{ad.package?.packageName || 'N/A'}</td>
                      <td className="p-2">{ad.status.status1}</td>
                      <td className="p-2">
                        <Link to={`/admin/adslist/${ad.adsId}`} className="text-blue-500 hover:underline">Details</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex justify-between items-center">
                <span>Rows per page: </span>
                <select className="border p-2" value={rowPerPageAll} onChange={handleChangeRowPerPage}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
                <span>
                  {startIndexAll + 1}-{endIndexAll > allAds.length ? allAds.length : endIndexAll} of {allAds.length}
                </span>
                <div>
                  <button
                    onClick={handlePrevPageAll}
                    className={`ml-2 px-4 py-2 ${currentPageAll === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPageAll === 1}
                  >
                    ⪡
                  </button>
                  <button
                    onClick={handleNextPageAll}
                    className={`ml-2 px-4 py-2 ${currentPageAll === Math.ceil(allAds.length / rowPerPageAll) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPageAll === Math.ceil(allAds.length / rowPerPageAll)}
                  >
                    ⪢
                  </button>
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
