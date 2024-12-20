import React, { useState, useEffect } from "react";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [activeElement, setActiveElement] = useState("Mệnh Kim");

  const elements = [
    {
      name: "Mệnh Kim",
      fishes: [
        { image: "https://aquariumcare.vn/upload/user/images/C%C3%A1%20Koi%20V%C3%A0ng%20Yamabuki%20Ogon%206.jpg", name: "Yamabuki Ogon" },
        { image: "https://visinhcakoi.com/wp-content/uploads/2021/07/cach-nhan-biet-ca-koi-chagoi-1-800x483-1.jpg", name: "Chagoi" },
        { image: "https://www.swelluk.com/media/catalog/product/s/h/shusui_koi_carp_japanese_grade_a_-_var_2.png?width=810&height=810&store=default&image-type=image", name: "Shusui" }
      ],
      icon: "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-KIM.jpg"
    },
    {
      name: "Mệnh Mộc",
      fishes: [
        { image: "https://www.toriikoi.com/wp-content/uploads/2024/08/Tips-for-Caring-Your-Asagi-Koi-Fish.jpg", name: "Asagi" },
        { image: "https://cacanhthaihoa.com/wp-content/uploads/2015/02/ca-koi-showa-9.jpg", name: "Showa" },
        { image: "https://www.koi-bito.com/forum/filedata/fetch?id=228775", name: "Midori Ogon" }
      ],
      icon: "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-MOC.jpg"
    },
    {
      name: "Mệnh Thủy",
      fishes: [
        { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZYnzmAJK1pRICNjJom1N6gfqPbqwHvPXWEg&s", name: "Kohaku" },
        { image: "https://cakoibienhoa.com/public/userfiles/products/ca-koi-taisho-sanke-7.jpg", name: "Sanke" },
        { image: "https://i.redd.it/my-new-koi-shiro-utsuri-v0-37lmktnmq3g91.jpg?width=3024&format=pjpg&auto=webp&s=cfb94f8a1a42ce82b68c5ac2f456d98b7f083eb6", name: "Shiro Utsuri" }
      ],
      icon: "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-THUY.jpg"
    },
    {
      name: "Mệnh Hỏa",
      fishes: [
        { image: "https://bizweb.dktcdn.net/100/307/111/files/ca-koi-showa-sankoku1.jpg?v=1534352487117", name: "Showa" },
        { image: "https://cacanhthaihoa.com/wp-content/uploads/2015/02/ca-koi-benigoi.jpg", name: "Benigoi" },
        { image: "https://koilover.vn/uploads/images/nguon-goc-kohaku.jpg", name: "Kohaku" }
      ],
      icon: "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-HOA.jpg"
    },
    {
      name: "Mệnh Thổ",
      fishes: [
        { image: "https://aquariumfishindia.com/wp-content/uploads/2023/02/s-l1200-197.jpg", name: "Yamabuki" },
        { image: "https://askfarms.ca/wp-content/uploads/2021/03/ASK-Farms-Koi-008.jpg", name: "Shusui" },
        { image: "https://www.cakoinhatban.com/wp-content/uploads/2017/08/ca-benigoi-koi.jpg", name: "Benigoi" }
      ],
      icon: "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-THO.jpg"
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-container">
      <NavBar />
      <section className="hero bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <img
            src="https://images.unsplash.com/photo-1511857543145-0c6865f84a50?fit=max&fm=jpg&ixid=M3wzNTY3MHwwfDF8YWxsfHx8fHx8fHx8MTcwODE1NDA1NHw&ixlib=rb-4.0.3&q=75&w=720&utm_medium=referral&utm_source=vocal.media" 
            alt="Fengshui Koi"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <h1 className="text-4xl font-bold text-center mt-10">
            KHÁCH HÀNG LỰA CHỌN FENGSHUI KOI VÌ SỰ CHUYÊN NGHIỆP
          </h1>
        </div>
      </section>

      <section className="consultation py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-8 ">Tư vấn chính xác và nhanh chóng</h2>
              <p className="text-lg">
                Sử dụng thuật toán tính toán chính xác để tính ra bản mệnh của khách hàng và đưa ra những tư vấn tốt nhất.
              </p>
              <div className="text-center mt-4">
                <Link to="/fengshui" className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Tra cứu mệnh
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://dhdlogistics.com/wp-content/uploads/2023/12/van-chuyen-ca-koi-tu-nhat-ve-viet-nam-uy-tin.jpg"
                alt="Tư vấn Fengshui Koi"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="koi-selection py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">CÁ KOI THEO BẢN MỆNH</h2>
          <div className="koi-grid flex flex-col md:flex-row justify-center items-stretch">
            <div className="flex flex-col w-full md:w-1/4 md:mr-8 mb-8 md:mb-0">
              <p className="text-sm text-gray-500 mb-4 text-center md:text-left">CHỌN MỆNH CỦA BẠN</p>
              <div className="flex flex-col flex-grow">
                {elements.map((element, index) => (
                  <React.Fragment key={element.name}>
                    <button
                      className={`flex items-center px-6 py-4 rounded-lg transition-colors duration-200 ${activeElement === element.name
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      onClick={() => setActiveElement(element.name)}
                    >
                      <img
                        src={element.icon}
                        alt={`${element.name} icon`}
                        className="w-10 h-10 object-cover rounded-full mr-4"
                      />
                      <span className="text-lg">{element.name}</span>
                    </button>
                    {index < elements.length - 1 && (
                      <hr className="border-gray-300 my-1" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8">
              {elements.find(e => e.name === activeElement).fishes.map((fish, index) => (
                <div key={index} className="relative">
                  <img
                    src={fish.image}
                    alt={`${fish.name}`}
                    className="w-full h-[413px] object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xl font-bold drop-shadow-lg">
                      {fish.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
