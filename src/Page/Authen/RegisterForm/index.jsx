import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../Component/NavBar';
import Footer from '../../../Component/Footer';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.userName) newErrors.userName = 'Tên người dùng không được bỏ trống ';
    if (!formData.password) newErrors.password = 'Mật khẩu không được bỏ trống';
    if (!formData.email) {
      newErrors.email = 'Email không được bỏ trống';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email không hợp lệ';
      }
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('https://localhost:7275/api/Registration/Registration', {
        ...formData,
        role: 3,
      });
      console.log('Registration successful:', response.data);
      navigate('/login', { state: { message: 'Đăng ký thành công!' } });
    } catch (error) {
      console.error('Registration failed:', error);
      setSnackbarMessage('Đăng ký thất bại, vui lòng thử lại!.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Đăng ký</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="userName"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="text-right">
              <a href="/login" className="text-blue-500 hover:underline text-sm">Đã có tài khoản?</a>
            </div>
            <button
              style={{ backgroundColor: '#161620' }}
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
            >
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      </div>
     
      <Footer />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{ marginTop: '100px' }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default RegisterForm;
