import React, { useState, useCallback } from "react";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";
import { Link, useNavigate } from "react-router-dom";

const nguHanhOptions = [
  { value: "", label: "--Mệnh--" },
  { value: "kim", label: "Kim" },
  { value: "moc", label: "Mộc" },
  { value: "thuy", label: "Thủy" },
  { value: "hoa", label: "Hỏa" },
  { value: "tho", label: "Thổ" },
];

const FormField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  errorMessage,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-black">{label}</label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border ${
          errorMessage ? "border-red-500" : "border-gray-300"
        } rounded-md`}
        placeholder={placeholder}
        rows="4"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border ${
          errorMessage ? "border-red-500" : "border-gray-300"
        } rounded-md`}
        placeholder={placeholder}
      />
    )}
    {errorMessage && (
      <span className="text-red-500 text-sm">{errorMessage}</span>
    )}
  </div>
);

export default function CreateAdsPage() {
  const [formData, setFormData] = useState({
    title: "",
    productType: "",
    menhNguHanh: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Vui lòng điền tiêu đề.";
    if (!formData.productType)
      newErrors.productType = "Vui lòng điền loại sản phẩm.";
    if (!formData.menhNguHanh)
      newErrors.menhNguHanh = "Vui lòng chọn mệnh ngũ hành.";
    if (!formData.description) newErrors.description = "Vui lòng nhập mô tả.";
    if (!formData.image) newErrors.image = "Vui lòng tải hình ảnh.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    if (!validateForm()) {
      e.preventDefault();
      return;
    }
    console.log("Thông tin quảng cáo:", formData);
    navigate("/ads/create/package");
  };

  const renderImagePreview = () =>
    formData.image ? (
      <img
        src={URL.createObjectURL(formData.image)}
        alt="Uploaded preview"
        className="w-full h-full object-cover rounded-lg"
      />
    ) : (
      <>
        <img
          src="https://img.icons8.com/color/200/file.png"
          alt="Upload icon"
          className="h-16 w-16"
        />
        <span className="mt-2 text-base text-gray-600">
          Kéo và Thả, Tải lên hoặc Dán hình ảnh
        </span>
      </>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <main className="flex-grow container mx-auto p-6">
        <div className="flex justify-center">
          <section className="col-span-9 w-full max-w-3xl">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-center">
                Thông tin quảng cáo
              </h2>
              <FormField
                label="Tiêu đề"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Nhập tiêu đề"
                errorMessage={errors.title}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  label="Loại sản phẩm"
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  placeholder="Nhập loại sản phẩm"
                  errorMessage={errors.productType}
                />
                <div>
                  <label className="block text-sm font-medium text-black">
                    Mệnh ngũ hành
                  </label>
                  <select
                    name="menhNguHanh"
                    value={formData.menhNguHanh}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      errors.menhNguHanh ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  >
                    {nguHanhOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.menhNguHanh && (
                    <span className="text-red-500 text-sm">
                      {errors.menhNguHanh}
                    </span>
                  )}
                </div>
              </div>
              <FormField
                label="Mô tả"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Nhập mô tả"
                type="textarea"
                errorMessage={errors.description}
              />
            </div>
            <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">
                Hình ảnh sản phẩm
              </h2>
              <p className="text-sm text-gray-500 mb-4 text-center">
                Kích thước 1 ảnh tối đa 5MB
              </p>
              <div className="flex items-center justify-center w-full">
                <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100">
                  {renderImagePreview()}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
              </div>
              {errors.image && (
                <span className="text-red-500 text-sm">{errors.image}</span>
              )}
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleNext}
                  className="bg-black text-white font-bold py-2 px-6 rounded-md hover:bg-gray-800"
                >
                  Tiếp theo
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
