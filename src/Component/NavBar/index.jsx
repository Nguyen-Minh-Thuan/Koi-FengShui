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
      <div className="border-b-2 bg-white w-full fixed z-10">
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
            <div className='flex items-center justify-start' onClick={toggleMenu}>
              {user ? ( 
                <>
                  <div className="relative" ref={menuRef}> 
                    <Link >
                      <img src={Login} alt='Login' className='ms-8 h-10' />
                    </Link>
                    {menuOpen && ( 
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                        <Link to="/user/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Hồ sơ cá nhân</Link>
                        <Link to="/user/ads/list" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Quảng cáo của tôi</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Đăng xuất</button>
                      </div>
                    )}
                  </div>
                  <Link>
                  <span>{userName}</span> 
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/"><img src={Login} alt='Login' className='ms-8 h-10'/></Link>
                  <Link to="/login">Đăng nhập/ </Link>
                  <Link to="/register">Đăng ký</Link>
                </>
              )}

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
      <div className="h-[113px]"></div>
    </nav>

  );
};

export default NavBar;
