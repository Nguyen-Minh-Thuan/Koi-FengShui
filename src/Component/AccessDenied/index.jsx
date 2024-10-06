import React from "react";
import { Container, Typography, Button } from "@mui/material";

const AccessDenied = () => {
  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h1" color="error">
        403 - Không có quyền truy cập
      </Typography>
      <Typography variant="body1" style={{ margin: "20px 0" }}>
        Xin lỗi, bạn không có quyền truy cập vào trang này.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Quay lại trang chủ
      </Button>
    </Container>
  );
};

export default AccessDenied;