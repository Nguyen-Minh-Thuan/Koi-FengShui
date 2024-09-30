import React from 'react';
import NavBar from '../../Component/NavBar';
import Footer from '../../Component/Footer';
import AdsCard from '../../Component/AdsCard';  // Thêm import này

const AdsDetailPage = () => {
  return (
    <>
    <NavBar/>
    <div className="max-w-5xl mx-auto p-4 font-sans mt-10" >
      <div className="flex flex-col md:flex-row gap-8 mb-12">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwN6z53dqmjeQ4Ko9rI_XbltrP3YUMX3Nigg&s" alt="Koi Benigoi" className="w-full md:w-[300px] h-[450px] object-contain" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Koi Yamabuki Ogon size 10 - 65 cm</h1>
          <p className="text-gray-600 mb-4">
            Cá chép koi Benigoi sẽ tạo nên một điểm nhấn thú vị trong hồ koi của bạn. Với màu sắc đỏ chót, Benigoi tựa như một "khối cầu lửa" di chuyển linh hoạt thu hút mọi ánh nhìn trong hồ koi. Hiện chúng tôi cung cấp: Benigoi nhập khẩu từ Nhật, F1, Việt.
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Giá trị đơn hàng từ 1 triệu 5 tặng kèm 1 chai vi sinh (không hợp nhất với combo khác).</li>
            <li>Mua 10 tặng 1, tặng kèm 1 chai vi sinh cao cấp 800ml.</li>
            <li>Miễn phí ship từ trại ra các bến xe tại Hà Nội.</li>
          </ul>
          <p className="text-gray-600">Liên hệ: 0987654321</p>
          <p className="text-gray-600 mb-4">Mail: example@gmail.com</p>
          <div className="space-x-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Loại: Cá Koi</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Danh mục: Mệnh kim, Màu vàng</span>
          </div>
        </div>
      </div>
      <hr className="my-8 h-px border-0 bg-gray-300" />
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">CÁC SẢN PHẨM TƯƠNG TỰ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center mb-10">
          {[
            { name: "Cá koi Benigoi", image: "/path/to/koi-benigoi-1.jpg", description: "Cá chép koi Benigoi sẽ tạo nên một điểm nhấn thú vị trong hồ koi của bạn. Với màu sắc đỏ chót, Benigoi tựa như một \"khối cầu lửa\" di..." },
            { name: "Koi Yamabuki Ogon", image: "/path/to/koi-yamabuki-ogon.jpg", description: "Cá chép koi Yamabuki Ogon với màu vàng rực rỡ sẽ mang lại sự sang trọng và may mắn cho hồ cá của bạn..." },
            { name: "Cá koi Benigoi", image: "/path/to/koi-benigoi-2.jpg", description: "Một biến thể khác của cá koi Benigoi, mang đến vẻ đẹp độc đáo và sự đa dạng cho bộ sưu tập cá koi của bạn..." },
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
    <Footer/>
    </>
  );
};

export default AdsDetailPage;
