import React from 'react';
import NavBar from '../../Component/NavBar';
import Footer from '../../Component/Footer';

const BlogDetailPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-5">
          <span className="text-gray-500 text-sm">5/10/2024</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Những lưu ý khi nuôi nhiều cá Koi cùng một hồ
        </h1>
        
        <img 
          src="https://koiservice.vn/wp-content/uploads/2023/06/ca-koi-chagoi-huong-dan-chon-ca-va-noi-mua-uy-tin-1.png" 
          alt="Nhiều cá Koi trong hồ" 
          className="w-full h-auto object-cover object-center mb-6"
        />
        
        <div className="space-y-4 text-gray-700">
          <p>
            Nuôi nhiều cá Koi cùng một hồ có thể tạo ra một cảnh quan đẹp mắt và sinh động, 
            nhưng cũng đòi hỏi sự chăm sóc cẩn thận để đảm bảo sức khỏe và sự 
            hài hòa của cá đàn cá. Dưới đây là một số lưu ý quan trọng khi nuôi nhiều cá Koi trong một hồ:
          </p>
          
          <ol className="list-decimal list-outside pl-5 space-y-2">
            <li>Kích thước hồ: Hồ cần phải đủ lớn để cá có không gian bơi lội và phát triển. Khi là bể cá có kích thước lớn và có thể sống lâu, vì vậy kích thước hồ phải đủ lớn để đáp ứng nhu cầu của chúng. Một nguyên tắc chung là mỗi con Koi cần ít nhất 1000 lít nước, nhưng kích thước hồ nên lớn hơn để duy trì chất lượng nước tốt.</li>
            <li>Chất lượng nước: Chất lượng nước là yếu tố quan trọng nhất trong việc chăm sóc cá Koi. Bạn cần kiểm tra thường xuyên các chỉ số như pH, nồng độ amoniac, nitrit và nitrat. Sử dụng hệ thống lọc hiệu quả và thay nước định kỳ để giữ nước trong hồ luôn sạch và trong.</li>
          </ol>
          
          <p>
            Chăm sóc cá Koi đòi hỏi sự chú ý và kiên nhẫn, nhưng với những lưu ý trên, 
            bạn có thể tạo ra một môi trường lý tưởng cho cá và thưởng thức vẻ đẹp của 
            chúng trong hồ của mình.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
