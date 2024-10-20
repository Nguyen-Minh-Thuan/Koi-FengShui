import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../../../../Config/axios';
import AdminNavbar from '../../../../../Component/HeaderAdmin'
import Imgtemp from '../../../../../assets/img/Home_img1.png'

const Index = () => {
  const {PackageId } = useParams(); // Lấy adsId từ URL
  const [PackageDetail, setPackageDetail] = useState(null);

  const ApproveAds = async () =>{
    try {
      const response = await api.post(`Advertisement/GetPackage${PackageId}`);
      if(response.status === 200)
        alert("Advertisement Approved successful !!");
    } catch (error) {
      console.log(error);
      alert("Error !!");
    }
  }
  
  
  useEffect(() => {
    const fetchAdDetail = async () => {
      try {
        const response = await api.get(`Advertisement/GetAdsById?id=${PackageId}`); // API lấy chi tiết quảng cáo
        setPackageDetail(response.data.data);
      } catch (err) {
        console.error('Error fetching ad details:', err);
      }
    };

    if (PackageId) {
      fetchAdDetail();
    }
  }, [PackageId]); // Dependency array chứa adsId để đảm bảo khi adsId thay đổi thì useEffect được gọi lại

  if (!PackageDetail) {
    return <div>Không có dữ liệu</div>;
  }

  return (
    <>
      <AdminNavbar/>
      <div className="p-8 mx-40 my-10 border border-gray-200 shadow-lg rounded-lg mb-4">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Advertisement Details</h1>
        <div className='flex justify-between'>
          <div className='pl-40'>
            <p className="mb-2"><strong>Title:</strong> {PackageDetail?.title || 'No Title Available'}</p>
            <p className="mb-2"><strong>Author ID:</strong> {PackageDetail?.userId || 'N/A'}</p>
            <p className="mb-2">
              <strong>Posted at:</strong> {PackageDetail?.startedDate ? new Date(PackageDetail.startedDate).toLocaleDateString('vi-VN') : 'N/A'}
            </p>
            <p className="mb-2"><strong>Package:</strong> {PackageDetail?.package?.packageId ? `Package ${PackageDetail.package.packageId}` : 'N/A'}</p>
          </div>

          <div className='pr-40'>            
            <p className="mb-2"><strong>Status:</strong> {PackageDetail?.status?.status1 || 'Unknown Status'}</p>
            <p className="mb-2"><strong>Payment Status:</strong> {PackageDetail?.paymentStatus ? 'Paid' : 'Unpaid'}</p>
            <p className="mb-2"><strong>Decline reason:</strong> {PackageDetail?.reason ? PackageDetail?.reason : "None"}</p>
          </div>
        </div>
        
       
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
        <h1 className='font-bold text-2xl text-center'>{PackageDetail.title}</h1>
        <img className='rounded-lg my-4 px-[10%] h-[500px]' src={Imgtemp}></img>
        <div>{PackageDetail.content}</div>
      </div>

    </>
  );
};

export default Index;
