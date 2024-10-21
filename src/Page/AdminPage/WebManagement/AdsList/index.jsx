import search from '../../../../assets/Icon//Search.png'
import { Link } from 'react-router-dom';
import AdminNavbar from '../../../../Component/AdminNavbar'
import AdminHeader from '../../../../Component/HeaderAdmin'
import api from '../../../../Config/axios'
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';


const Index = () => {
  const [ads, setAds] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(5);

  const startIndex = (currentPage -1)*rowPerPage;
  const endIndex = startIndex + rowPerPage;
  const currentAds = ads.slice(startIndex,endIndex);

  const fetchAds = async () => {
    try {
      const response = await api.get('Advertisement/GetAll'); 
      setAds(response.data.data);
    } catch (err) {
      console.error('Error fetching ads:', err); 
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleNextPage = () =>  {
    if(currentPage < Math.ceil(ads.length / rowPerPage))
      setCurrentPage(currentPage + 1);
  };

  const handlePrevPage= () => {
    setCurrentPage(currentPage - 1);
  }

  const handleChangeRowPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  }

  return (
    <>
      <AdminHeader />
      <ToastContainer/>
      <div className='flex'>
        <AdminNavbar />
        <div className='flex-1'>
          <div className='relative w-full h-[630px] flex flex-col px-[15%] py-[3%]'>
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
                  <th className="p-2">Advertisement title</th>
                  <th className="p-2">User Name</th>
                  <th className="p-2">Post at</th>
                  <th className="p-2">Package</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody className='items-center text-center'>
                {currentAds.map((ad, index) => (
                  <tr key={index}>
                    <td className="p-2">{ad.title}</td>
                    <td className="p-2">{ad.user?.userName || 'N/A'}</td> {/* Sử dụng email từ user */}
                    <td className="p-2">{new Date(ad.startedDate).toLocaleDateString('vi-VN')}</td> {/* Định dạng ngày */}
                    <td className="p-2 text-center">{ad.package || 'N/A'}</td> {/* Tên gói từ package */}
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
              <select className="border p-2" value={rowPerPage} onChange={handleChangeRowPerPage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              <span>{startIndex + 1}-{endIndex > ads.length ? ads.length : endIndex} of {ads.length}</span>
              <button onClick={handlePrevPage} className={`ml-2 px-4 py-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={currentPage === 1}>⪡</button>
              <button onClick={handleNextPage} className={`ml-2 px-4 py-2 ${currentPage === Math.ceil(ads.length / rowPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={currentPage === Math.ceil(ads.length / rowPerPage)}>⪢</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;