import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../../../Component/NavBar';
import Footer from '../../../../Component/Footer';

const FengshuiPondResult = () => {
  const location = useLocation(); 
  const { direction, pondShape } = location.state || { direction: {}, pondShape: {} };

  return (
    <>
      <NavBar />
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mt-6">GIẢI MÃ PHONG THUỶ</h1>

        <div className="bg-white rounded-lg shadow-lg mt-8 p-6 border border-purple-500 max-w-md mx-auto relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="w-20 h-20 rounded-full bg-yellow-200 flex items-center justify-center">
              <img src="https://liu.com.vn/images/batquai.png" alt="Icon" className="w-12 h-12"/>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 text-lg">Giới tính: <strong>Nam</strong></p>
            <p className="text-gray-700 text-lg">Ngày sinh: <strong>13/10/1993</strong></p>
            <p className="text-gray-700 text-lg">Mệnh: <strong>{pondShape.element1 || "Không xác định"}</strong></p>
            <p className="text-gray-700 text-lg">Cung mệnh: <strong>{direction.kuaName}</strong></p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 mt-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-purple-600 text-center">Giải mã cung {direction.kuaName || "Không xác định"}</h3>
          <ul className="list-disc mt-4 ml-6 text-gray-700">
            <li className="ml-4">{direction.description || "Không có thông tin mô tả"}</li>
          </ul>
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-purple-600 mt-4">Hướng tốt</h3>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {direction.auspicious && direction.auspicious.length > 0 ? (
              direction.auspicious.map((item, index) => (
                <li key={index} className="mt-1 ml-4">
                  Hướng {item.direction.directionName}: {item.description}
                </li>
              ))
            ) : (
              <li className="ml-4">Không có hướng tốt.</li>
            )}
          </ul>

          <h3 className="text-xl font-bold text-purple-600 mt-4">Hướng xấu</h3>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {direction.inauspicious && direction.inauspicious.length > 0 ? (
              direction.inauspicious.map((item, index) => (
                <li key={index} className="mt-1 ml-4">
                  Hướng {item.direction.directionName}: {item.description}
                </li>
              ))
            ) : (
              <li className="ml-4">Không có hướng xấu.</li>
            )}
          </ul>

          <h3 className="text-xl font-bold text-purple-600 mt-4">Hình dạng của hồ hợp với mệnh {pondShape.element1}</h3>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {pondShape.ponds && pondShape.ponds.length > 0 ? (
              pondShape.ponds.map((pond, index) => (
                <li key={index} className="mt-1 ml-4">
                  Hình dạng: {pond.shape.shape1}
                </li>
              ))
            ) : (
              <li className="ml-4">Không có thông tin về hình dạng hồ.</li>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FengshuiPondResult;