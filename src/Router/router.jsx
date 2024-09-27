import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../Page/Home";
import AdsCard from "../Component/AdsCard";
import UserProfilePage from "../Page/UserProfile";
import AdsPage from "../Page/AdsPage";
import AdsPackagePage from "../Page/AdsPackagePage";
import CreateAdsPages from "../Page/CreateAdsPage";
import AdminPage from "../Page/AdminPage"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AdsCard />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/ads/product" element={<AdsPage />} />
        <Route path="/ads/create" element={<CreateAdsPages />} />
        <Route path="/ads/create/package" element={<AdsPackagePage />} />
        <Route path="/admin" element={<AdminPage />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
