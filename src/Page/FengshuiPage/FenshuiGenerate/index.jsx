import React from 'react';

const FengshuiGenerate = () => {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center p-4" style={{backgroundImage: "url('/path/to/night-sky-boat-image.jpg')"}}>
      <h1 className="text-4xl font-bold mb-4">TRA CỨU MỆNH PHONG THỦY</h1>
      <p className="max-w-2xl mb-8">
        Mỗi con người sinh ra đều có vận mệnh khác nhau. Để chọn lựa được giống cá và hướng
        hồ phù hợp hãy điền thông tin vào bảng dưới đây, Fengshui Koi sẽ giúp bạn giải mã.
        Fengshui Koi sẽ sử dụng ngày sinh theo <span className="text-pink-500">Dương lịch</span> để tra cứu mệnh cho bạn.
      </p>

      <form className="bg-white bg-opacity-10 p-8 rounded-lg w-full max-w-2xl">
        <div className="mb-4">
          <label htmlFor="name" className="block text-left mb-2">Họ và tên</label>
          <input type="text" id="name" className="w-full p-2 rounded bg-white text-black" placeholder="Nhập họ và tên của bạn" />
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-[48%]">
            <label htmlFor="gender" className="block text-left mb-2">Giới tính<span className="text-red-500">*</span></label>
            <select id="gender" required className="w-full p-2 rounded bg-white text-black">
              <option value="">--Chọn giới tính--</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div className="w-[48%]">
            <label htmlFor="calendar" className="block text-left mb-2">Chọn lịch<span className="text-red-500">*</span></label>
            <select id="calendar" required className="w-full p-2 rounded bg-white text-black">
              <option value="solar">Lịch dương</option>
              <option value="lunar">Lịch âm</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-[48%]">
            <label htmlFor="birthdate" className="block text-left mb-2">Ngày sinh<span className="text-red-500">*</span></label>
            <input type="date" id="birthdate" required className="w-full p-2 rounded bg-white text-black" placeholder="dd/mm/yyyy" />
          </div>
          <div className="w-[48%]">
            <label htmlFor="format" className="block text-left mb-2">Chọn hình thức<span className="text-red-500">*</span></label>
            <select id="format" required className="w-full p-2 rounded bg-white text-black">
              <option value="">--Chọn hình thức--</option>
              <option value="fish">Xem cá</option>
              <option value="pond">Xem hồ</option>
              <option value="both">Xem cả cá và hồ</option>
            </select>
          </div>
        </div>

        <button type="submit" className="bg-fuchsia-500 text-white border-none py-3 px-8 rounded-full cursor-pointer text-lg mt-4 hover:bg-fuchsia-600 transition-colors">
          Giải mã
        </button>
      </form>
    </div>
  );
};

export default FengshuiGenerate;
