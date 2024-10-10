import React, { useState, useCallback, useReducer, useEffect } from "react";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";
import { Link, useNavigate } from "react-router-dom";

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

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

const AdsPackagePage = () => {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [duration, setDuration] = useState(0);
  const [fee, setFee] = useState(0);
  const [adPackages, setAdPackages] = useState([]);
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

  const handleChange = useCallback(
    ({ target: { name, value, type, files } }) => {
      dispatch({
        type: "SET_FIELD",
        field: name,
        value: type === "file" ? files[0] : value,
      });
    },
    []
  );

  const handleAdTypeChange = (type) => {
    dispatch({ type: "SET_FIELD", field: "adType", value: type });
    const selectedPackage = adPackages.find((pkg) => pkg.packageName === type);
    if (selectedPackage) {
      setFee(selectedPackage.price);
      setDuration(selectedPackage.duration);
    }
  };

  const updateStartTime = (date, time) => {
    dispatch({
      type: "SET_FIELD",
      field: "startTime",
      value: `${date}T${time}`,
    });
  };

  const handleDateChange = (e) =>
    updateStartTime(e.target.value, formData.startTime.split("T")[1]);

  const handleTimeChange = (e) =>
    updateStartTime(formData.startTime.split("T")[0], e.target.value);

  const handleQuantityChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: "quantity",
      value: Number(e.target.value),
    });
  };

  const calculateTotal = () => {
    const total = fee * duration * formData.quantity;

    if (formData.quantity >= 6) {
      return total * 0.7;
    } else if (formData.quantity >= 4) {
      return total * 0.8;
    } else if (formData.quantity >= 2) {
      return total * 0.9;
    }

    return total;
  };

  const handleSubmit = () => {
    console.log("Cấu hình tin đăng:", { ...formData });
    navigate("/ads/create/package/payment");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <main className="flex-grow container mx-auto p-6 flex justify-center">
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
                    {pkg.price.toLocaleString()} đ/ngày
                  </p>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-lg text-gray-700">
                Chọn thời gian tin đăng
              </label>
              <div className="flex items-center mb-4">
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleDateChange}
                  name="startTime"
                />
                <select
                  onChange={handleTimeChange}
                  className="ml-4 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn giờ</option>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
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
            <Link to="/ads/create">
              <button className="bg-gray-700 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200">
                Quay lại
              </button>
            </Link>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors duration-200"
            >
              Thanh toán và đăng tin
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdsPackagePage;
