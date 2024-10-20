import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../../Component/AdminNavbar';
import AdminHeader from '../../../../Component/HeaderAdmin';
import koiImg from  '../../../../assets/img/Home_banner.jpg';
import api from '../../../../Config/axios';
import { Link } from 'react-router-dom';

function Index() {
  const [kois, setKois] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchKoi = async () => {
    try {
      const response = await api.get('FengShui/GetKois');
      setKois(response.data.data);
    } catch (error) {
      console.log(error);
      setError('Có lỗi xảy ra khi tải dữ liệu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKoi();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-violet-100 min-h-screen'>
      <AdminHeader />
      <div className='flex'>
        <AdminNavbar />
        <div className='flex-1 p-6'>
          <button className='bg-white rounded-xl pr-4 ml-3 shadow-lg font-semibold flex items-center text-xl'>
            <span className='m-3 text-3xl'>+</span>
            Create New Variety Koi
          </button>

          {kois.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {kois.map(koi => (
                <div key={koi.varietyId} className="bg-white shadow-lg rounded-lg p-4 m-2">
                  <img
                    className="w-full h-48 object-cover"
                    src={koi.imageUrl || koiImg} 
                    alt={koi.varietyName || 'Koi'} 
                  />
                  <h3 className="text-lg font-bold mt-2">{koi.varietyName || 'Không có tên'}</h3>
                  <p className="text-sm  mt-2">{koi.description || 'Chưa có mô tả'}</p>
                  <div className="mt-4">
                    <h4 className="text-md font-bold">Pattern: </h4>
                    {koi.patterns && koi.patterns.length > 0 ? (
                      <ul>
                        {koi.patterns.map(pattern => (
                          <li key={pattern.patternId} className="text-sm">
                            {pattern.patternName || 'Không có mẫu'}.
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No Pattern</p>
                    )}
                  </div>
                  <div className='mt-4 text-right'>
                    <Link to={`/admin/koilist/${koi.varietyId}`} className='bg-blue-500 px-2 py-2 text-white rounded-lg hover:bg-blue-600'>View Pattern Details</Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Không có dữ liệu.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
