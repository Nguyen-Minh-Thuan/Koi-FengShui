import React from 'react';
import NavBar from '../../../../Component/NavBar';
import Footer from '../../../../Component/Footer';

const FengshuiPointResult = () => {
  const koiCards = [
    { name: "Koi Showa", colors: "(đỏ - trắng - đen)", points: 20, image: "https://visinhcakoi.com/wp-content/uploads/2021/07/ca-koi-showa-2-600x874-1.jpg" },
    { name: "Koi Kohaku", colors: "(đỏ - trắng)", points: 15, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyp88KyFQt1zED0aMjZDJ0WIYH-Kz6kJnUqw&s" },
    { name: "Koi Sanke", colors: "(đỏ - trắng - đen)", points: 18, image: "https://microinfluencer.vn/wp-content/uploads/2024/01/sanke__maruten.jpg" },
  ];

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
            {koiCards.map((koi, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex">
                  <div className="w-[100px] h-[170px] flex-shrink-0">
                    <img 
                      src={koi.image}
                      alt={koi.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{koi.name}</h2>
                      <p className="text-gray-600">{koi.colors}</p>
                    </div>
                    <p className="text-lg">Điểm: <span className="font-semibold">{koi.points}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-1/3 pl-4">
          <div className="bg-gray-100 p-4 rounded-lg h-full">
            <p className="text-xl font-semibold mb-2">Tổng điểm: 53</p>
            <p className="mb-2">Không quá tốt, cũng không quá tệ</p>
            <p>Nếu có thể, hãy thay thế những loại cá Koi có ít hoặc không có màu đỏ/ hồng (tương khắc) để tăng mức độ tương thích</p>
          </div>
        </div>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default FengshuiPointResult;
