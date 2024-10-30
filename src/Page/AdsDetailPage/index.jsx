import React, { useEffect, useState } from 'react'; 
import { useParams, Link } from 'react-router-dom'; 
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NavBar from '../../Component/NavBar';
import Footer from '../../Component/Footer';
import AdsCard from '../../Component/AdsCard';  

const elementIdToCategory = {
  1: 'Kim',
  2: 'Thủy',
  3: 'Hỏa',
  4: 'Mộc',
  5: 'Thổ',
};


const AdsDetailPage = () => {
  const { id } = useParams(); 
  const [ad, setAd] = useState(null); 
  const [recommendedAds, setRecommendedAds] = useState([]);

  useEffect(() => {
    const fetchAd = async () => {
      const response = await fetch(`https://localhost:7275/api/Advertisement/GetAdsById?id=${id}`); 
      const addata = await response.json();
      const ad = addata.data;
      setAd(ad);

      if (ad && ad.elementId) {
        const recResponse = await fetch(`https://localhost:7275/api/Advertisement/GetRecAds?Elementid=${ad.elementId}`);
        const recData = await recResponse.json();
        const filteredAds = recData.data.filter(product => product.adsId !== ad.adsId);
        setRecommendedAds(filteredAds || []);
      }
    };

    fetchAd();
  }, [id]); 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `Cập nhật ${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
      return `Cập nhật ${diffInHours} giờ trước`;
    } else if (diffInDays < 30) {
      return `Cập nhật ${diffInDays} ngày trước`;
    } else {
      return `Cập nhật vào ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  };

  if (!ad) {
    return <div>ad not found</div>; 
  }
  return (
    <>
    <NavBar/>
    <div className="max-w-5xl mx-auto p-4 font-sans mt-10" >
      <div className="flex flex-col md:flex-row gap-8 mb-12">
            <img src={ad.imageUrl} alt={ad.title} className="w-full md:w-[300px] h-[450px] object-contain" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{ad.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <AccessTimeIcon className="mr-2" />
            <span>{formatDate(ad.startedDate)}</span>
          </div>
          <p className="text-gray-600 mb-4">{ad.content}</p>
         
          <div className="space-x-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Loại: {ad.adsType.typeName}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              Mệnh:  {elementIdToCategory[ad.elementId] || 'Không khả dụng'}
            </span>
          </div>
        </div>
      </div>
      <hr className="my-8 h-px border-0 bg-gray-300" />
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">CÁC SẢN PHẨM TƯƠNG TỰ</h2>
        {recommendedAds.length === 0 ? (
          <p className="text-center text-gray-600">Không có sản phẩm tương tự</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center mb-10">
            {recommendedAds.map((product, index) => (
              <Link to={`/ads/product/${product.adsId}`} key={index}>
                <AdsCard
                  imageUrl={product.imageUrl}
                  title={product.title}
                  content={product.content}
                  startedDate={product.startedDate}
                  className="h-full w-full max-w-sm"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AdsDetailPage;
