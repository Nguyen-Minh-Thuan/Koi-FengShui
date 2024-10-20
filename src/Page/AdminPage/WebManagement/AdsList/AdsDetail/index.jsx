import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../../../../Config/axios';
import { Hidden } from '@mui/material';
import AdminNavbar from '../../../../../Component/HeaderAdmin'
import Imgtemp from '../../../../../assets/img/Home_img1.png'

const Index = () => {
  const { adsId } = useParams(); 
  const [adDetail, setAdDetail] = useState(null);
  const [reasonDecline, setReasonDecline] = useState("");
  const [declinedPopupVisible, setDeclinePopupVisible] = useState(false);

  const ApproveAds = async () =>{
    try {
      const response = await api.post(`Admin/ApproveAdvertisement/${adsId}`);
      if(response.status === 200)
        alert("Advertisement Approved successful !!");
    } catch (error) {
      console.log(error);
      alert(`Advertisement Approved Fail: ${error.response?.data || error.message}`);
    }
  }

  const openDeclinePopup = () => {
    setDeclinePopupVisible(true);
  }

  const closeDeclinePopup = () => {
    setDeclinePopupVisible(false);
    setReasonDecline("");
  }

  const DeclineAds = async () => {
    try {
      const response = await api.post(`Admin/DeclineAdvertisement/${adsId}`, reasonDecline, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        alert("Advertisement declined successfully.");
      } else {
        console.log('Server response:', response);
        alert("An error occurred while declining the advertisement.");
      }
    } catch (error) {
      console.error('Error declining ad:', error.response?.data || error.message);
      alert(`An error occurred: ${error.response?.data || error.message}`);
    }
    closeDeclinePopup();
  };
  
  
  useEffect(() => {
    const fetchAdDetail = async () => {
      try {
        const response = await api.get(`Advertisement/GetAdsById?id=${adsId}`); // API lấy chi tiết quảng cáo
        setAdDetail(response.data.data);
      } catch (err) {
        console.error('Error fetching ad details:', err);
      }
    };

    if (adsId) {
      fetchAdDetail();
    }
  }, [adsId]); // Dependency array chứa adsId để đảm bảo khi adsId thay đổi thì useEffect được gọi lại

  if (!adDetail) {
    return <div>Không có dữ liệu</div>;
  }

  return (
    <>
      <AdminNavbar/>
      <div className="p-8 mx-40 my-10 border border-gray-200 shadow-lg rounded-lg mb-4">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Advertisement Details</h1>
        <div className='flex justify-between'>
          <div className='pl-40'>
            <p className="mb-2"><strong>Title:</strong> {adDetail?.title || 'No Title Available'}</p>
            <p className="mb-2"><strong>User Name:</strong> {adDetail?.userName || 'N/A'}</p>
            <p className="mb-2">
              <strong>Posted at:</strong> {adDetail?.startedDate ? new Date(adDetail.startedDate).toLocaleDateString('vi-VN') : 'N/A'}
            </p>
            <p className="mb-2"><strong>Package:</strong> {adDetail?.package?.packageId ? `Package ${adDetail.package.packageId}` : 'N/A'}</p>
          </div>

          <div className='pr-40'>            
            <p className="mb-2"><strong>Status:</strong> {adDetail?.status?.status1 || 'Unknown Status'}</p>
            <p className="mb-2"><strong>Payment Status:</strong> {adDetail?.paymentStatus ? 'Paid' : 'Unpaid'}</p>
            <p className="mb-2"><strong>Decline reason:</strong> {adDetail?.reason ? adDetail?.reason : "None"}</p>
          </div>
        </div>
        
       
        {/* Bạn có thể thêm nhiều thông tin hơn nếu cần */}
        <div className='flex justify-center'>
          <Link to=''>
            <button className='bg-red-500 p-2 mx-8 rounded-lg text-white hover:bg-red-600' onClick={openDeclinePopup}>Decline</button>
          </Link>
          <Link to=''>
            <button className='bg-green-500 p-2 mx-12 rounded-lg text-white hover:bg-green-600 ' onClick={ApproveAds}>Approve</button>
          </Link>
        </div>
      </div>      

      <div className='p-8 mx-40 my-10 border border-gray-200 shadow-lg rounded-lg mb-4'>
        <h1 className='font-bold text-2xl text-center'>{adDetail.title}</h1>
        <img className='rounded-lg my-4 px-[10%] h-[500px]' src={Imgtemp}></img>
        <div>{adDetail.content}</div>
      </div>

      {declinedPopupVisible && (
        <div className='fixed flex inset-0 items-center justify-center bg-opacity-50 bg-black '>
          <div className='bg-white shadow-md p-6 rounded-lg h-[40%] w-[50%]'>
            <h1 className='text-xl font-semibold mb-4 text-center'>Enter decline reason</h1>
            <input className='h-14 w-full border-2 border-black rounded p-2 mt-6'></input>
            <div className='flex justify-center p-8'>
              <button className='bg-red-500 p-2 mx-4 rounded-lg text-white hover:bg-red-600' onClick={DeclineAds}>Decline</button>
              <button className='bg-orange-500 p-2 rounded-lg text-white hover:bg-orange-600 mx-4' onClick={closeDeclinePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Index;
