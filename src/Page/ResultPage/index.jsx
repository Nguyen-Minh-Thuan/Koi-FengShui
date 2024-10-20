import React from "react";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function ResultPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-gray-50">
        <CheckCircleIcon className="h-16 w-16 text-green-500" />
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">
          Thanh toán thành công!
        </h1>
        <p className="text-gray-600 mt-2">Cảm ơn bạn đã thanh toán.</p>
        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          onClick={() => (window.location.href = "/")}
        >
          Về trang chủ
        </button>
      </div>
      <Footer />
    </div>
  );
}
