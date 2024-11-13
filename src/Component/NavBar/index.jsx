import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo/FengShuiKoi_Logo.jpg";
import search from "../../assets/Icon/Search.png";
import Login from "../../assets/Icon/Login.png";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(''); 
  const [menuOpen, setMenuOpen] = useState(false); 
  const menuRef = useRef(null); 

  useEffect(() => {
    const user = localStorage.getItem('user'); 
    if (user) {
      const userId = JSON.parse(user);
      setUser(userId);
      fetch(`https://localhost:7275/api/User/GetUserById?id=${userId.userId}`)
        .then(response => response.json())
        .then(data => setUserName(data.data.userName), 
      
      )
        
        .catch(error => console.error('Error fetching userName:', error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null); 
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <nav>
      <div className="border-b-2 bg-white w-full fixed z-10 py-4 px-4 shadow-md">
        <div>
          <div className=" flex items-center justify-between px-4">
  
            <Link to="/" className="flex items-center">
              <img src={logo} alt="logo" className="h-12 rounded-full" />
              <div className="ml-3 text-3xl font-serif font-medium">Feng Shui Koi</div>
            </Link>
  
            <ul className='flex space-x-6 font-semibold text-black text-base py-3'>
              <li className='duration-200 ease-in-out active:scale-110 hover:scale-110'><Link to="/">Trang Chủ</Link></li>
              <li className='duration-200 ease-in-out active:scale-110 hover:scale-110'><Link to="/ads/product">Sản Phẩm</Link></li>
              <li className='duration-200 ease-in-out active:scale-110 hover:scale-110'><Link to="/ads/create">Đăng kí quảng cáo</Link></li>
              <li className='duration-200 ease-in-out active:scale-110 hover:scale-110'><Link to="/fengshui">Tra Cứu Mệnh</Link></li>
              <li className='duration-200 ease-in-out active:scale-110 hover:scale-110'><Link to="/blog">Chia sẻ</Link></li>
            </ul>
  
            <div className='flex items-center space-x-4'>
              {user ? (
                <>
                  <div className="relative" ref={menuRef}>
                    <img src={Login} alt='Login' className='h-10 cursor-pointer' onClick={toggleMenu} />
                    {menuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                        <Link to="/user/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Hồ sơ cá nhân</Link>
                        <Link to="/user/ads/list" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Quảng cáo của tôi</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Đăng xuất</button>
                      </div>
                    )}
                  </div>
                  <span>{userName}</span>
                </>
              ) : (
                <span className="flex items-center">
                  <img src={Login} className='h-10'/>
                  <Link to="/login">Đăng nhập</Link>
                  <span>/</span>
                  <Link to="/register">Đăng ký</Link>
                </span>
              )}
            </div>
  
          </div>
        </div>
      </div>
      <div className="h-[81px]"></div>
    </nav>
  );
}
  export default NavBar;
  
