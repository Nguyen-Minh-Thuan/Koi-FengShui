import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const UserProfile = () => {
  const [userData, setUserData] = useState({ userName: "", email: "" });
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({ userName: "", email: "" });
  const [alert, setAlert] = useState({ visible: false, message: '', type: '' });

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      const userId = parsedData.userId;
      setUserId(userId);

      fetch(`https://localhost:7275/api/User/GetUserById?id=${userId}`)
        .then(response => response.json())
        .then(data => {
          setUserData({
            userName: data.data.userName,
            email: data.data.email ,
          });
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = () => {
    let hasError = false;
    const newErrors = { userName: "", email: "" };

    if (!userData.userName) {
      newErrors.userName = "Tên không được để trống.";
      hasError = true;
    }

    if (!userData.email) {
      newErrors.email = "Email không được để trống.";
      hasError = true;
    } else if (!validateEmail(userData.email)) {
      newErrors.email = "Định dạng email không hợp lệ.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    console.log("Saving user data:", userData);

    fetch(`https://localhost:7275/api/User/UpdateUser/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
      body: JSON.stringify({
        userName: userData.userName,
        email: userData.email,
        bio: "",
        imageUrl: "",
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("User updated successfully:", data);
        setAlert({ visible: true, message: 'Thông tin người dùng đã được cập nhật thành công', type: 'success' });
        
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(error => {
        console.error("Error updating user:", error);
        setAlert({ visible: true, message: 'Lỗi cập nhật thông tin người dùng', type: 'error' });
      });
  };

  const handleClose = () => {
    setAlert({ ...alert, visible: false });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Snackbar
        open={alert.visible}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={alert.type} variant="filled" sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Typography variant="h5" gutterBottom>
        Hồ sơ cá nhân
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Họ & tên"
            name="userName"
            value={userData.userName}
            variant="outlined"
            onChange={handleInputChange}
            error={!!errors.userName}
            helperText={errors.userName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={userData.email}
            variant="outlined"
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSave}>
            Lưu thông tin
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserProfile;
