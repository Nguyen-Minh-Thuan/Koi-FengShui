import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../../Component/AdminNavbar';
import AdminHeader from '../../../../Component/HeaderAdmin';
import koiimg from  '../../../../assets/img/Home_banner.jpg'

function Index() {
  const [kois, setKois] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu từ API
    axios.get('https://localhost:7275/api/FengShui/GetKois')
      .then(response => {
        setKois(response.data.data);  // Lưu dữ liệu Koi vào state
        setLoading(false);
      })
      .catch(err => {
        setError('Có lỗi xảy ra khi lấy dữ liệu');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='bg-violet-100'>
    <AdminHeader/>
    <div className='flex'>
      <AdminNavbar/>
      {kois.length > 0 ? (
        <div className="grid grid-cols-4 p-6 flex-1">
          {kois.map(koi => (
            <div key={koi.varietyId} className="bg-white shadow-lg rounded-lg p-4 m-2">
              <img
                className="w-full h-48 object-cover"
                src={ /*koi.imageUrl*/ koiimg || 'default-image-url'}  // Xử lý khi imageUrl là null
                alt={koi.varietyName || 'Koi'}  // Xử lý khi varietyName là null
              />
              <h3 className="text-lg font-bold mt-2">{koi.varietyName || 'Không có tên'}</h3>
              <p className="text-sm text-gray-500 mt-2">{koi.description || 'Chưa có mô tả'}</p>
              <div className="mt-4">
                <h4 className="text-md font-bold">Các mẫu: </h4>
                {koi.patterns && koi.patterns.length > 0 ? (
                  <ul>
                    {koi.patterns.map(pattern => (
                      <li key={pattern.patternId} className="text-sm">
                        {pattern.patternName || 'Không có tên mẫu'}.  
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Không có mẫu nào</p>
                )}
              </div>
              <div className='flex justify-between'>
                <button className='bg-green-500 px-2 py-2 mx-2 mt-4 text-white rounded-lg hover:bg-green-600'>Add Pattern</button>
                <button className='bg-red-500  px-2 py-2 mx-2 text-white rounded-lg hover:bg-red-600 mt-4'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có dữ liệu koi.</p>
      )}
    </div>
    </div>
  );
}

export default Index;
