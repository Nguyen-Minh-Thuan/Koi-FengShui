import React, { useState, useEffect } from 'react' 
import { Link } from 'react-router-dom'
import AdsCard from '../../Component/AdsCard'
import NavBar from '../../Component/NavBar'
import Footer from '../../Component/Footer'
import Pagination from '@mui/material/Pagination';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (minutes < 60) {
    return `${minutes} phút trước`;
  } else if (hours < 24) {
    return `${hours} giờ trước`;
  } else if (days < 30) {
    return `${days} ngày trước`;
  } else {
    return date.toLocaleDateString('vi-VN');
  }
};

const AdsPage = () => {
  const [adsData, setAdsData] = useState([])
  const [selectedType, setSelectedType] = useState('Tất cả')
  const [selectedElement, setSelectedElement] = useState('Tất cả')
  const [elements, setElements] = useState([]) 
  const [fishTypes, setFishTypes] = useState([]) 
  const [searchItem, setSearchItem] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const adsPerPage = 20

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const response = await fetch('https://localhost:7275/api/Advertisement/GetAllDeploying')
        const getData = await response.json()
        const ads = getData.data
        setAdsData(ads) 
      } catch (error) {
        console.error('Error fetching ads data:', error)
      }
    }
    fetchAdsData()
  }, [])

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch('https://localhost:7275/api/Element/GetElement')
        const getData = await response.json()
        setElements(getData.data)
      } catch (error) {
        console.error('Error fetching elements:', error)
      }
    }

    const fetchFishTypes = async () => {
      try {
        const response = await fetch('https://localhost:7275/api/Advertisement/GetType')
        const getData = await response.json()
        console.log("loai",getData)
        setFishTypes(getData.data)
      } catch (error) {
        console.error('Error fetching fish types:', error)
      }
    }

    fetchElements()
    fetchFishTypes()
  }, [])

  const filteredAds = adsData.filter(ad => {
    const matchesType = selectedType === 'Tất cả' || ad.adsTypeId === Number(selectedType);
    const matchesElement = selectedElement === 'Tất cả' || ad.elementId === Number(selectedElement); 
    const matchesTitle = ad.title.toLowerCase().includes(searchItem.toLowerCase());

    return matchesType && matchesElement && matchesTitle;
  });

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
    <NavBar />
    <div className="container mx-auto px-4 py-12" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h1 className="text-4xl font-bold text-center mb-12">Các sản phẩm phong thủy</h1>
      
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <div className="flex items-center">
        <input 
          type="text" 
          className="p-2 border rounded mr-4" 
          placeholder="Tìm kiếm theo tiêu đề" 
          value={searchItem} 
          onChange={(e) => setSearchItem(e.target.value)}
        />
          <select 
            className="p-2 border rounded"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="Tất cả">Loại sản phẩm</option>
            {fishTypes.map(type => (
              <option key={type.adsTypeId} value={type.adsTypeId}>{type.typeName}</option>
            ))}
          </select>
        </div>

        <select 
          className="p-2 border rounded"
          value={selectedElement}
          onChange={(e) => setSelectedElement(e.target.value)}
        >
          <option value="Tất cả">Mệnh</option>
          {elements.map(element => (
            <option key={element.elementId} value={element.elementId}>{element.element1}</option>
          ))}
        </select>
        
      </div>

      {currentAds.length === 0 ? (
        <p className="text-center text-xl">Không có sản phẩm nào</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {currentAds.map(ad => (
            <div key={ad.adsId} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" style={{ maxWidth: '260px' }}>
              <Link to={{
                pathname: `/ads/product/${ad.adsId}`,
              }}>
                <AdsCard 
                  imageUrl={ad.imageUrl}
                  title={ad.title}
                  content={ad.content}
                  startedDate={ad.startedDate}
                />
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Pagination 
          count={totalPages} 
          page={currentPage} 
          onChange={handlePageChange} 
          color="primary" 
          size="large" 
          shape="rounded" 
        />
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default AdsPage
