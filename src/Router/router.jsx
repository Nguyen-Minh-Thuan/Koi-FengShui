import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../Page/Home";
import AdsCard from "../Component/AdsCard";
import UserProfilePage from "../Page/UserProfile";
import AdsPage from "../Page/AdsPage";
import AdsPackagePage from "../Page/AdsPackagePage";
import CreateAdsPages from "../Page/CreateAdsPage";
import UserAdsList from "../Page/UserProfile/UserAdsManage";
import AdsDetailPage from "../Page/AdsDetailPage";
import BlogPage from "../Page/BlogPage";
import BlogDetailPage from "../Page/BlogDetailPage";
import LoginForm from "../Page/Authen/LoginForm";
import RegisterForm from "../Page/Authen/RegisterForm";
import FengshuiPage from "../Page/FengshuiPage";
import FengshuiPointResult from "../Page/FengshuiPage/FengshuiPoint/FengshuiPointResult";
import AdminPage from "../Page/AdminPage";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AdsCard />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/user/ads/list" element={<UserAdsList />} />
        <Route path="/ads/product/:id" element={<AdsDetailPage/>} />
        <Route path="/blog" element={<BlogPage/>} />
        <Route path="/blog/detail/:id" element={<BlogDetailPage />} />
        <Route path="/ads/product" element={<AdsPage />} />
        <Route path="/ads/create" element={<CreateAdsPages />} />
        <Route path="/ads/create/package" element={<AdsPackagePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/fengshui" element={<FengshuiPage />} />
        <Route path="/fengshui/point/result" element={<FengshuiPointResult />} />
        <Route path="/admin/manage" element={<AdminPage/>} />

        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
