import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../../../Component/NavBar';
import Footer from '../../../../Component/Footer';

const FengshuiRecKoiResult = () => {
  const location = useLocation(); 
  const { element, recQuantity, variety } = location.state || { element, recQuantity: [], variety: [] }; 
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

  const elementColorsT = {
    "Hỏa": "bg-red-600", 
    "Thủy": "bg-blue-600", 
    "Mộc": "bg-green-600", 
    "Kim": "bg-gray-300", 
    "Thổ": "bg-yellow-600" 
  };

  return (
    <>
      <NavBar/>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Kết quả phong thủy</h1>
        
        <table className="min-w-full mt-4 border">
          <thead>
            <tr className={`${elementColorsT[element]} text-white`}>
            <th className="py-2">Mệnh</th>
              <th className="py-2">Số lượng cá nên nuôi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{element}</td>
              <td className="border px-4 py-2">
                {recQuantity.length > 0 ? <strong>{`${recQuantity[0].quantity} hoặc ${recQuantity[0].quantity + 5} con`}</strong> : 'Không có thông tin'}
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-xl mt-4">Giống cá koi phù hợp: 
          <span className={`text-${elementColorsC[element]} font-bold`}> Mệnh {element}</span>
          <img src={elementColorsP[element]} alt={element} className="inline-block w-8 h-8 ml-2" />
        </h3>
        <div className="mt-2">
          {variety.filter(koi => koi.patterns.some(pattern => pattern.patternPoint >= 5)).map((koi) => ( 
            <div key={koi.varietyId} className="border p-4 rounded mb-4 bg-gray-100">
              <h4 className="text-lg font-semibold">{koi.varietyName}</h4>
              <p className="mt-2">{koi.description}</p>
              <h5 className="mt-4 font-medium">Các mẫu:</h5>
              <ul className="flex flex-wrap list-none p-0">
                {koi.patterns
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
                        <div className="border-l border-gray-300 h-10 mx-2"></div> 
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