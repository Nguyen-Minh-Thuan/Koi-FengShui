import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";
import AdsCard from "../../Component/AdsCard";

const elementIdToCategory = {
  1: "Kim",
  2: "Thủy",
  3: "Hỏa",
  4: "Mộc",
  5: "Thổ",
};

const AdsDetailPage = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  useEffect(() => {
    const fetchAd = async () => {
      const response = await fetch(
        `https://localhost:7275/api/Advertisement/GetAdsById?id=${id}`
      );
      const addata = await response.json();
      const ad = addata.data;
      setAd(ad);
    };

    fetchAd();
  }, [id]);

  if (!ad) {
    return <div>ad not found</div>;
  }
  return (
    <>
      <NavBar />
      <div className="max-w-5xl mx-auto p-4 font-sans mt-10">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-full md:w-[300px] h-[450px] object-contain"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {ad.title}
            </h1>
            <p
              className="text-gray-600 mb-4"
              dangerouslySetInnerHTML={{ __html: ad.content }}
            ></p>

            <div className="space-x-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                Loại: {ad.adsType.typeName}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                Mệnh: {elementIdToCategory[ad.elementId] || "Không khả dụng"}
              </span>
            </div>
          </div>
        </div>
        <hr className="my-8 h-px border-0 bg-gray-300" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            CÁC SẢN PHẨM TƯƠNG TỰ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center mb-10">
            {[
              {
                name: "Cá koi Benigoi",
                image: "/path/to/koi-benigoi-1.jpg",
                description:
                  'Cá chép koi Benigoi sẽ tạo nên một điểm nhấn thú vị trong hồ koi của bạn. Với màu sắc đỏ chót, Benigoi tựa như một "khối cầu lửa" di...',
              },
              {
                name: "Koi Yamabuki Ogon",
                image: "/path/to/koi-yamabuki-ogon.jpg",
                description:
                  "Cá chép koi Yamabuki Ogon với màu vàng rực rỡ sẽ mang lại sự sang trọng và may mắn cho hồ cá của bạn...",
              },
              {
                name: "Cá koi Benigoi",
                image: "/path/to/koi-benigoi-2.jpg",
                description:
                  "Một biến thể khác của cá koi Benigoi, mang đến vẻ đẹp độc đáo và sự đa dạng cho bộ sưu tập cá koi của bạn...",
              },
            ].map((product, index) => (
              <AdsCard
                key={index}
                image={product.image}
                title={product.name}
                description={product.description}
                link="#"
                className="h-full w-full max-w-sm"
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const getProductById = (id) => {
  const products = [
    {
      id: "1",
      name: "Cá koi Benigoi",
      image: "/path/to/koi-benigoi-1.jpg",
      description: "Mô tả sản phẩm 1",
    },
    {
      id: "2",
      name: "Koi Yamabuki Ogon",
      image: "/path/to/koi-yamabuki-ogon.jpg",
      description: "Mô tả sản phẩm 2",
    },
    {
      id: "3",
      name: "Cá koi Benigoi",
      image: "/path/to/koi-benigoi-2.jpg",
      description: "Mô tả sản phẩm 3",
    },
  ];
  return products.find((product) => product.id === id) || {};
};

export default AdsDetailPage;
