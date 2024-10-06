import React, { useState } from 'react'; 
import NavBar from '../../../Component/NavBar';
import Footer from '../../../Component/Footer';
import { useNavigate } from 'react-router-dom'; 
import Snackbar from '@mui/material/Snackbar'; 
import Alert from '@mui/material/Alert';

const LoginForm = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [open, setOpen] = useState(false); 
  const [message, setMessage] = useState(''); 
  const [usernameError, setUsernameError] = useState(''); 
  const [passwordError, setPasswordError] = useState(''); 

  const navigate = useNavigate(); 
  const handleLogin = async (e) => {
    e.preventDefault(); 

    setUsernameError('');
    setPasswordError('');

    let hasError = false; 

    if (!username) {
      setUsernameError('Vui lòng điền đầy đủ thông tin!');
      hasError = true; 
    }

    if (!password) {
      setPasswordError('Vui lòng điền đầy đủ thông tin!');
      hasError = true; 
    }

    if (hasError) return; 

    if (!username || !password) {
      setMessage('Vui lòng điền đầy đủ thông tin!');
      setOpen(true); 
      return;
    }

    try {
      const response = await fetch('https://localhost:7275/api/Login/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail: username, password }), 
      });

      if (response.ok) {
        const data = await response.json(); 
        localStorage.setItem('user', JSON.stringify(data.user));

        if (data.user.role === 1) {
          navigate('/admin/manage'); 
        } else if (data.user.role === 2) {
          navigate('/staff/manage'); 
        } else {
          navigate('/');
        }

        setMessage('Đăng nhập thành công!'); 
        setOpen(true); 
      } else {
        setMessage('Đăng nhập thất bại!'); 
        setOpen(true); 
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Có lỗi xảy ra!'); 
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false); 
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Đăng nhập</h2>
          <form className="space-y-4" onSubmit={handleLogin}> 
            <div>
              <input
                type="tel"
                placeholder="Username hoặc email"
                className={`w-full px-3 py-2 border ${usernameError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Mật khẩu"
                className={`w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
            <div className="text-right">
              <a href="#" className="text-blue-500 hover:underline text-sm">Quên mật khẩu?</a>
            </div>
            <button
              style={{ backgroundColor: '#161620' }}
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
            >
              ĐĂNG NHẬP
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
        style={{ marginTop: '100px' }}
      >
      
        <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;
