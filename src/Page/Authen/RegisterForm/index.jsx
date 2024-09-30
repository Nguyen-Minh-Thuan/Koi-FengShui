import React from 'react';
import NavBar from '../../../Component/NavBar';
import Footer from '../../../Component/Footer';

const RegisterForm = () => {
  return (
    <>
    <NavBar/>
    <div className="flex flex-col items-center justify-center min-h-[500px] bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Đăng ký</h2>
        <form className="space-y-4">
          <div>
            <input
              type="tel"
              placeholder="Số điện thoại"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="text-right">
            <a href="/login" className="text-blue-500 hover:underline text-sm">Đã có tài khoản?</a>
          </div>
          <button
            style={{backgroundColor: '#161620'}}
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
          >
            ĐĂNG KÝ
          </button>
        </form>
      </div>
        </div>
    <Footer/>
    </>
  );
};

export default RegisterForm;
