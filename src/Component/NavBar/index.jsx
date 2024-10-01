import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo/FengShuiKoi_Logo.jpg";
import search from "../../assets/Icon/Search.png";
import Login from "../../assets/Icon/Login.png";

const NavBar = () => {
  return (
    <>
      <div className="shadow-md bg-white w-full fixed z-10">
        <div className="justify-items-start">
          <div className="pt-4 flex items-start justify-around ">
            <div className="flex items-start -ms-28">
              <div className="border-b-2 border-black">
                <input
                  className="focus:border-transparent focus:outline-none py-2 w-72 "
                  placeholder="Nhập từ khóa cần tìm kiếm"
                />
              </div>
              <Link
                to="/" className=" bg-white focus:border-transparent cursor-pointer py-1">
                <img src={search} className="h-8 w-8 " />
              </Link>
            </div>

            <Link to="/" className="flex items-center">
              <img src={logo} alt="logo" className="h-12 rounded-[100%]" />
              <div className="h-full text-3xl font-serif font-medium">Feng Shui Koi</div>
            </Link>

            <div className='flex items-center justify-start'>
              {/* <Link to="/"><img src={Login} alt='Login' className='ms-8 h-10'/></Link> */}
              <Link to="/register" className="border-2 border-black rounded-md px-2 py-2 h-120 font">Đăng ký</Link>
              <Link 
                to="/login" className="ml-4 bg-black border-2 border-black rounded-md px-1 py-2 h-120 text-white ">Đăng nhập</Link>
            </div>

          </div>
        </div>
        <ul className='justify-items-end w-full h-full font-semibold text-black flex justify-center py-3 text-l'>
          <li className='px-8 duration-200 ease-in-out active:scale-110'><Link to="/">Trang Chủ</Link></li>
          <li className='px-8 duration-200 ease-in-out active:scale-110'><Link to="/ads/product">Sản Phẩm</Link></li>
          <li className='px-8 duration-200 ease-in-out active:scale-110'><Link to="/ads/create">Đăng kí quảng cáo</Link></li>
          <li className='px-8 duration-200 ease-in-out active:scale-110'><Link to="/fengshui">Tra Cứu Mệnh</Link></li>
          <li className='px-8 duration-200 ease-in-out active:scale-110'><Link to="/blog">Chia sẻ</Link></li>
          <li className='px-8 duration-200 ease-in-out active:scale-110'><Link to="/">Fengshui Koi</Link></li>
        </ul>
      </div>
      <div className="h-[105px]"></div>
    </>
  );
};

export default NavBar;
