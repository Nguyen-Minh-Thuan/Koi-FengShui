import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FengshuiPoint = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fishColor: '',
    fishType: '',
    fishDirection: '',
    pondLocation: '',
    pondShape: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/fengshui/point/result', { state: formData });
  };

  return (
    
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center p-4" style={{backgroundImage: "url('path/to/your/background-image.jpg')"}}>
      <h1 className="text-4xl font-bold mb-4">TRA CỨU ĐỒ TƯỢNG THÍCH</h1>
      <p className="max-w-2xl mb-8">
        Mỗi con người sinh ra đều có vận mệnh khác nhau. Để chọn lựa được giống cá và hướng
        hồ phù hợp hãy điền thông tin vào bảng dưới đây. Fengshui Koi sẽ giúp bạn giải mã.
        Fengshui Koi sẽ sử dụng ngày sinh theo Dương lịch để tra cứu mệnh cho bạn.
      </p>

      <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 p-8 rounded-lg w-full max-w-2xl">
        <div className="mb-4">
          <label htmlFor="fishColor" className="block text-left mb-2">Nhập màu cá *</label>
          <select 
            id="fishColor" 
            required 
            className="w-full p-2 rounded bg-white text-black"
            value={formData.fishColor}
            onChange={handleInputChange}
          >
            <option value="">Select Value</option>
            <option value="red">Đỏ</option>
            <option value="white">Trắng</option>
            <option value="black">Đen</option>
            <option value="yellow">Vàng</option>
            <option value="orange">Cam</option>
          </select>
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-[48%]">
            <label htmlFor="fishType" className="block text-left mb-2">Loại cá</label>
            <select id="fishType" className="w-full p-2 rounded bg-white text-black">
              <option value="">Select Value</option>
              <option value="koi">Cá Koi</option>
              <option value="goldfish">Cá Vàng</option>
              <option value="arowana">Cá Rồng</option>
              <option value="guppy">Cá Bảy Màu</option>
            </select>
          </div>
          <div className="w-[48%]">
            <label htmlFor="fishDirection" className="block text-left mb-2">Hướng hồ cá</label>
            <select id="fishDirection" className="w-full p-2 rounded bg-white text-black">
              <option value="">Select Value</option>
              <option value="north">Bắc</option>
              <option value="south">Nam</option>
              <option value="east">Đông</option>
              <option value="west">Tây</option>
              <option value="northeast">Đông Bắc</option>
              <option value="northwest">Tây Bắc</option>
              <option value="southeast">Đông Nam</option>
              <option value="southwest">Tây Nam</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-[48%]">
            <label htmlFor="pondLocation" className="block text-left mb-2">Vị trí đặt hồ</label>
            <select id="pondLocation" className="w-full p-2 rounded bg-white text-black">
              <option value="">Select Value</option>
              <option value="livingroom">Phòng khách</option>
              <option value="garden">Sân vườn</option>
              <option value="office">Văn phòng</option>
              <option value="bedroom">Phòng ngủ</option>
            </select>
          </div>
          <div className="w-[48%]">
            <label htmlFor="pondShape" className="block text-left mb-2">Hình dáng hồ</label>
            <select id="pondShape" className="w-full p-2 rounded bg-white text-black">
              <option value="">Select Value</option>
              <option value="round">Tròn</option>
              <option value="square">Vuông</option>
              <option value="rectangular">Chữ nhật</option>
              <option value="irregular">Không đều</option>
            </select>
          </div>
        </div>

        <button type="submit" className="bg-fuchsia-500 text-white border-none py-3 px-8 rounded-full cursor-pointer text-lg mt-4 hover:bg-fuchsia-600 transition-colors">
          Xem điểm
        </button>
      </form>
    </div>
  );
};

export default FengshuiPoint;
