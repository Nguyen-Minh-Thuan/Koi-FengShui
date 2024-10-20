import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FengshuiGenerate = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({ gender: '', birthdate: '' }); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    let hasError = false;
    const newErrors = { gender: '', birthdate: '' }; 

    if (!gender) {
      newErrors.gender = 'Please select a gender.';
      hasError = true;
    }

    if (!birthdate) {
      newErrors.birthdate = 'Please enter a birthdate.';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    const formattedBirthdate = new Date(birthdate).toLocaleDateString('en-US');
    const response = await fetch(`https://localhost:7275/api/FengShui/CalculateDir?birthday=${formattedBirthdate}&gender=${gender}`);
    const data = await response.json();
    console.log(data);
    setResult(data);
    navigate('/fengshui/pond/result', {
      state: {
        direction: data.data.direction,
        pondShape: data.data.pondShape,
      }
    });
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center p-4" style={{backgroundImage: "url('/path/to/night-sky-boat-image.jpg')"}}>
      <h1 className="text-4xl font-bold mb-4">TRA CỨU HỒ CÁ PHONG THỦY</h1>
      <p className="max-w-2xl mb-8">
        Mỗi con người sinh ra đều có vận mệnh khác nhau. Để chọn lựa được giống cá và hướng
        hồ phù hợp hãy điền thông tin vào bảng dưới đây, Fengshui Koi sẽ giúp bạn giải mã.
        Fengshui Koi sẽ sử dụng ngày sinh theo <span className="text-pink-500">Dương lịch</span> để tra cứu mệnh cho bạn.
      </p>

      <form className="bg-white bg-opacity-10 p-8 rounded-lg w-full max-w-2xl mx-auto" onSubmit={handleSubmit}>
        <div className="flex justify-between mb-4">
          <div className="w-[48%] flex flex-col">
            <label htmlFor="gender" className="block text-left mb-2">Giới tính<span className="text-red-500">*</span></label>
            <select id="gender" className="w-full p-2 rounded bg-white text-black text-center" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">--Chọn giới tính--</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
          </div>

          <div className="w-[48%] flex flex-col">
            <label htmlFor="birthdate" className="block text-left mb-2">Ngày sinh<span className="text-red-500">*</span></label>
            <input type="date" id="birthdate" className="w-full p-2 rounded bg-white text-black text-center" placeholder="dd/mm/yyyy" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            {errors.birthdate && <span className="text-red-500 text-sm">{errors.birthdate}</span>}
          </div>
        </div>

        <div className="flex flex-col items-center mb-4">
          <label htmlFor="calendar" className="block text-left mb-2">Chọn lịch<span className="text-red-500">*</span></label>
          <select id="calendar" className="w-full p-2 rounded bg-white text-black text-center">
            <option value="solar">Lịch dương</option>
          </select>
        </div>

        <button type="submit" className="bg-fuchsia-500 text-white border-none py-3 px-8 rounded-full cursor-pointer text-lg mt-4 hover:bg-fuchsia-600 transition-colors">
          Giải mã
        </button>
      </form>
    </div>
  );
};

export default FengshuiGenerate;
