import AdminNavbar from '../../../../Component/AdminNavbar';
import AdminHeader from '../../../../Component/HeaderAdmin';
import { useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom'
import api from '../../../../Config/axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Index = () => {
  const [packages, setPackages] = useState([]);
  const [addPackagePopupVisible, setAddPackagePopupVisible] = useState(false);
  const [packageName, setPackageName] = useState();
  const [packagePrice, setPackagePrice] = useState();
  const [duration, setDuration] = useState();

  const openAddPackagePopup = () => {
    setAddPackagePopupVisible(true);
  }

  const closeAddPackagePopup = () => {
    setAddPackagePopupVisible(false);
    setPackageName();
    setPackagePrice();
    setDuration();
  }

  const handleAddPackage = async () => {
    try {
      const newPackage = {
        packageName,
        price: parseFloat(packagePrice),
        duration: parseInt(duration),
      };

      const response = await api.post('/Package/AddNewPackage', newPackage);
      if (response.status === 200) {
        toast.success(`Success message: Add package successful`);
        closeAddPackagePopup();
        fetchPackage();
      }
    } catch (error) {
      console.log(error.response?.data);
      alert(`Error: ${error.response?.data}`);
    }
  };

  const fetchPackage = async () =>{
    try {
      const response = await api.get('Package/GetAllPackages');
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
      <ToastContainer/>
      <div className='flex'>
        <AdminNavbar/>        
        <div className='flex-1 p-8'>
        <button className='bg-white rounded-xl pr-4 ml-4 border-gray-200 border-2 mt-4 hover:bg-gray-100 shadow-lg font-semibold flex items-center text-xl' onClick={openAddPackagePopup}>
          <span className='m-3 text-3xl'>+</span>
          Add new package
        </button>
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
                    <Link to={`/admin/packages/${pack.packageId}`} className='text-blue-700 hover:underline'>Detail</Link>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {addPackagePopupVisible && (
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
              <button className='bg-red-500 p-2 mx-4 rounded-lg text-white hover:bg-red-600' onClick={handleAddPackage}>Add</button>
              <button className='bg-orange-500 p-2 rounded-lg text-white hover:bg-orange-600 mx-4' onClick={closeAddPackagePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Index