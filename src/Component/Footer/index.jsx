import { Link } from "react-router-dom";
import logo from "../../assets/Logo/FengShuiKoi_Logo.jpg";

const Footer = () => {
  return (
    <div
      className="text-white py-6 relative"
      style={{ backgroundColor: "#161620" }}
    >
      <div className="max-w-screen-xl mx-auto px-4 flex justify-around  items-center">
        <div className="flex items-center">
          <div>
            <div className="flex">
              <Link to="/" className="flex">
                <img src={logo} alt="logo" className="h-12 rounded-[100%]" />
                <div className="h-full text-3xl font-serif font-medium pt-2 px-4">
                  Feng Shui Koi
                </div>
              </Link>
            </div>
            <div>
              <p className="text-sm">
                Chuyên tư vấn phong thủy | Chia sẻ kinh nghiệm | Sản phẩm phong
                thủy
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="mr-10">
            <h3 className="font-semibold">LIÊN KẾT NHANH</h3>

            <ul>
              <li>
                <Link to="/" className="hover:underline">
                  Tra cứu Mệnh
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:underline">
                  Blog chia sẻ
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
              {/* <li>
                <Link to="/blog/create" className="hover:underline">
                  Tạo Blog
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">LIÊN HỆ QUẢNG CÁO</h3>
            <ul>
              <li>
                <Link to="/ads/create" className="hover:underline">
                  Đăng kí quảng cáo sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Hỗ trợ
                </Link>
              </li>
              {/* <li>
                <Link to="/admin" className="hover:underline">
                  Admin Page
                </Link>
              </li>
              <li>
                <Link to="/staff" className="hover:underline">
                  Staff Page
                </Link>
              </li> */}
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

export default Footer;
