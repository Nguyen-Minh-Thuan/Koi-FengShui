import AdminNavbar from '../../../../Component/AdminNavbar';
import AdminHeader from '../../../../Component/HeaderAdmin';
import { useState, useEffect } from 'react';
import api from '../../../../Config/axios';
import { Link } from 'react-router-dom';

const Index = () => {
  const [packages, setPackages] = useState([]);

  const fetchPackage = async () =>{
    try {
      const response = await api.get('Advertisement/GetPackage');
      setPackages(response.data.data);
    } catch (error) {
      console.log(error);
    }    
  };

  useEffect(() => {
    fetchPackage();
  },[])


  return (
    <>
      <AdminHeader/>
      <div className='flex'>
        <AdminNavbar/>
        <div className='flex-1 p-8'>
        <h1 className='text-center text-3xl font-semibold'> Package List detail </h1>
          <div className='items-center relative w-full h-[630px] px-[15%] py-[3%]'>
            <table className='min-w-full border-collapse border-4 border-gray-300'>
              <thead className=''>
                <tr className='bg-gray-200'>
                  <th> Package Name </th>
                  <th> Duration </th>
                  <th> price </th>
                  <th> Action</th>
                </tr>  
              </thead>
              <tbody className='border-black text-center'>
                {packages.map((pack, index) =>(
                <tr key={index}>
                  <td>{pack.packageName}</td>
                  <td>{pack.duration} days</td>
                  <td>{pack.price}</td>
                  <td>
                    <Link to='/' className='text-blue-700 hover:underline'>Detail</Link>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index