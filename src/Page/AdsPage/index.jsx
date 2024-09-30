<<<<<<< HEAD
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdsCard from '../../Component/AdsCard'
import NavBar from '../../Component/NavBar'
import Footer from '../../Component/Footer'

const adsData = [
  {
    id: 1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwN6z53dqmjeQ4Ko9rI_XbltrP3YUMX3Nigg&s",
    title: "Cá koi Yamabuki",
    description: "Cá chép koi Benigoi sẽ tạo nên một điểm nhấn thú vị cho hồ koi của bạn. Với màu sắc đỏ chót, Benigoi tựa như một 'khối cầu lửa'...",
    link: "/koi/benigoi"
  },
  {
    id: 2,
    image: "https://sacramentokoi.com/wp-content/uploads/2022/12/220173036-1-247x438.jpg",
    title: "Cá koi Showa",
    description: "Cá koi Showa với ba màu đen, đỏ và trắng tạo nên vẻ đẹp độc đáo. Loài cá này được coi là một trong 'Gosanke' - ba dòng koi quý giá nhất.",
    link: "/koi/showa"
  },
  {
    id: 3,
    image: "https://sacramentokoi.com/wp-content/uploads/2022/12/220173036-1-247x438.jpg",
    title: "Cá koi Kohaku",
    description: "Kohaku là một trong những giống koi được yêu thích nhất, với màu trắng làm nền và các đốm đỏ tương phản. Đây là biểu tượng của sự thanh lịch và đơn giản.",
    link: "/koi/kohaku"
  },
  {
    id: 4,
    image: "https://example.com/images/sanke.jpg",
    title: "Cá koi Sanke",
    description: "Sanke là một trong ba dòng koi Gosanke, với màu trắng làm nền, điểm xuyết bởi các mảng màu đỏ và đen. Đây là biểu tượng của sự cân bằng và hài hòa.",
    link: "/koi/sanke"
  },
  {
    id: 5,
    image: "https://example.com/images/tancho.jpg",
    title: "Cá koi Tancho",
    description: "Tancho koi nổi bật với một chấm đỏ tròn trên đầu, tượng trưng cho mặt trời trên quốc kỳ Nhật Bản. Loài cá này được coi là biểu tượng may mắn.",
    link: "/koi/tancho"
  },
  {
    id: 6,
    image: "https://example.com/images/asagi.jpg",
    title: "Cá koi Asagi",
    description: "Asagi koi có màu xanh nhạt trên lưng và màu đỏ hoặc cam ở bụng. Đây là một trong những dòng koi cổ điển nhất, tượng trưng cho sự thanh bình.",
    link: "/koi/asagi"
  },
  {
    id: 7,
    image: "https://example.com/images/utsurimono.jpg",
    title: "Cá koi Utsurimono",
    description: "Utsurimono koi có màu đen làm nền với các mảng màu đỏ, vàng hoặc trắng. Loài cá này tượng trưng cho sự mạnh mẽ và kiên cường.",
    link: "/koi/utsurimono"
  },
  {
    id: 8,
    image: "https://example.com/images/bekko.jpg",
    title: "Cá koi Bekko",
    description: "Bekko koi có màu trắng, đỏ hoặc vàng làm nền với các đốm đen. Tên gọi này có nghĩa là 'mai rùa', tượng trưng cho sự trường thọ.",
    link: "/koi/bekko"
  },
  {
    id: 9,
    image: "https://example.com/images/goshiki.jpg",
    title: "Cá koi Goshiki",
    description: "Goshiki nghĩa là 'năm màu', thường bao gồm đen, trắng, đỏ, xanh da trời và nâu. Loài cá này tượng trưng cho sự đa dạng và phong phú.",
    link: "/koi/goshiki"
  },
  {
    id: 10,
    image: "https://example.com/images/ogon.jpg",
    title: "Cá koi Ogon",
    description: "Ogon koi có màu sắc đồng nhất, thường là vàng hoặc bạc. Loài cá này tượng trưng cho sự thịnh vượng và giàu có.",
    link: "/koi/ogon"
  },
  {
    id: 11,
    image: "https://example.com/images/kumonryu.jpg",
    title: "Cá koi Kumonryu",
    description: "Kumonryu koi có màu đen và trắng với hoa văn thay đổi, giống như mây trôi. Loài cá này tượng trưng cho sự biến đổi và thích nghi.",
    link: "/koi/kumonryu"
  },
  {
    id: 12,
    image: "https://example.com/images/kujaku.jpg",
    title: "Cá koi Kujaku",
    description: "Kujaku koi có nền trắng với các mảng màu đỏ hoặc cam và vảy lấp lánh. Tên gọi này có nghĩa là 'công', tượng trưng cho vẻ đẹp và sự kiêu hãnh.",
    link: "/koi/kujaku"
  },

]

