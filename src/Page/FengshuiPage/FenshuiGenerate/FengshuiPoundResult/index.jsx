import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../../../Component/NavBar';
import Footer from '../../../../Component/Footer';

const FengshuiPondResult = () => {
  const location = useLocation(); 
  const { recQuantity, variety } = location.state || { recQuantity: 0, variety: [] }; 


  return (
    <>
      <NavBar/>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Kết quả phong thủy</h1>
        <h3 className="text-xl mt-4">Giống cá koi phù hợp:</h3>
        <div className="mt-2">
          
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default FengshuiPondResult;