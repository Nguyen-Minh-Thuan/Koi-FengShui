import { Link } from 'react-router-dom';
import logo from '../../assets/Logo/Logo_Footer.png';

const Footer = () => {
  return (
    <div className="text-white py-6 relative" style={{backgroundColor: '#161620'}}>
      <div className="max-w-screen-xl mx-auto px-4 flex justify-around  items-center">
        <div className="flex items-center">
          <div>
              <img src={logo} alt="Feng Shui Koi Logo" className="h-12 mr-3" />
              <div>
                <h2 className="text-lg font-semibold">Feng Shui Koi</h2>
                <p className="text-sm">Chuyên tư vấn phong thủy | Chia sẻ kinh nghiệm | Sản phẩm phong thủy</p>
              </div>
          </div>          
        </div>
        <div className="flex">
          <div className="mr-10">
            <h3 className="font-semibold">LIÊN KẾT NHANH</h3>
            
            <ul>
              <li><Link to="/" className='hover:underline'>Tra cứu Mệnh</Link></li>
              <li><Link to="/" className='hover:underline'>Blog chia sẻ</Link></li>
              <li><Link to="/about" className='hover:underline'>About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">LIÊN HỆ QUẢNG CÁO</h3>
            <ul>
              <li><Link to="/" className='hover:underline'>Đăng kí quảng cáo sản phẩm</Link></li>
              <li><Link to="/" className='hover:underline'>Hỗ trợ</Link></li>
              <li><Link to="/" className='hover:underline'>Trợ giúp</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-6 border-t-white border-t-[1px] mx-[15%] py-4">
        COPYRIGHT © 2024 FENG SHUI KOI. ALL RIGHTS RESERVED.
      </div>
    </div>
  );
};

export default Footer