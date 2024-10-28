import React, { useState, useReducer, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const initialState = {
  adType: "",
  startTime: "",
  quantity: 0,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const ChoosePackagePage = ({ adsId, adsTypeId, userId, title, content, elementId, imageUrl, onClose }) => {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [duration, setDuration] = useState(0);
  const [fee, setFee] = useState(0);
  const [adPackages, setAdPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null); // Add state for packageId
  const location = useLocation();
  const navigate = useNavigate();

  const fetchAdPackages = async () => {
    try {
      const response = await fetch(
        "https://localhost:7275/api/Advertisement/GetPackage"
      );
      const data = await response.json();
      setAdPackages(data.data);
    } catch (error) {
      console.error("Error fetching ad packages:", error);
    }
  };

  useEffect(() => {
    fetchAdPackages();
  }, []);

  const handleAdTypeChange = (type) => {
    dispatch({ type: "SET_FIELD", field: "adType", value: type });
    const selectedPackage = adPackages.find((pkg) => pkg.packageName === type);
    if (selectedPackage) {
      setFee(selectedPackage.price);
      setDuration(selectedPackage.duration);
      setSelectedPackageId(selectedPackage.packageId); // Set the packageId
    }
  };

  const handleQuantityChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: "quantity",
      value: Number(e.target.value),
    });
  };

  const calculateTotal = () => {
    const total = fee * formData.quantity;
    return total;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const paymentData = {
      adsId,
      adsTypeId,
      userId,
      title,
      content,
      elementId,
      imageUrl,
      quantity: formData.quantity,
      packageId: selectedPackageId, // Include packageId in paymentData
    };

    console.log("Dữ liệu thanh toán:", paymentData);

    try {
      const apiUrl = `https://localhost:7275/api/Advertisement/CreatePayment`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        const result = await response.json();
        const paymentLink = result.data;
        window.location.href = paymentLink;
        navigate("/user/ads/list");

        console.log("Dữ liệu đã được gửi thành công:", paymentData);

      } else {
        const errorMessage = await response.text();
        console.error("Gửi dữ liệu thất bại:", errorMessage);
        alert("Gửi dữ liệu thất bại: " + errorMessage);
      }
    } catch (error) {
      console.error("Lỗi trong quá trình gửi dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  function LoadingPopup() {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
          <div className="loader mb-4" />
          <span className="text-lg font-medium text-gray-700">
            Đang xử lý...
          </span>
        </div>
        <style>{`
          .loader {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-top-color: #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Cấu hình tin đăng
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {adPackages.map((pkg) => (
            <div
              key={pkg.packageId}
              className={`p-4 border-2 ${
                formData.adType === pkg.packageName
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              } rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-200`}
              onClick={() => handleAdTypeChange(pkg.packageName)}
            >
              <h3 className="text-base font-semibold text-gray-700 mb-1">
                {pkg.packageName}
              </h3>
              <p className="text-sm text-gray-500">
                Thời gian: {pkg.duration} ngày - Giá:{" "}
                {pkg.price.toLocaleString()}VNĐ
              </p>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-sm text-gray-700">
              Số lượng
            </label>
            <input
              type="number"
              min="0"
              value={formData.quantity}
              onChange={handleQuantityChange}
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Thanh toán
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          <div className="flex justify-between mb-3">
            <span className="text-gray-700">Loại tin</span>
            <span className="text-gray-900 font-semibold">
              {formData.adType || "Chưa chọn"}
            </span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-700">Phí đăng tin</span>
            <span className="text-gray-900 font-semibold">
              {fee.toLocaleString()} đ/ngày
            </span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span className="text-gray-800">Tổng tiền</span>
            <span className="text-gray-900">
              {calculateTotal().toLocaleString() || 0} đ
            </span>
          </div>
        </div>
      </section>
      <div className="flex justify-between mt-6">
      <button
          onClick={onClose}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200"
        >
          Hủy
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors duration-200"
        >
          Thanh toán và đăng tin
        </button>
        
      </div>
      {loading && <LoadingPopup />}
    </div>
  );
};

export default ChoosePackagePage;