// Cập nhật dữ liệu mẫu cho các filter
const fishTypes = ['Tất cả', 'Benigoi', 'Showa', 'Kohaku']
const elements = ['Tất cả', 'Hỏa', 'Mộc', 'Thủy', 'Thổ', 'Kim']
const colors = ['Tất cả', 'Đỏ', 'Đen', 'Trắng', 'Đa màu']

const AdsPage = () => {
  const [selectedType, setSelectedType] = useState('Tất cả')
  const [selectedElement, setSelectedElement] = useState('Tất cả')
  const [selectedColor, setSelectedColor] = useState('Tất cả')

  // Hàm lọc dữ liệu (giả định, cần điều chỉnh theo logic thực tế của bạn)
  const filteredAds = adsData.filter(ad => {
    return (selectedType === 'Tất cả' || ad.title.includes(selectedType)) &&
           (selectedElement === 'Tất cả' || ad.description.includes(selectedElement)) &&
           (selectedColor === 'Tất cả' || ad.description.includes(selectedColor))
  })

  return (
    <>
    <NavBar />
    <div className="container mx-auto px-4 py-12" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h1 className="text-4xl font-bold text-center mb-12">Các sản phẩm phong thủy</h1>
      
      {/* Dropdown filters */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <div className="flex items-center">
          <span className="mr-3">Lọc theo:</span>
          <select 
            className="p-2 border rounded"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="" disabled>Loại cá</option>
            {fishTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <select 
          className="p-2 border rounded"
          value={selectedElement}
          onChange={(e) => setSelectedElement(e.target.value)}
        >
          <option value="" disabled>Mệnh</option>
          {elements.map(element => (
            <option key={element} value={element}>{element}</option>
          ))}
        </select>
        <select 
          className="p-2 border rounded"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="" disabled>Màu</option>
          {colors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {filteredAds.map(ad => (
          <div key={ad.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" style={{ maxWidth: '260px' }}>
            <Link to={`/ads/product/${ad.id}`}>
              <AdsCard 
                image={ad.image}
                title={ad.title}
                description={ad.description}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default AdsPage
=======
import React, { useState } from "react";
import AdsCard from "../../Component/AdsCard";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";

const adsData = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwN6z53dqmjeQ4Ko9rI_XbltrP3YUMX3Nigg&s",
    title: "Cá koi Benigoi",
    description:
      "Cá chép koi Benigoi sẽ tạo nên một điểm nhấn thú vị cho hồ koi của bạn. Với màu sắc đỏ chót, Benigoi tựa như một 'khối cầu lửa'...",
    link: "/koi/benigoi",
  },
  {
    id: 2,
    image:
      "https://sacramentokoi.com/wp-content/uploads/2022/12/220173036-1-247x438.jpg",
    title: "Cá koi Showa",
    description:
      "Cá koi Showa với ba màu đen, đỏ và trắng tạo nên vẻ đẹp độc đáo. Loài cá này được coi là một trong 'Gosanke' - ba dòng koi quý giá nhất.",
    link: "/koi/showa",
  },
  {
    id: 3,
    image:
      "https://sacramentokoi.com/wp-content/uploads/2022/12/220173036-1-247x438.jpg",
    title: "Cá koi Kohaku",
    description:
      "Kohaku là một trong những giống koi được yêu thích nhất, với màu trắng làm nền và các đốm đỏ tương phản. Đây là biểu tượng của sự thanh lịch và đơn giản.",
    link: "/koi/kohaku",
  },
  {
    id: 4,
    image: "https://example.com/images/sanke.jpg",
    title: "Cá koi Sanke",
    description:
      "Sanke là một trong ba dòng koi Gosanke, với màu trắng làm nền, điểm xuyết bởi các mảng màu đỏ và đen. Đây là biểu tượng của sự cân bằng và hài hòa.",
    link: "/koi/sanke",
  },
  {
    id: 5,
    image: "https://example.com/images/tancho.jpg",
    title: "Cá koi Tancho",
    description:
      "Tancho koi nổi bật với một chấm đỏ tròn trên đầu, tượng trưng cho mặt trời trên quốc kỳ Nhật Bản. Loài cá này được coi là biểu tượng may mắn.",
    link: "/koi/tancho",
  },
  {
    id: 6,
    image: "https://example.com/images/asagi.jpg",
    title: "Cá koi Asagi",
    description:
      "Asagi koi có màu xanh nhạt trên lưng và màu đỏ hoặc cam ở bụng. Đây là một trong những dòng koi cổ điển nhất, tượng trưng cho sự thanh bình.",
    link: "/koi/asagi",
  },
  {
    id: 7,
    image: "https://example.com/images/utsurimono.jpg",
    title: "Cá koi Utsurimono",
    description:
      "Utsurimono koi có màu đen làm nền với các mảng màu đỏ, vàng hoặc trắng. Loài cá này tượng trưng cho sự mạnh mẽ và kiên cường.",
    link: "/koi/utsurimono",
  },
  {
    id: 8,
    image: "https://example.com/images/bekko.jpg",
    title: "Cá koi Bekko",
    description:
      "Bekko koi có màu trắng, đỏ hoặc vàng làm nền với các đốm đen. Tên gọi này có nghĩa là 'mai rùa', tượng trưng cho sự trường thọ.",
    link: "/koi/bekko",
  },
  {
    id: 9,
    image: "https://example.com/images/goshiki.jpg",
    title: "Cá koi Goshiki",
    description:
      "Goshiki nghĩa là 'năm màu', thường bao gồm đen, trắng, đỏ, xanh da trời và nâu. Loài cá này tượng trưng cho sự đa dạng và phong phú.",
    link: "/koi/goshiki",
  },
  {
    id: 10,
    image: "https://example.com/images/ogon.jpg",
    title: "Cá koi Ogon",
    description:
      "Ogon koi có màu sắc đồng nhất, thường là vàng hoặc bạc. Loài cá này tượng trưng cho sự thịnh vượng và giàu có.",
    link: "/koi/ogon",
  },
  {
    id: 11,
    image: "https://example.com/images/kumonryu.jpg",
    title: "Cá koi Kumonryu",
    description:
      "Kumonryu koi có màu đen và trắng với hoa văn thay đổi, giống như mây trôi. Loài cá này tượng trưng cho sự biến đổi và thích nghi.",
    link: "/koi/kumonryu",
  },
  {
    id: 12,
    image: "https://example.com/images/kujaku.jpg",
    title: "Cá koi Kujaku",
    description:
      "Kujaku koi có nền trắng với các mảng màu đỏ hoặc cam và vảy lấp lánh. Tên gọi này có nghĩa là 'công', tượng trưng cho vẻ đẹp và sự kiêu hãnh.",
    link: "/koi/kujaku",
  },
];

// Cập nhật dữ liệu mẫu cho các filter
const fishTypes = ["Tất cả", "Benigoi", "Showa", "Kohaku"];
const elements = ["Tất cả", "Hỏa", "Mộc", "Thủy", "Thổ", "Kim"];
const colors = ["Tất cả", "Đỏ", "Đen", "Trắng", "Đa màu"];

const AdsPage = () => {
  const [selectedType, setSelectedType] = useState("Tất cả");
  const [selectedElement, setSelectedElement] = useState("Tất cả");
  const [selectedColor, setSelectedColor] = useState("Tất cả");

  // Hàm lọc dữ liệu (giả định, cần điều chỉnh theo logic thực tế của bạn)
  const filteredAds = adsData.filter((ad) => {
    return (
      (selectedType === "Tất cả" || ad.title.includes(selectedType)) &&
      (selectedElement === "Tất cả" ||
        ad.description.includes(selectedElement)) &&
      (selectedColor === "Tất cả" || ad.description.includes(selectedColor))
    );
  });

  return (
    <>
      <NavBar />
      <div
        className="container mx-auto px-4 py-12"
        style={{ maxWidth: "1400px", margin: "0 auto" }}
      >
        <h1 className="text-4xl font-bold text-center mb-12">
          Các sản phẩm phong thủy
        </h1>

        {/* Dropdown filters */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center">
            <span className="mr-3">Lọc theo:</span>
            <select
              className="p-2 border rounded"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="" disabled>
                Loại cá
              </option>
              {fishTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <select
            className="p-2 border rounded"
            value={selectedElement}
            onChange={(e) => setSelectedElement(e.target.value)}
          >
            <option value="" disabled>
              Mệnh
            </option>
            {elements.map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
          </select>
          <select
            className="p-2 border rounded"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="" disabled>
              Màu
            </option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {filteredAds.map((ad) => (
            <div
              key={ad.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
              style={{ maxWidth: "260px" }}
            >
              <AdsCard
                image={ad.image}
                title={ad.title}
                description={ad.description}
                link={ad.link}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdsPage;
>>>>>>> NamLa
