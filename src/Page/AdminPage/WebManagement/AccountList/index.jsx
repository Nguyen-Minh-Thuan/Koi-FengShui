import AdminNavbar from '../../../../Component/AdminNavbar'
import AdminHeader from '../../../../Component/HeaderAdmin'
import search from '../../../../assets/Icon//Search.png'

import { useState, useEffect } from 'react';
import api from '../../../../Config/axios'
import { Link } from 'react-router-dom';


const AccountList = () => {

  const [account, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(3);

  const startIndex = (currentPage -1)*rowPerPage;
  const endIndex = startIndex + rowPerPage;
  const currentAccount = account.slice(startIndex,endIndex);

  const fetchAccounts = async () => {
    try {
      const response = await api.get('User/GetUserByPage');
      setAccounts(response.data.data);
    } catch (error) {
      console.error("loi roi: ", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);
  
  const handleNextPage = () =>  {
    if(currentPage < Math.ceil(account.length / rowPerPage))
      setCurrentPage(currentPage + 1);
  };

  const handlePrevPage= () => {
    setCurrentPage(currentPage - 1);
  }

  const handleChangeRowPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  }

  return (
    <>
      <AdminHeader />
      <div className='flex'>
        <AdminNavbar />
        <div className='flex-1 p-6 bg-violet-100 min-h-screen'>
        <div className='bg-white shadow-lg p-8'>
          <h1 className='text-center font-semibold text-2xl'> Account List</h1>
          <div className='relative w-full h-min flex flex-col px-[5%] py-[3%]'>
            <div className='flex items-start mb-4'>
                <div className="border-2 border-black px-2 rounded-lg">
                  <input
                    className="focus:border-transparent focus:outline-none py-2 w-72"
                    placeholder="Search"
                  />
                </div>
                <Link to="/" className="bg-white focus:border-transparent cursor-pointer py-1 ml-2">
                  <img src={search} className="h-8 w-8" alt="Search" />
                </Link>
              </div>
            <table className="min-w-full border-collapse border-4 border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">User Id</th>
                  <th className="p-2">User Name</th>
                  <th className="p-2">Password</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Bio</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody className='items-center text-center'>
                {currentAccount.map((account, index) => (
                  <tr key={index}>
                    <td className="p-2">{account.userId}</td>
                    <td className="p-2">{account.userName || 'None'}</td> 
                    <td className="p-2">******</td>
                    <td className="p-2">{account.email || 'None'}</td>
                    <td className='p-2'>
                      {account.roleId === 1 ? "Admin" : (account.roleId === 2 ? "Staff" : "User")}
                    </td>
                    <td className="p-2">{account.isActive === true ? <span>Active</span> : <span>Inactive</span>}</td>
                    <td className="p-2 ">{account.bio}</td>
                    <td className="p-2">
                      <Link to={`/admin/accountlist/${account.userId}`}className="text-blue-500 hover:underline">Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-between items-center">
              <span>Rows per page: </span>
              <select className="border p-2" value={rowPerPage} onChange={handleChangeRowPerPage}>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
              <span>
                {startIndex + 1}-{endIndex > account.length ? account.length : endIndex} of {account.length}
              </span>
              <button onClick={handlePrevPage} className={`ml-2 px-4 py-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={currentPage === 1}>⪡</button>
              <button onClick={handleNextPage} className={`ml-2 px-4 py-2 ${currentPage === Math.ceil(account.length / rowPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={currentPage === Math.ceil(account.length / rowPerPage)}>⪢</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountList;