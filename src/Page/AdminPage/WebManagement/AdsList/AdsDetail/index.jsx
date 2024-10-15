import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../../../Config/axios';

const Index = () => {
  const { adsId } = useParams(); // Lấy adsId từ URL
  const [adDetail, setAdDetail] = useState(null);

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
    <div className="p-8 m-10 border border-gray-200 shadow-lg rounded-lg mb-4">
      <h1 className="text-2xl font-bold mb-4">Advertisement Details</h1>
      <p className="mb-2"><strong>Title:</strong> {adDetail?.title || 'No Title Available'}</p>
      <p className="mb-2"><strong>Author ID:</strong> {adDetail?.userId || 'N/A'}</p>
      <p className="mb-2">
        <strong>Posted at:</strong> {adDetail?.startedDate ? new Date(adDetail.startedDate).toLocaleDateString('vi-VN') : 'N/A'}
      </p>
      <p className="mb-2"><strong>Package:</strong> {adDetail?.package?.packageId ? `Package ${adDetail.package.packageId}` : 'N/A'}</p>
      <p className="mb-2"><strong>Status:</strong> {adDetail?.status?.status1 || 'Unknown Status'}</p>
      <p className="mb-2"><strong>Payment Status:</strong> {adDetail?.paymentStatus ? 'Paid' : 'Unpaid'}</p>
      {/* Bạn có thể thêm nhiều thông tin hơn nếu cần */}
    </div>
  );
};

export default Index;
