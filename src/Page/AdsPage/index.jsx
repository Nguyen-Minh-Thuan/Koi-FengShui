import React, { useState, useEffect } from 'react' 
import { Link } from 'react-router-dom'
import AdsCard from '../../Component/AdsCard'
import NavBar from '../../Component/NavBar'
import Footer from '../../Component/Footer'

const AdsPage = () => {
  const [adsData, setAdsData] = useState([])
  const [selectedType, setSelectedType] = useState('Tất cả')
  const [selectedElement, setSelectedElement] = useState('Tất cả')
  const [elements, setElements] = useState([]) 
  const [fishTypes, setFishTypes] = useState([]) 

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const response = await fetch('https://localhost:7275/api/Advertisement/GetAll')
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
        setFishTypes(getData.data)
      } catch (error) {
        console.error('Error fetching fish types:', error)
      }
    }

    fetchElements()
    fetchFishTypes()
  }, [])

  const filteredAds = adsData.filter(ad => {
    return (selectedType === 'Tất cả' || ad.typeName === selectedType) &&
           (selectedElement === 'Tất cả' || ad.element1 === selectedElement);
  });

  return (
    <>
    <NavBar />
    <div className="container mx-auto px-4 py-12" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h1 className="text-4xl font-bold text-center mb-12">Các sản phẩm phong thủy</h1>
      
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <div className="flex items-center">
          <span className="mr-3">Lọc theo:</span>
          <select 
            className="p-2 border rounded"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="Tất cả">Loại cá</option>
            {fishTypes.map(type => (
              <option key={type.adsTypeId} value={type.typeName}>{type.typeName}</option>
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
            <option key={element.elementId} value={element.element1}>{element.element1}</option>
          ))}
        </select>
      </div>

      {filteredAds.length === 0 ? (
        <p className="text-center text-xl">Không có sản phẩm nào</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {filteredAds.map(ad => (
            <div key={ad.adsId} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" style={{ maxWidth: '260px' }}>
              <Link to={{
                pathname: `/ads/product/${ad.adsId}`,
              }}>
                <AdsCard 
                  image={ad.image}
                  title={ad.title}
                  content={ad.content}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </>
  )
}

export default AdsPage
