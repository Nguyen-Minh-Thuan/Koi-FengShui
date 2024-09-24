import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo/Logo_Header.png';
import search from '../../assets/Icon/Search.png';
import phone from '../../assets/Icon/phone.png';
import Login from '../../assets/Icon/Login.png';

const NavBar = () => {
  return (
    <div className='border-b-2 bg-white w-full fixed z-10'>
      <div className='justify-items-start'>
        <div className="pt-4 flex items-start justify-around ">
          <div className='flex items-start -ms-28'>
            <div className="border-b-2 border-black">
              <input
                className="focus:border-transparent focus:outline-none py-2 w-72 "
                placeholder="Nhập từ khóa cần tìm kiếm"
              />
            </div>
            <Link to="/" className=" bg-white focus:border-transparent cursor-pointer py-1">
                <img src={search} className="h-8 w-8 " /> 
            </Link>
          </div>
            <Link to="/" className='flex items-start'>
              <img src={logo} alt="logo" className="h-12" />
            </Link>
          <div className='flex items-center justify-start'>
            <img src={phone} alt='phone' className='h-10'/>
            <div>0123456789</div>     
            <Link to="/"><img src={Login} alt='Login' className='ms-8 h-10'/></Link>
            <Link to="/">Login</Link>
          </div>

        </div>
      </div>
      <ul className='justify-items-end w-full h-full  text-black flex justify-center py-3 text-l'>
          <li className='px-8'><Link to="/">Trang Chủ</Link></li>
          <li className='px-8'><Link to="/">Sản Phẩm</Link></li>
          <li className='px-8'><Link to="/">Đăng kí quảng cáo</Link></li>
          <li className='px-8'><Link to="/">Tra Cứu Mệnh</Link></li>
          <li className='px-8'><Link to="/">Chia sẻ</Link></li>
          <li className='px-8'><Link to="/">About</Link></li>
      </ul>
    </div>
  );
};


export default NavBar;