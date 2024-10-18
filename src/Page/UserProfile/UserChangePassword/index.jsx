import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Paper,
    Grid,
    Button,
    Container,
    Snackbar, // Import Snackbar
    Alert, // Import Alert
} from "@mui/material";
import NavBar from "../../../Component/NavBar";
import Footer from "../../../Component/Footer";
import UserSidebar from "../../../Component/UserSidebar";
import axios from "axios";

const UserChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        incorrectOldPassword: '',
    });
    const [alert, setAlert] = useState({ visible: false, message: '', type: '' });

    useEffect(() => {
        const storedUser = localStorage.getItem('user'); 
        if (storedUser) {
          setUser(JSON.parse(storedUser)); 
        }
      }, []);

    const handlePasswordChange = async () => {
        const newErrors = {
            oldPassword: '',
            newPassword: '',
            incorrectOldPassword: '',
        };
        let hasError = false;
      
        if (!oldPassword) {
            newErrors.oldPassword = 'Vui lòng nhập mật khẩu cũ.';
            hasError = true;
        }
      
        if (!newPassword) {
            newErrors.newPassword = 'Vui lòng nhập mật khẩu mới.';
            hasError = true;
        }
      
        setErrors(newErrors);
      
        if (hasError) return;

        try {
            const response = await axios.put("https://localhost:7275/api/User/UpdatePassword", {
                userId: user.userId,
                oldPassword: oldPassword,
                newPassword: newPassword
            });
            console.log("Password updated successfully", response.data);
            setAlert({ visible: true, message: 'Thay đổi mật khẩu thành công', type: 'success' });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    incorrectOldPassword: 'Mật khẩu cũ không chính xác',
                }));
                setAlert({ visible: true, message: 'Mật khẩu cũ không chính xác', type: 'error' });
            } else {
                console.error("Error updating password", error);
                setAlert({ visible: true, message: 'Lỗi đổi mật khẩu', type: 'error' });
            }
        }
    };

    const handleClose = () => {
        setAlert({ ...alert, visible: false });
    };

    return (
        <Box sx={{ backgroundColor: '#fafafa' }}>
            <NavBar />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Snackbar
                    open={alert.visible}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning the Snackbar
                >
                    <Alert onClose={handleClose} severity={alert.type} variant="filled" sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <UserSidebar />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box component="main" sx={{ flexGrow: 1 }}>
                            <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
                                <Typography variant="h5" gutterBottom>
                                    Đổi mật khẩu
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Mật khẩu cũ"
                                            variant="outlined"
                                            type="password" 
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            error={!!errors.oldPassword || !!errors.incorrectOldPassword}
                                            helperText={errors.oldPassword || errors.incorrectOldPassword}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Mật khẩu mới"
                                            variant="outlined"
                                            type="password" 
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            error={!!errors.newPassword}
                                            helperText={errors.newPassword}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            onClick={handlePasswordChange}
                                        >
                                            Đổi mật khẩu
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
};

export default UserChangePassword;
