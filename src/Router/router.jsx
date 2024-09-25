import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../Page/Home';
import AdsCard from '../Component/AdsCard';
import UserProfilePage from '../Page/UserProfile';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AdsCard />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
