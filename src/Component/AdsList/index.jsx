import React from 'react';
import search from '../../assets/Icon/Search.png';
import { Link } from 'react-router-dom';

const index = () => {
  const ads = [
    { title: 'Bán koi', author: 'email@gmail.com', date: '22/05/2024', package: 'Thường', status: 'Pending' },
    { title: 'Ngọc phong thủy', author: 'email@gmail.com', date: '22/05/2024', package: 'Vip', status: 'Pending' },
    { title: 'Koi vàng', author: 'email@gmail.com', date: '22/05/2024', package: 'Vip', status: 'Pending' },
    { title: 'Super mario smash bros', author: 'email@gmail.com', date: '22/05/2024', package: 'Thường', status: 'Rejected' },
  ];

  return (
    <div className='flex-1'>
      <div className='relative w-full h-[630px] flex flex-col px-[15%] py-[3%]'>
        <div className='flex items-start mb-4'>
          <div className="border-2 border-black px-2 rounded-lg">
            <input
              className="focus:border-transparent focus:outline-none py-2 w-72"
              placeholder="Nhập từ khóa cần tìm kiếm"
            />
          </div>
          <Link to="/" className="bg-white focus:border-transparent cursor-pointer py-1 ml-2">
            <img src={search} className="h-8 w-8" alt="Search" />
          </Link>
        </div>

        <table className="min-w-full border-collapse border-4 border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Advertisement title</th>
              <th className="p-2">Author</th>
              <th className="p-2">Post at</th>
              <th className="p-2">Package</th>
              <th className="p-2">Status</th>
              <th className="p-2">Note</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody className='items-center'>
            {ads.map((ad, index) => (
              <tr key={index}>
                <td className="p-2">{ad.title}</td>
                <td className="p-2">{ad.author}</td>
                <td className="p-2">{ad.date}</td>
                <td className="p-2 text-center">{ad.package}</td>
                <td className="p-2">{ad.status}</td>
                <td className="p-2 "></td>
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
          <span>1 – 4 of 4</span>
          <button className="ml-2 px-4 py-2">⪡</button>
          <button className="ml-2 px-4 py-2">⪢</button>
        </div>
      </div>
    </div>
  );
}

export default index;
