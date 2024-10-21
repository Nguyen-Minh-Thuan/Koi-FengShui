import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../../../Config/axios';
import AdminHeader from '../../../../../Component/HeaderAdmin';

const Index = () => {
  const { accountId } = useParams();
  const [accountDetail, setAccountDetail] = useState(null);
  const [role, setRole] = useState(3);
  const [updateRolePopupVisible, setUpdateRolePopupVisible] = useState(false);

  const openUpdateRolePopup = () => {
    setUpdateRolePopupVisible(true); 
  }

  const closeUpdateRolePopup = () => {
    setUpdateRolePopupVisible(false);
    setRole(0);
  }

  const handleUpdateRole = async () => {
    try {
      const response = await api.put(`User/UpdateRole/${accountId}?newRole=${role}`)
      if(response.status === 200) {
        toast.success(`Successful Message: ${response.data}`);
        fetchAccountsDetail();
      }
      closeUpdateRolePopup();
    } catch (error) {
      console.log(error.response.data);
      toast.error(`Error Message: ${error.response.data}`);
    }
  }

  const handleChangeRole = (event) => {
    setRole(parseInt(event.target.value, 10));
  }

  const fetchAccountsDetail = async () => {
    try {
      const response = await api.get(`User/${accountId}`);
      setAccountDetail(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error.response?.data}`);
    }
  };

  useEffect(() => {    
    if (accountId) fetchAccountsDetail();
  }, [accountId]);

  return (
    <div>
      <AdminHeader />
      <ToastContainer /> 
      <div className='p-8 my-8 mx-32 shadow-xl border-gray-200 rounded-lg border-2 h-fit'>
        <h1 className='text-center py-6 w-full text-5xl font-semibold h-fit'>User Information</h1>
        <div className='flex justify-between text-xl'>
          <div className='pl-14'>
            <p className='m-4'>
                <strong>Account ID:</strong> {accountDetail?.userId || 'N/A'}
            </p>
            <p className='m-4'>
                <strong>User Name:</strong> {accountDetail?.userName || 'N/A'}
            </p>
            <p className='m-4'>
                <strong>Email:</strong> {accountDetail?.email || 'N/A'}
            </p>
          </div>
          <div className='pr-14'>
            <p className='m-4'>
                <strong>Bio:</strong> {accountDetail?.bio || 'N/A'}
            </p>
            <p className='m-4'>
                <strong>Role:</strong> {accountDetail?.role?.roleName || 'N/A'}
            </p>
            <p className='m-4'>
                <strong>Status:</strong> {accountDetail?.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
        <div className='flex justify-center mx-6'>
            <button className='bg-green-500 hover:bg-green-600 mx-2 rounded-lg py-2 px-4 text-white' onClick={openUpdateRolePopup}>Set Role</button>
            <button className='bg-red-500 mx-2 hover:bg-red-600 rounded-lg py-2 px-4 text-white'>Delete</button>
        </div>
      </div>
    
      {updateRolePopupVisible && (
        <div className='fixed flex inset-0 items-center justify-center bg-opacity-50 bg-black '>
          <div className='bg-white shadow-md p-6 rounded-lg h-fit w-[30%]'>
            <h1 className='text-xl font-semibold text-center'>Select Role</h1>
            <select value={role} onChange={handleChangeRole} className='h-14 w-full border-2 border-black rounded p-2 mt-6'>
              <option value={2}>Staff</option>
              <option value={3}>Member</option>
            </select>
            <div className='flex justify-center mt-4'>
              <button className='bg-red-500 p-2 mx-4 rounded-lg text-white hover:bg-red-600' onClick={handleUpdateRole}>Update</button>
              <button className='bg-orange-500 p-2 rounded-lg text-white hover:bg-orange-600 mx-4' onClick={closeUpdateRolePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
