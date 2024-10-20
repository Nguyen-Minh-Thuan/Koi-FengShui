import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import AccessDenied from "../Component/AccessDenied";
import PaymentPage from "../Page/PaymentPage";
import AdminPage from "../Page/AdminPage/WebManagement/AdsList";
import AdsList from "../Page/AdminPage/WebManagement/AdsList";
import AdvertisementDetail from "../Page/AdminPage/WebManagement/AdsList/AdsDetail";
import AccountList from "../Page/AdminPage/WebManagement/AccountList";
import AccountDetail from "../Page/AdminPage/WebManagement/AccountList/AccountDetail";
import BlogList from '../Page/AdminPage/WebManagement/Blog'
import KoiList from "../Page/AdminPage/WebManagement/KoiList";
import PackageManage from '../Page/AdminPage/WebManagement/Package'
import PackageDetail from '../Page/AdminPage/WebManagement/Package/PackageDetail'
import FengshuiPondResult from "../Page/FengshuiPage/FenshuiGenerate/FengshuiPoundResult";
import FengshuiRecKoiResult from "../Page/FengshuiPage/FengshuiRecKoi/FengshuiRecKoiResult";

const AppRouter = () => {
  const storageUser = localStorage.getItem("user");
  const user = storageUser ? JSON.parse(storageUser) : null;
  const role = user ? user.role : null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AdsCard />} />

        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/user/ads/list" element={<UserAdsList />} />
        <Route path="/ads/product/:id" element={<AdsDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/detail/:id" element={<BlogDetailPage />} />
        <Route path="/ads/product" element={<AdsPage />} />
        <Route path="/ads/create" element={<CreateAdsPages />} />
        <Route path="/ads/create/package" element={<AdsPackagePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/fengshui" element={<FengshuiPage />} />
        <Route
          path="/fengshui/point/result"
          element={<FengshuiPointResult />}
        />
        <Route path="/fengshui/pond/result" element={<FengshuiPondResult />} />
        <Route
          path="/fengshui/reckoi/result"
          element={<FengshuiRecKoiResult />}
        />
        <Route
          path="/admin/manage"
          element={role === 1 ? <AdminPage /> : <AccessDenied />}
        />
        <Route path="/ads/create/package/payment" element={<PaymentPage />} />

        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/adslist" element={<AdsList />} />
        <Route path="/admin/adslist/:adsId" element={<AdvertisementDetail/>} />
        <Route path="/admin/accountlist" element={<AccountList />} />
        <Route path="/admin/accountlist/:accountId" element={<AccountDetail />} />
        <Route path="/admin/blog" element={<BlogList />} />
        <Route path="/admin/packages" element={<PackageManage />} />
        <Route path="/admin/packages/:packageId" element={<PackageDetail/>} />
        <Route path="/admin/koilist" element={<KoiList/>} />

        <Route path="/ads/create/package/payment" element={<PaymentPage />} />

        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
