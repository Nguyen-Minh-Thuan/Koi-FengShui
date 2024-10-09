import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../../../Component/NavBar';
import Footer from '../../../../Component/Footer';

const FengshuiPondResult = () => {
  const location = useLocation(); 
  const { recQuantity, variety } = location.state || { recQuantity: 0, variety: [] }; 
  const elementColorsP = {
    "Hỏa": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-HOA.jpg", 
    "Thủy": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-THUY.jpg", 
    "Mộc": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-MOC.jpg", 
    "Kim": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-KIM.jpg", 
    "Thổ": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-THO.jpg" 
  };
  const elementColorsC = {
    "Hỏa": "red-500", 
    "Thủy": "blue-500", 
    "Mộc": "green-500", 
    "Kim": "gray-300", 
    "Thổ": "yellow-500" 
  };
  const [visibleCount, setVisibleCount] = useState(5); 

  return (
    <>
      <NavBar/>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Kết quả phong thủy</h1>
        <h3 className="text-xl mt-4">Giống cá koi phù hợp:</h3>
        <div className="mt-2">
          {variety.map((koi) => (
            <div key={koi.varietyId} className="border p-4 rounded mb-4 bg-gray-100">
              <h4 className="text-lg font-semibold">{koi.varietyName}</h4>
              <p className="mt-2">{koi.description}</p>
              <h5 className="mt-4 font-medium">Các mẫu:</h5>
              <ul className="flex flex-wrap list-none p-0">
                {koi.patterns.slice(0, visibleCount).map((pattern, index) => (
                  <li key={pattern.patternId} className="flex items-center mb-2 mr-4">
                    <span className="ml-2">{pattern.patternName}</span>
                    <div className="relative group mx-2">
                      <img 
                        src={pattern.imageUrl || 'default-image-url.jpg'} 
                        alt={pattern.patternName}
                        className="w-16 h-16 object-cover rounded transition-transform duration-300 ease-in-out group-hover:scale-125"
                      />
                    </div>
                    {index < visibleCount - 1 && (
                      <div className="border-l border-gray-300 h-10 mx-2"></div> 
                    )}
                  </li>
                ))}
              </ul>
              {visibleCount < koi.patterns.length && ( 
                <button 
                  onClick={() => setVisibleCount(visibleCount + 5)} 
                  className="mt-4 text-blue-500"
                >
                  Xem thêm
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default FengshuiPondResult;