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
import BlogList from "../Page/AdminPage/WebManagement/Blog";
import KoiList from "../Page/AdminPage/WebManagement/KoiList";
import KoiPatternList from "../Page/AdminPage/WebManagement/KoiList/KoiPatternList";
import KoiPatternDetails from "../Page/AdminPage/WebManagement/KoiList/KoiPatternDetails";
import Dashboard from "../Page/AdminPage/Statistic/Dashboard";
import RealtimeStats from "../Page/AdminPage/Statistic/Real_time_Stats";
import PackageManage from "../Page/AdminPage/WebManagement/Package";
import PackageDetail from "../Page/AdminPage/WebManagement/Package/PackageDetail";
import FengshuiPondResult from "../Page/FengshuiPage/FenshuiGenerate/FengshuiPoundResult";
import FengshuiRecKoiResult from "../Page/FengshuiPage/FengshuiRecKoi/FengshuiRecKoiResult";
import ResultPage from "../Page/ResultPage";
import CreateBlogPage from "../Page/CreateBlogPage";
import StaffPage from "../Page/StaffPage";
import UserChangePassword from "../Page/UserProfile/UserChangePassword";
import StaffAdsDetail from "../Page/StaffPage/StaffAdsDetail";
import StaffBlogsDetail from "../Page/StaffPage/StaffBlogsDetail";
import Test from "../Page/AdminPage/Statistic/Test";

const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return { roleId: user.roleId, isLoggedIn: true };
  }
  return { roleId: null, isLoggedIn: false };
};

const ProtectedRoute = ({ element, allowedRoles, redirectPath }) => {
  const { roleId, isLoggedIn } = getCurrentUser();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(roleId)) {
    return <Navigate to={redirectPath} replace />;
  }

  return element;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AdsCard />} />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute
              element={<UserProfilePage />}
              allowedRoles={[3]}
              redirectPath="/"
            />
          }
        />

        <Route
          path="/user/ads/list"
          element={
            <ProtectedRoute
              element={<UserAdsList />}
              allowedRoles={[3]}
              redirectPath="/"
            />
          }
        />

        <Route
          path="/user/password/change"
          element={
            <ProtectedRoute
              element={<UserChangePassword />}
              allowedRoles={[3]}
              redirectPath="/"
            />
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<AdminPage />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/admin/manage"
          element={
            <ProtectedRoute
              element={<AdminPage />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/admin/adslist"
          element={
            <ProtectedRoute
              element={<AdsList />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/admin/adslist/:adsId"
          element={
            <ProtectedRoute
              element={<AdvertisementDetail />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/admin/accountlist"
          element={
            <ProtectedRoute
              element={<AccountList />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/admin/accountlist/:accountId"
          element={
            <ProtectedRoute
              element={<AccountDetail />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/admin/blog"
          element={
            <ProtectedRoute
              element={<BlogList />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/admin/packages"
          element={
            <ProtectedRoute
              element={<PackageManage />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/admin/packages/:packageId"
          element={
            <ProtectedRoute
              element={<PackageDetail />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/admin/koilist"
          element={
            <ProtectedRoute
              element={<KoiList />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/admin/koilist/:koiVarietyId"
          element={
            <ProtectedRoute
              element={<KoiPatternList />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/admin/koilist/:koiVarietyId/:koiPatternId"
          element={
            <ProtectedRoute
              element={<KoiPatternDetails />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/admin/realtime"
          element={
            <ProtectedRoute
              element={<RealtimeStats />}
              allowedRoles={[1]}
              redirectPath="/"
            />
          }
        />

        <Route
          path="/ads/create"
          element={
            <ProtectedRoute
              element={<CreateAdsPages />}
              allowedRoles={[3]}
              redirectPath="/login"
            />
          }
        />
        <Route
          path="/ads/create/package"
          element={
            <ProtectedRoute
              element={<AdsPackagePage />}
              allowedRoles={[3]}
              redirectPath="/login"
            />
          }
        />

        <Route path="/ads/product/:id" element={<AdsDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/detail/:id" element={<BlogDetailPage />} />
        <Route path="/blog/create" element={<CreateBlogPage />} />
        <Route path="/ads/product" element={<AdsPage />} />

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
        <Route path="/ads/create/package/payment" element={<PaymentPage />} />
        <Route path="/ads/create/package/result" element={<ResultPage />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route
          path="/staff/adslist"
          element={
            <ProtectedRoute
              element={<StaffPage />}
              allowedRoles={[2]}
              redirectPath="/"
            />
          }
        />
        <Route
          path="/staff/bloglist/:id"
          element={
            <ProtectedRoute
              element={<StaffBlogsDetail />}
              allowedRoles={[2]}
              redirectPath="/"
            />
          }
        />

        <Route
          path="/staff/adslist/:adsId"
          element={
            <ProtectedRoute
              element={<StaffAdsDetail />}
              allowedRoles={[2]}
              redirectPath="/"
            />
          }
        />

      <Route path="/admin/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
