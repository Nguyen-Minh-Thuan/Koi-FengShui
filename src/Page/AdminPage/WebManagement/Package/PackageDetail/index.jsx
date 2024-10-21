import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import api from '../../../../../Config/axios';
import AdminHeader from '../../../../../Component/HeaderAdmin';
import { toast,ToastContainer } from 'react-toastify';

const Index = () => {
  const { packageId } = useParams();
  const [packageDetail, setPackageDetail] = useState(null);
  const [packageName, setPackageName] = useState();
  const [packagePrice, setPackagePrice] = useState();
  const [duration, setDuration] = useState();
  const [updatePackagePopupVisible, setUpdatePackagePopupVisible] = useState(false);

  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const openUpdatePackagePopup = () => {
    setUpdatePackagePopupVisible(true);
    setPackageName(packageDetail?.packageName || '');
    setPackagePrice(packageDetail?.price || '');
    setDuration(packageDetail?.duration || '');
  };

  const closeUpdatePackagePopup = () => {
    setUpdatePackagePopupVisible(false);
  };

  const deletePackages = async () => {
    try {
      const response = await api.delete(`Package/DeleteKoi/${packageId}`);
      if (response.status === 200) {        
        navigate('/admin/packages'); 
        toast.success(`Success message: ${response.data}`);
      }
    } catch (error) {
      console.log(error);
      alert(`Error: ${error.response?.data}`);
    }
  };

  const handleUpdatePackage = async () => {
    try {
      const packageUpdate = {
        packageName, 
        price: parseFloat(packagePrice), 
        duration: parseInt(duration),
      };

      const response = await api.put(`Package/UpdatePackage/${packageId}`, packageUpdate);
      if (response.status === 200) {
        toast.success(`Success message: Update package successful`);
        closeUpdatePackagePopup();
      }
    } catch (error) {
      console.log(error.response?.data);
      alert(`Fail message: ${error.response?.data}`);
    }
  };

  useEffect(() => {
    const fetchPackagesDetail = async () => {
      try {
        const response = await api.get(`Package/GetPackageById/${packageId}`);
        setPackageDetail(response.data.data);
      } catch (error) {
        console.log(error);
        alert(`Error: ${error.response?.data}`);
      }
    };
    if (packageId) fetchPackagesDetail();
  }, [packageId]);

  return (
    <div>
      <AdminHeader />
      <ToastContainer/>
      <div className='p-8 my-8 mx-32 shadow-xl border-gray-200 rounded-lg border-2 h-fit'>
        <h1 className='text-center py-6 w-full text-5xl font-semibold h-fit'>Package Information</h1>
        <div className='flex justify-between text-xl'>
          <div className='pl-14 '>
            <p className='m-4'>
                <strong>Package ID: </strong> {packageDetail?.packageId || 'N/A'}
            </p>
            <p className='m-4'>
                <strong>Package Name: </strong> {packageDetail?.packageName || 'N/A'}
            </p>
          </div>
          <div className='pr-14'>
            <p className='m-4'>
                <strong>price: </strong> {packageDetail?.price || 'N/A'} VNĐ
            </p>
            <p className='m-4'>
                <strong>duration: </strong> {packageDetail?.duration || 'N/A'} Days
            </p>
          </div>
        </div>
        <div className='flex justify-center mx-6'>
            <button className='bg-green-500 hover:bg-green-600 mx-2 rounded-lg py-2 px-4 text-white' onClick={openUpdatePackagePopup}>Update</button>
            {/* <button className='bg-orange-500 mx-2 hover:bg-orange-600 rounded-lg py-2 px-4 text-white'>Cancel</button> */}
            <button className='bg-red-500 mx-2 hover:bg-red-600 rounded-lg py-2 px-4 text-white' onClick={deletePackages}>Delete</button>
        </div>
      </div>
    
      {updatePackagePopupVisible && (
        <div className='fixed flex inset-0 items-center justify-center bg-opacity-50 bg-black '>
          <div className='bg-white shadow-md p-6 rounded-lg h-fit w-fit'>
          <h1 className="text-xl font-semibold text-center">Fill Update Information</h1>
            <input
              className="h-14 w-full border-2 border-black rounded p-2 mt-6"
              value={packageName}
              onChange={(event) => setPackageName(event.target.value)}
              placeholder="Package name"
            />
            <input
              className="h-14 w-full border-2 border-black rounded p-2 mt-6"
              value={packagePrice}
              onChange={(event) => setPackagePrice(event.target.value)}
              placeholder="Package price"
            />
            <input className="h-14 w-full border-2 border-black rounded p-2 mt-6" value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="Package duration"
            />
            <div className='flex justify-center mt-6'>
              <button className='bg-red-500 p-2 mx-4 rounded-lg text-white hover:bg-red-600' onClick={handleUpdatePackage}>Update</button>
              <button className='bg-orange-500 p-2 rounded-lg text-white hover:bg-orange-600 mx-4' onClick={closeUpdatePackagePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
