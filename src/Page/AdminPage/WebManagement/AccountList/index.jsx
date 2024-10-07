import AdminNavbar from '../../../../Component/AdminNavbar'
import AdminHeader from '../../../../Component/HeaderAdmin'
import { useState, useEffect } from 'react';
import api from '../../../../Config/axios'
import { Link } from 'react-router-dom';


const AccountList = () => {

  const [account, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    try {
      const response = await api.get('User');
      setAccounts(response.data.data);
    } catch (error) {
      console.error("loi roi: ", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className='flex'>
        <AdminNavbar />
        <div className='flex-1'>
          <div className='relative w-full h-[630px] flex flex-col px-[15%] py-[3%]'>
            <table className="min-w-full border-collapse border-4 border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">User Id</th>
                  <th className="p-2">User Name</th>
                  <th className="p-2">Password</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Bio</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody className='items-center text-center'>
                {account.map((account, index) => (
                  <tr key={index}>
                    <td className="p-2">{account.userId}</td>
                    <td className="p-2">{account.userName || 'N/A'}</td> {/* Sử dụng email từ user */}
                    <td className="p-2">******</td> {/* Định dạng ngày */}
                    <td className="p-2 text-center">{account.email || 'N/A'}</td> {/* Tên gói từ package */}
                    <td className="p-2">{account.isActive}</td>
                    <td className="p-2 ">{account.bio}</td>
                    <td className="p-2">
                      <Link to="#" className="text-blue-500 hover:underline">Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-between items-center">
              <span>Rows per page: </span>
              <select className="border p-2">
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
              <span>1 – {account.length} of {account.length}</span>
              <button className="ml-2 px-4 py-2">⪡</button>
              <button className="ml-2 px-4 py-2">⪢</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountList;