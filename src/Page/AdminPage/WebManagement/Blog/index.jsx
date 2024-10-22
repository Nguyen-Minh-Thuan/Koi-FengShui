import React from 'react';
import AdminNavbar from '../../../../Component/AdminNavbar';
import AdminHeader from '../../../../Component/HeaderAdmin';
import { useState, useEffect } from 'react';
import api from '../../../../Config/axios';
import { Link } from 'react-router-dom';

const Index = () => {
  const [blogList, setBlogList] = useState([]);

  // const fetchBlogs = async () => {
  //   try {
  //     const response = await api.get("user");
  //     setBlogList(response.data);
  //   } catch (error) {
  //     console.error("Error fetching blogs: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchBlogs();
  // }, []);

  const blogPosts = [
    {
      id: 1,
      title: 'Những lưu ý khi nuôi nhiều cá Koi cùng một hồ',
      excerpt: 'Khi nuôi nhiều cá Koi trong cùng một hồ, bạn cần lưu ý những điểm sau...',
      date: '10/10/2024',
      image: 'https://koiservice.vn/wp-content/uploads/2023/06/ca-koi-chagoi-huong-dan-chon-ca-va-noi-mua-uy-tin-1.png',
    },
    {
      id: 2,
      title: 'Những quy tắc vàng khi thả cá Koi vào hồ mới',
      excerpt: 'Trước khi thả cá Koi vào ao mới, hồ nên được chạy máy bơm...',
      date: '15/10/2024',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ynbkcVvSVocADhUhwHc-_c_YioGh88V7nQ&s',
    },
    {
      id: 2,
      title: 'Những quy tắc vàng khi thả cá Koi vào hồ mới',
      excerpt: 'Trước khi thả cá Koi vào ao mới, hồ nên được chạy máy bơm...',
      date: '15/10/2024',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ynbkcVvSVocADhUhwHc-_c_YioGh88V7nQ&s',
    },
    {
      id: 2,
      title: 'Những quy tắc vàng khi thả cá Koi vào hồ mới',
      excerpt: 'Trước khi thả cá Koi vào ao mới, hồ nên được chạy máy bơm...',
      date: '15/10/2024',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ynbkcVvSVocADhUhwHc-_c_YioGh88V7nQ&s',
    },
    // Thêm các bài viết khác
  ];

  return (
    <>
      <AdminHeader />
      <div className='flex'>
        <AdminNavbar />
        <div className='flex-1 bg-violet-100 p-6'>
          <div className='grid grid-cols-3 gap-6'>
            {blogPosts.map((blog) => (
              <div key={blog.id} className='bg-white shadow-lg rounded-lg overflow-hidden'>
                <img className='w-full h-48 object-cover' src={blog.image} alt={blog.title} />
                <div className='p-4'>
                  <h3 className='text-lg font-bold text-gray-700'>{blog.title}</h3>
                  <p className='text-sm text-gray-500 mt-2'>{blog.excerpt}</p>
                  <div className='flex justify-between items-center mt-4'>
                    <Link to='/' className='text-blue-500 text-sm'>Read More</Link>
                    <div>
                      <button className='bg-blue-500 text-white ml-2 px-3 py-1 rounded'>Edit</button>
                      <button className='bg-blue-500 text-white ml-2 px-3 py-1 rounded'>delete</button>
                    </div>                    
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
