import React, { useState, useCallback, useReducer } from "react";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";
import { Link, useNavigate } from "react-router-dom";

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const initialState = {
  adType: "",
  startTime: "",
  duration: null,
  quantity: 0,
};

const feePerDay = {
  "Tin thường": 5000,
  "Tin VIP": 12000,
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
  const [fee, setFee] = useState(0);
  const navigate = useNavigate();

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
    setFee(feePerDay[type]);
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

  const calculateTotal = (days) => {
    const discount = days === 15 ? 0.9 : days === 30 ? 0.8 : 1;
    return fee * days * formData.quantity * discount;
  };

  const handleSubmit = () => {
    console.log("Cấu hình tin đăng:", formData);
    navigate("/ads/create/package/payment");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <main className="flex-grow container mx-auto p-6 flex justify-center">
        <main className="col-span-9 w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Cấu hình tin đăng
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {["Tin thường", "Tin VIP"].map((type) => (
                <div
                  key={type}
                  className={`p-4 border-2 ${
                    formData.adType === type
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  } rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-200`}
                  onClick={() => handleAdTypeChange(type)}
                >
                  <h3 className="text-base font-semibold text-gray-700 mb-1">
                    {type}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Giá: {feePerDay[type].toLocaleString()} đ/ngày
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
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[5, 15, 30].map((days) => (
                  <div
                    key={days}
                    className={`p-4 border-2 ${
                      formData.duration === days
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    } rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-200`}
                    onClick={() =>
                      dispatch({
                        type: "SET_FIELD",
                        field: "duration",
                        value: days,
                      })
                    }
                  >
                    <h3 className="text-base font-semibold text-gray-700 mb-1">
                      {days} ngày
                    </h3>
                    <p className="text-sm text-gray-500">
                      {calculateTotal(days).toLocaleString()} đ
                    </p>
                  </div>
                ))}
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
                  {calculateTotal(formData.duration || 0).toLocaleString()} đ
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
        </main>
      </main>
      <Footer />
    </div>
  );
};

export default AdsPackagePage;
