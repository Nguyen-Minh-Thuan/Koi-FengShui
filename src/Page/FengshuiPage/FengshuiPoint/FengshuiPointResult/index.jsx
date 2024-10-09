import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../../../Component/NavBar';
import Footer from '../../../../Component/Footer';

const FengshuiPointResult = () => {
  const location = useLocation(); 
  const { koiPoint, totalPoint } = location.state || { koiPoint: [], totalPoint: 0 };

  return (
    <>
    <NavBar/>
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">MỨC ĐỘ TƯƠNG THÍCH</h1>
      
      <div className="mb-6">
        <p className="font-semibold">Mệnh của bạn là: <span className="text-blue-600">Thuỷ</span></p>
        <p className="mt-2">Dựa vào những dữ liệu bạn vừa nhập:</p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500"></div>
          <p className="text-sm mt-1">Xanh biển</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-black"></div>
          <p className="text-sm mt-1">Đen</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-white border"></div>
          <p className="text-sm mt-1">Trắng</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-400"></div>
          <p className="text-sm mt-1">Bạc ánh kim</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-red-500"></div>
          <p className="text-sm mt-1">Đỏ</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-pink-500"></div>
          <p className="text-sm mt-1">Hồng</p>
        </div>
      </div>
      
      <div className="relative h-4 bg-gray-200 rounded-full mb-6">
        <div className="absolute left-0 top-0 h-full w-4/5 bg-blue-500 rounded-full"></div>
        <div className="absolute left-0 top-0 h-full flex justify-between w-full px-2 text-xs">
          <span>1</span>
          <span>0.8</span>
          <span>0</span>
        </div>
      </div>
      
      <p className="mb-6">Hướng đặt bể cá hiện tại của bạn là: <span className="font-semibold">Đông Nam</span></p>
      
      <div className="flex flex-wrap mb-6">
        <div className="w-2/3 pr-4">
          <div className="grid grid-cols-2 gap-4">
            {koiPoint.map((koi, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex">
                  <div className="w-[100px] h-[170px] flex-shrink-0">
                    <img 
                      src={koi.imageUrl || 'default_image_url'} 
                      alt={koi.patternName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{koi.patternName}</h2>
                      <p className="text-gray-600">
                        {koi.patternColors.map((color, colorIndex) => (
                          <span key={colorIndex}>
                            {color.colorName || 'Màu không xác định'} 
                            {colorIndex < koi.patternColors.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    </div>
                    <p className="text-lg">Điểm: <span className="font-semibold">{Math.round(koi.patternPoint * 100) / 100} / 10</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-1/3 pl-4">
          <div className="bg-gray-100 p-4 rounded-lg h-full">
            <p className="text-xl font-semibold mb-2">Tổng điểm: {Math.round(totalPoint * 100) / 100} / 10</p>
            
          </div>
        </div>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default FengshuiPointResult;
