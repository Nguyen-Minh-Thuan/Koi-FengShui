import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUbHsFkFAA3cxKZh0oLNk0qrKu-IbK0q4",
  authDomain: "koi-fengshui.firebaseapp.com",
  projectId: "koi-fengshui",
  storageBucket: "koi-fengshui.appspot.com",
  messagingSenderId: "127460409250",
  appId: "1:127460409250:web:db111b8e3f9723e1647cfb",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function CreateAdsPage() {
  const [formData, setFormData] = useState({
    userID: "",
    adsTypeId: "",
    title: "",
    content: "",
    packageId: null,
    elementId: "",
    imageUrl: null,
    colorId: "",
    startedDate: null,
  });

  const [errors, setErrors] = useState({});
  const [nguHanhOptions, setNguHanhOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [productTypeOptions, setProductTypeOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId) {
      setFormData((prev) => ({ ...prev, userID: user.userId }));
    }

    const fetchNguHanhOptions = async () => {
      try {
        const response = await fetch(
          "https://localhost:7275/api/Element/GetElement"
        );
        const getData = await response.json();
        setNguHanhOptions(getData.data);
      } catch (error) {
        console.error("Error fetching ngu hanh options:", error);
      }
    };

    const fetchColorOptions = async () => {
      try {
        const response = await fetch(
          "https://localhost:7275/api/Color/GetColor"
        );
        const getData = await response.json();
        setColorOptions(getData.data);
      } catch (error) {
        console.error("Error fetching color options:", error);
      }
    };

    const fetchProductTypeOptions = async () => {
      try {
        const response = await fetch(
          "https://localhost:7275/api/Advertisement/GetAll/"
        );
        const getData = await response.json();

        const uniqueTypes = {};

        getData.data.forEach((item) => {
          const typeName = item.adsType.typeName;

          if (!uniqueTypes[typeName]) {
            uniqueTypes[typeName] = item.adsType.adsTypeId;
          }
        });

        const types = Object.entries(uniqueTypes).map(([name, id]) => ({
          typeName: name,
          adsTypeId: id,
        }));

        setProductTypeOptions(types);
      } catch (error) {
        console.error("Error fetching product type options:", error);
      }
    };

    fetchNguHanhOptions();
    fetchColorOptions();
    fetchProductTypeOptions();
  }, []);

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
      newErrors.productType = "Vui lòng chọn loại sản phẩm.";
    if (!formData.elementId)
      newErrors.menhNguHanh = "Vui lòng chọn mệnh ngũ hành.";
    if (!formData.color) newErrors.color = "Vui lòng chọn màu sắc.";
    if (!formData.description) newErrors.description = "Vui lòng nhập mô tả.";
    if (!formData.image) newErrors.image = "Vui lòng tải hình ảnh.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImageToFirebase = async (imageFile) => {
    const storageRef = ref(
      storage,
      `images/${encodeURIComponent(imageFile.name)}`
    );
    try {
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      return {
        name: imageFile.name,
        url: downloadURL,
      };
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên Firebase:", error);
      throw error; // Ném lỗi để xử lý sau
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Tải hình ảnh lên Firebase
      const { name, url } = await uploadImageToFirebase(formData.image);
      setFormData((prev) => ({ ...prev, image: { name, url } }));

      console.log("Dữ liệu đã được gửi thành công!");
      navigate("/ads/create/package"); // Chuyển hướng đến trang tiếp theo
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
      alert("Có lỗi xảy ra khi tải lên hình ảnh. Vui lòng kiểm tra lại.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const { name, url } = await uploadImageToFirebase(formData.image);
      setFormData((prev) => ({ ...prev, image: { name, url } }));

      console.log("Thông tin quảng cáo (save):", formData);
      navigate("/");
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
      alert("Có lỗi xảy ra khi tải lên hình ảnh. Vui lòng kiểm tra lại.");
    }
  };

  const renderImagePreview = () => {
    // Kiểm tra nếu formData.image là một đối tượng Blob
    if (formData.image && formData.image instanceof Blob) {
      return (
        <img
          src={URL.createObjectURL(formData.image)}
          alt="Uploaded preview"
          className="w-full h-full object-cover rounded-lg"
        />
      );
    } else {
      return (
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
    }
  };

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
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="Nhập tiêu đề"
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-black">
                    Loại sản phẩm
                  </label>
                  <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      errors.productType ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  >
                    <option value="">--Chọn loại sản phẩm--</option>
                    {productTypeOptions.map((option) => (
                      <option key={option.adsTypeId} value={option.adsTypeId}>
                        {option.typeName}
                      </option>
                    ))}
                  </select>

                  {errors.productType && (
                    <span className="text-red-500 text-sm">
                      {errors.productType}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">
                    Mệnh ngũ hành
                  </label>
                  <select
                    name="elementId"
                    value={formData.elementId}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      errors.menhNguHanh ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  >
                    <option value="">--Chọn mệnh--</option>
                    {nguHanhOptions.map((option) => (
                      <option key={option.elementId} value={option.elementId}>
                        {option.element1}
                      </option>
                    ))}
                  </select>
                  {errors.menhNguHanh && (
                    <span className="text-red-500 text-sm">
                      {errors.menhNguHanh}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">
                    Màu sắc
                  </label>
                  <select
                    name="colorId"
                    value={formData.colorId}
                    onChange={(e) => {
                      const selectedColorId = e.target.value;
                      const selectedColorName =
                        e.target.options[e.target.selectedIndex].text;

                      setFormData((prev) => ({
                        ...prev,
                        colorId: selectedColorId,
                        color: selectedColorName,
                      }));
                    }}
                    className={`w-full p-2 border ${
                      errors.colorId ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  >
                    <option value="">--Chọn màu sắc--</option>
                    {colorOptions.map((option) => (
                      <option key={option.colorId} value={option.colorId}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  {errors.color && (
                    <span className="text-red-500 text-sm">{errors.color}</span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-black">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  placeholder="Nhập mô tả"
                  rows="4"
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description}
                  </span>
                )}
              </div>
            </div>
            <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">
                Hình ảnh sản phẩm
              </h2>
              <div className="flex items-center justify-center w-full">
                <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100">
                  {renderImagePreview()}
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.image && (
                <span className="text-red-500 text-sm">{errors.image}</span>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Tiếp theo
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
