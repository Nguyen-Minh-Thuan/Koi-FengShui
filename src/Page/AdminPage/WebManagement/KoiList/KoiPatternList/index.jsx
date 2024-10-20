import { useState, useEffect } from 'react';
import AdminNavbar from '../../../../../Component/AdminNavbar';
import AdminHeader from '../../../../../Component/HeaderAdmin';
import koiImg from  '../../../../../assets/img/Home_banner.jpg';
import api from '../../../../../Config/axios';
import { Link, useParams } from 'react-router-dom';

function Index() {
  const { koiPatternId } = useParams();
  const [pattern, setPattern] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');


  useEffect(() => {
    const fetchKoiVariety = async () => {
      try {
        const response = await api.get(`Koi/GetKoiById/${koiPatternId}`);
        if (response.data.status) {
          setPattern(response.data.data.patterns); 
          setDescription(response.data.data.description);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    if (koiPatternId) fetchKoiVariety();
  }, [koiPatternId]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-violet-100 min-h-screen'>
      <AdminHeader />
      <div className='flex'>
        <div className='flex-1 p-6'>
          <h1 className='bg-white rounded-lg w-fit p-4 ml-3 my-4 text-2xl shadow-lg flex'>{description}</h1>
          <button className='bg-white rounded-xl pr-4 ml-3 shadow-lg font-semibold flex items-center text-xl'>
            <span className='m-3 text-3xl'>+</span>
            Create New Pattern Koi
          </button>          
          {pattern.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {pattern.map(koi => (
                <div key={koi.patternId} className="bg-white shadow-lg rounded-lg p-4 m-2">
                    <img
                    className="w-full h-48 object-cover"
                    src={koi.imageUrl || koiImg} // Sử dụng koi.imageUrl
                    />
                    <h3 className="text-lg font-bold mt-2">{koi.patternName || 'Không có tên'}</h3>
                    <p className="text-sm mt-2">{koi.description || 'No descrition'}</p>
                    <div className='mt-4 text-right'>
                        <Link to={`/admin/koilist/${koi.varietyId}`} className='bg-blue-500 px-2 py-2 text-white rounded-lg hover:bg-blue-600'>View Koi Details</Link>
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
