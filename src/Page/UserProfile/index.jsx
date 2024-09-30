import React from "react";
import { Box, Grid, Container } from "@mui/material";
import UserSidebar from "../../Component/UserSidebar";
import UserProfile from "./UserInfo";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";

const UserProfilePage = () => {
  return (
    <Box sx={{ backgroundColor: "#fafafa" }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <UserSidebar />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box component="main" sx={{ flexGrow: 1 }}>
              <UserProfile />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default UserProfilePage;
