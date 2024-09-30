import React from "react";
import {
  Box,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Grid,
  Button,
} from "@mui/material";

const UserProfile = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Hồ sơ cá nhân
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Họ & tên"
            defaultValue="Nguyen Van A"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Địa chỉ"
            defaultValue=" TP.HCM"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Số điện thoại"
            defaultValue="0987654322"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            defaultValue="example@gmail.com"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Giới tính</FormLabel>
            <RadioGroup row defaultValue="female">
              <FormControlLabel value="male" control={<Radio />} label="Nam" />
              <FormControlLabel value="female" control={<Radio />} label="Nữ" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Khác"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Ngày Sinh"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Lưu thông tin
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserProfile;
