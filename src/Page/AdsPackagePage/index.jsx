import React, { useState, useCallback, useReducer } from "react";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";
import { Link } from "react-router-dom";

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const initialState = {
  title: "",
  productType: "",
  menhNguHanh: "",
  description: "",
  image: null,
  adType: "",
  startTime: "",
  duration: null,
};

const feeMap = {
  "Tin thường": 4999,
  "Tin VIP": 14999,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_ERRORS":
      return { ...state, errors: {} };
    default:
      return state;
  }
};

const AdsPackagePage = () => {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({});
  const [fee, setFee] = useState(0);

  const handleChange = useCallback(
    ({ target: { name, value, type, files } }) => {
      dispatch({
        type: "SET_FIELD",
        field: name,
        value: type === "file" ? files[0] : value,
      });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const handleAdTypeChange = (type) => {
    dispatch({ type: "SET_FIELD", field: "adType", value: type });
    setFee(feeMap[type]);
  };

  const handleDurationChange = (duration) => {
    dispatch({ type: "SET_FIELD", field: "duration", value: duration });
  };

  const handleTimeChange = (e) => {
    dispatch({ type: "SET_FIELD", field: "startTime", value: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(initialState).forEach((key) => {
      if (!formData[key]) newErrors[key] = `${key} là bắt buộc.`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log("Proceed to the next step");
    }
  };

  const renderImagePreview = () =>
    formData.image ? (
      <img
        src={URL.createObjectURL(formData.image)}
        alt="Uploaded preview"
        className="w-full h-full object-cover rounded-lg"
      />
    ) : (
      <div className="flex flex-col items-center">
        <img
          src="https://img.icons8.com/color/200/file.png"
          alt="Upload icon"
          className="h-16 w-16"
        />
        <span className="mt-2 text-base text-gray-600">
          Kéo và Thả, Tải lên hoặc Dán hình ảnh
        </span>
      </div>
    );

  const totalAmount = fee * (formData.duration || 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <main className="flex-grow container mx-auto p-6 grid grid-cols-12 gap-6">
        

        <main className="col-span-9 bg-white p-6 rounded-lg shadow-lg">
          <section>
            <h2 className="text-xl font-semibold mb-6">Cấu hình tin đăng</h2>

            <div className="flex mb-6">
              {Object.keys(feeMap).map((type) => (
                <div
                  key={type}
                  className={`flex-1 p-4 border-2 ${
                    formData.adType === type
                      ? "border-blue-400 bg-blue-100"
                      : "border-gray-300"
                  } rounded-lg cursor-pointer`}
                  onClick={() => handleAdTypeChange(type)}
                >
                  <h3 className="text-lg font-semibold mb-2">{type}</h3>
                  <p className="text-gray-600">
                    từ {feeMap[type].toLocaleString()} đ/ngày
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold">
                Chọn thời gian tin đăng
              </label>
              <div className="flex items-center mb-4">
                <input
                  type="date"
                  className="border p-2 rounded-lg w-full"
                  onChange={handleChange}
                />
                <select
                  value={formData.startTime}
                  onChange={handleTimeChange}
                  className="ml-4 border p-2 rounded-lg"
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex">
                {[10, 15, 30].map((days) => (
                  <button
                    key={days}
                    className={`px-4 py-2 border rounded-lg mr-2 ${
                      formData.duration === days
                        ? "bg-blue-100 border-blue-400"
                        : ""
                    }`}
                    onClick={() => handleDurationChange(days)}
                  >
                    {days} ngày
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-6">Thanh toán</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between mb-4">
                <span>Loại tin</span>
                <span>{formData.adType || "Chưa chọn"}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Phí đăng tin</span>
                <span>{fee.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Tổng tiền</span>
                <span>{totalAmount.toLocaleString()} đ</span>
              </div>
            </div>
          </section>

          <div className="flex justify-between mt-6">
            <Link to="/ads/create">
              <button className="bg-black text-white font-bold py-2 px-6 rounded-md hover:bg-gray-800">
                Quay lại
              </button>
            </Link>
            <button
              className="bg-orange-500 text-white px-6 py-2 rounded-lg"
              onClick={handleNext}
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
