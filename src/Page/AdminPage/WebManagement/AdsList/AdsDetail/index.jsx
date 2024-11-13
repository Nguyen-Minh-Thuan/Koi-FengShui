import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../../../Config/axios';
import AdminNavbar from '../../../../../Component/HeaderAdmin'
import { toast, ToastContainer } from 'react-toastify';

const Index = () => {
  const { adsId } = useParams(); 
  const [adDetail, setAdDetail] = useState(null);
  const [reasonDecline, setReasonDecline] = useState();
  const [declinedPopupVisible, setDeclinePopupVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  

  const ApproveAds = async () =>{
    try {
      const response = await api.post(`Admin/ApproveAdvertisement/${adsId}`);
      if(response.status === 200){
        toast.success(`Success mesage: ${response.data}`);
        fetchAdDetail();
      }
    } catch (error) {
      console.log(error);
      toast.error(`Advertisement Approved Fail: ${error.response?.data || error.message}`);
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
      const token = JSON.parse(localStorage.getItem('token')); 
      const response = await api.post(
        `Admin/DeclineAdvertisement/${adsId}`,
        JSON.stringify(reasonDecline), 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          }
        }
      );      
      if(response.status === 200){
        toast.success(`Decline successful !!`);
      }
    } catch (error) {
      console.error('Error declining ad:', error.response?.data || error.message);
      alert(`An error occurred: ${error.response?.data || error.message}`);
    }
    closeDeclinePopup();
  };
  
  const fetchAdDetail = async () => {
    try {
      const response = await api.get(`Advertisement/GetAdsById?id=${adsId}`); 
      setAdDetail(response.data.data);
      if((response.data.data.status?.status1) === 'Pending' ? setButtonVisible(true) : setButtonVisible(false));
      console.log(buttonVisible);
    } catch (err) {
      console.error('Error fetching ad details:', err);
    }
  };
  
  useEffect(() => {
    fetchAdDetail();

    if (adsId) {
      fetchAdDetail();
    }

  }, [adsId]);

  if (!adDetail) {
    return <div>Không có dữ liệu</div>;
  }

  return (
    <>
      <AdminNavbar/>
      <ToastContainer/>
      <div className="p-8 mx-40 my-10 border border-gray-200 shadow-lg rounded-lg mb-4">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Advertisement Details</h1>
        <div className='flex justify-between'>
          <div className='pl-40'>
            <p className="mb-2"><strong>Title:</strong> {adDetail?.title || 'No Title Available'}</p>
            <p className="mb-2"><strong>User Name:</strong> {adDetail?.user?.userName || 'N/A'}</p>
            <p className="mb-2">
              <strong>Start date:</strong> {adDetail?.startedDate ? new Date(adDetail.startedDate).toLocaleDateString('vi-VN') : 'N/A'}
            </p>
            <p className="mb-2"><strong>Package:</strong> {adDetail?.package?.packageName ? `${adDetail.package.packageName}` : 'N/A'}</p>
          </div>

          <div className='pr-40'>            
            <p className="mb-2"><strong>Status:</strong> {adDetail?.status?.status1 || 'Unknown Status'}</p>
            <p className="mb-2"><strong>Payment Status:</strong> {adDetail?.paymentStatus ? 'Paid' : 'Unpaid'}</p>
            <p className="mb-2"><strong>Decline reason:</strong> {adDetail?.reason ? adDetail?.reason : "None"}</p>
          </div>
        </div>
        
       
        {buttonVisible &&
        <div className='flex justify-center'>
            <button className='bg-red-500 p-2 mx-8 rounded-lg text-white hover:bg-red-600' onClick={openDeclinePopup}>Decline</button>
            <button className='bg-green-500 p-2 mx-12 rounded-lg text-white hover:bg-green-600 ' onClick={ApproveAds}>Approve</button>
        </div>
        }

      </div>      

      <div className='p-8 mx-40 my-10 border border-gray-200 shadow-lg rounded-lg mb-4'>
        <h1 className='font-bold text-2xl text-center'>{adDetail.title}</h1>
        <div className='w-full flex justify-center'>
          <img className='rounded-lg my-4 ' src={adDetail.imageUrl}></img>
        </div>
        
        <div dangerouslySetInnerHTML={{ __html: adDetail.content}}/>
      </div>

      {declinedPopupVisible && (
        <div className='fixed flex inset-0 items-center justify-center bg-opacity-50 bg-black '>
          <div className='bg-white shadow-md p-6 rounded-lg h-[40%] w-[50%]'>
            <h1 className='text-xl font-semibold mb-4 text-center'>Enter decline reason</h1>
            <input className='h-14 w-full border-2 border-black rounded p-2 mt-6'
              onChange={(event) => setReasonDecline(event.target.value)}
            />
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
