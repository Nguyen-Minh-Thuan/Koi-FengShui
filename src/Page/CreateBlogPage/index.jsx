import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

export default function CreateBlogPage() {
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    elementId: "",
    content: "",
    imageUrl: null,
  });

  const [errors, setErrors] = useState({});
  const [nguHanhOptions, setNguHanhOptions] = useState([]);
  const [imageURL, setImageURL] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId) {
      setFormData((prev) => ({ ...prev, userId: user.userId }));
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

    fetchNguHanhOptions();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleQuillChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
    setErrors((prev) => ({ ...prev, content: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Vui lòng điền tiêu đề.";
    if (!formData.elementId)
      newErrors.elementId = "Vui lòng chọn mệnh ngũ hành.";
    if (!formData.content) newErrors.content = "Vui lòng nhập mô tả.";
    if (!formData.image && !formData.imageUrl)
      newErrors.imageUrl = "Vui lòng tải hình ảnh.";
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
      throw error;
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const uploadedImage = await uploadImageToFirebase(formData.image);
      const imageUrl = uploadedImage.url;
      setImageURL(imageUrl);
      setFormData((prev) => ({ ...prev, imageUrl }));

      const { image, ...sendData } = formData;

      const createBlogData = {
        userId: sendData.userId,
        title: sendData.title,
        content: sendData.content,
        statusId: 0,
        elementId: parseInt(sendData.elementId),
        imageUrl: imageUrl,
      };

      console.log("Thông tin Blog:", createBlogData);

      const response = await fetch(
        "https://localhost:7275/api/Blog/CreateBlog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createBlogData),
        }
      );

      if (response.ok) {
        console.log("Thông tin Blog đã được lưu thành công:", createBlogData);
        navigate("/");
      } else {
        const errorMessage = await response.text();
        console.error("Lỗi khi lưu quảng cáo:", errorMessage);
        alert("Có lỗi xảy ra khi lưu quảng cáo. Vui lòng kiểm tra lại.");
      }
    } catch (error) {
      console.error(
        "Error uploading image to Firebase or sending data to API:",
        error
      );
      alert(
        "Có lỗi xảy ra khi tải lên hình ảnh hoặc gửi dữ liệu. Vui lòng kiểm tra lại."
      );
    }
  };

  const renderImagePreview = () => {
    if (formData.image && formData.image instanceof File) {
      return (
        <img
          src={URL.createObjectURL(formData.image)}
          alt="Uploaded preview"
          className="w-full h-full object-cover rounded-lg"
        />
      );
    } else if (formData.imageUrl) {
      return (
        <img
          src={formData.imageUrl}
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

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <main className="flex-grow container mx-auto p-6">
        <div className="flex justify-center">
          <section className="col-span-9 w-full max-w-3xl">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-center">
                Thông tin Blog
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
                    Mệnh ngũ hành
                  </label>
                  <select
                    name="elementId"
                    value={formData.elementId}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      errors.elementId ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  >
                    <option value="">--Chọn mệnh ngũ hành--</option>
                    {nguHanhOptions.map((option) => (
                      <option key={option.elementId} value={option.elementId}>
                        {option.elementName}
                      </option>
                    ))}
                  </select>
                  {errors.elementId && (
                    <span className="text-red-500 text-sm">
                      {errors.elementId}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-black">
                  Mô tả
                </label>
                <ReactQuill
                  name="content"
                  value={formData.content}
                  onChange={handleQuillChange}
                  modules={modules}
                  className={`${
                    errors.content ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  theme="snow"
                  placeholder="Nhập mô tả quảng cáo"
                />
                {errors.content && (
                  <span className="text-red-500 text-sm">{errors.content}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-black">
                  Hình ảnh đại diện
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                    id="file-input"
                  />
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    {renderImagePreview()}
                  </label>
                  {errors.imageUrl && (
                    <span className="text-red-500 text-sm">
                      {errors.imageUrl}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                  Tạo Blog
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
