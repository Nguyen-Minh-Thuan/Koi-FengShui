import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../../../Component/NavBar';
import Footer from '../../../../Component/Footer';

const FengshuiRecKoiResult = () => {
  const location = useLocation(); 
  const { recQuantity, variety } = location.state || { recQuantity: 0, variety: [] }; 


  return (
    <>
      <NavBar/>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Kết quả phong thủy</h1>
        <h3 className="text-xl mt-4">Giống cá koi phù hợp:</h3>
        <div className="mt-2">
          {variety.filter(koi => koi.patterns.some(pattern => pattern.patternPoint >= 5)).map((koi) => ( // Chỉ hiển thị variety có patternPoint >= 5
            <div key={koi.varietyId} className="border p-4 rounded mb-4 bg-gray-100">
              <h4 className="text-lg font-semibold">{koi.varietyName}</h4>
              <p className="mt-2">{koi.description}</p>
              <h5 className="mt-4 font-medium">Các mẫu:</h5>
              <ul className="flex flex-wrap list-none p-0">
                {koi.patterns
                  // .filter(pattern => pattern.patternPoint >= 5) 
                  .map((pattern, index) => (
                    <li key={pattern.patternId} className="flex items-center mb-2 mr-4">
                      <span className="ml-2">{pattern.patternName}</span>
                      <div className="relative group mx-2">
                        <img 
                          src={pattern.imageUrl || 'https://www.grandkoi.com/wp-content/uploads/2021/04/6647-2-600x900.png'} 
                          alt={pattern.patternName}
                          className="w-16 h-16 object-cover rounded transition-transform duration-300 ease-in-out group-hover:scale-125"
                        />
                      </div>
                      {index < koi.patterns.length - 1 && (
                        <div className="border-l border-gray-300 h-10 mx-2"></div> // Divider
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default FengshuiRecKoiResult;