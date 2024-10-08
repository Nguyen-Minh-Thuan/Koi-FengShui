import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../../../Component/NavBar';
import Footer from '../../../../Component/Footer';

const FengshuiPondResult = () => {
  const location = useLocation(); 
  const { koiPoint, totalPoint, element, direction } = location.state || { koiPoint: [], totalPoint: 0, element: [], direction:"" };

  const elementColorsP = {
    "Hỏa": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-HOA.jpg", 
    "Thủy": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-THUY.jpg", 
    "Mộc": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-MOC.jpg", 
    "Kim": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-KIM.jpg", 
    "Thổ": "https://nguyenthehoa.com/wp-content/uploads/Nguyen-to-thuy-to-phong-thuy-THO.jpg" 
  };
  const elementColorsC = {
    "Hỏa": "red-500", 
    "Thủy": "blue-500", 
    "Mộc": "green-500", 
    "Kim": "gray-300", 
    "Thổ": "yellow-500" 
  };


  return (
    <>
    <NavBar/>
   
    <Footer/>
    </>
  );
};

export default FengshuiPondResult;