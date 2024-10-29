import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StaffHeader from "../../../Component/StaffHeader";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUbHsFkFAA3cxKZh0oLNk0qrKu-IbK0q4",
  authDomain: "koi-fengshui.firebaseapp.com",
  projectId: "koi-fengshui",
  storageBucket: "koi-fengshui.appspot.com",
  messagingSenderId: "127460409250",
  appId: "1:127460409250:web:db111b8e3f9723e1647cfb",
};

initializeApp(firebaseConfig);
const storage = getStorage();

const StaffBlogsDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [elements, setElements] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    elementId: "",
    content: "",
    image: null,
    imageUrl: null,
    blogId: 0,
  });
  const [errors, setErrors] = useState({});
  const [imageURL, setImageURL] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch(
          "https://localhost:7275/api/Element/GetElement"
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        if (data?.status) setElements(data.data);
      } catch (error) {
        console.error("Error fetching elements:", error);
      }
    };

    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://localhost:7275/api/Blog/GetBlogById?id=${id}`
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        if (data?.status && data.data) {
          setBlog(data.data);
          setFormData((prev) => ({
            ...prev,
            title: data.data.title,
            elementId: data.data.elementId,
            content: data.data.content,
            imageUrl: data.data.imageUrl,
            blogId: data.data.blogId,
          }));
          setImageURL(data.data.imageUrl);
        } else {
          setError("Blog not found or it may have been deleted.");
        }
      } catch (error) {
        setError("Error fetching blog details");
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchElements();
    fetchBlog();
  }, [id]);

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
    if (!formData.imageUrl) newErrors.imageUrl = "Vui lòng tải hình ảnh.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImageToFirebase = async (imageFile) => {
    const storageRef = ref(
      storage,
      `images/${encodeURIComponent(imageFile.name)}`
    );
    await uploadBytes(storageRef, imageFile);
    return await getDownloadURL(storageRef);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let imageUrl = formData.imageUrl;
      if (formData.image) {
        imageUrl = await uploadImageToFirebase(formData.image);
      }

      const updateBlogData = {
        userId: formData.userId,
        title: formData.title,
        content: formData.content,
        statusId: 0,
        elementId: parseInt(formData.elementId),
        imageUrl,
        blogId: formData.blogId,
      };

      let token = localStorage.getItem("token");
      token = token.replace(/^"|"$/g, "");

      const response = await fetch(
        "https://localhost:7275/api/Blog/UpdateBlog",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
          
          body: JSON.stringify(updateBlogData),
        }
      );

      if (response.ok) {
        navigate("/staff/adslist");
      } else {
        const errorMessage = await response.text();
        alert("Có lỗi xảy ra khi cập nhật blog: " + errorMessage);
      }
    } catch (error) {
      alert(
        "Có lỗi xảy ra khi tải lên hình ảnh hoặc gửi dữ liệu. Vui lòng kiểm tra lại."
      );
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      try {
        let token = localStorage.getItem("token");
        token = token.replace(/^"|"$/g, "");
        const response = await fetch(
          `https://localhost:7275/api/Blog/DeleteBlog?id=${id}`,
          {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}`, },
          }
        );

        if (response.ok) {
          alert("Xóa bài viết thành công!");
          navigate("/staff/adslist");
        } else {
          const errorMessage = await response.text();
          alert("Có lỗi xảy ra khi xóa bài viết: " + errorMessage);
        }
      } catch (error) {
        alert("Có lỗi xảy ra khi gọi API xóa bài viết.");
        console.error("Error:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const renderImagePreview = () => {
    if (formData.image) {
      return (
        <img
          src={URL.createObjectURL(formData.image)}
          alt="Uploaded preview"
          className="w-full h-48 object-cover rounded-lg mb-2"
          style={{ objectFit: "contain" }}
        />
      );
    } else if (imageURL) {
      return (
        <img
          src={imageURL}
          alt="Uploaded preview"
          className="w-full h-full object-cover rounded-lg mb-2"
          style={{ objectFit: "contain" }}
        />
      );
    }
    return (
      <div className="flex flex-col items-center mb-2">
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <StaffHeader />
      <main className="flex-grow container mx-auto p-6">
        <div className="flex justify-center">
          <section className="col-span-9 w-full max-w-3xl">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-center">
                Thông tin Blog
              </h2>
              <form onSubmit={handleUpdate}>
                <InputField
                  label="Tiêu đề"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={errors.title}
                />
                <SelectField
                  label="Mệnh Ngũ Hành"
                  name="elementId"
                  value={formData.elementId}
                  onChange={handleChange}
                  options={elements}
                  error={errors.elementId}
                />
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Nội dung</label>
                  <ReactQuill
                    value={formData.content}
                    onChange={handleQuillChange}
                    modules={modules}
                    className={`border ${
                      errors.content ? "border-red-500" : "border-gray-300"
                    } rounded`}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm">{errors.content}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Hình ảnh</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className={`block w-full text-sm border ${
                      errors.imageUrl ? "border-red-500" : "border-gray-300"
                    } rounded`}
                  />
                  {renderImagePreview()}
                  {errors.imageUrl && (
                    <p className="text-red-500 text-sm">{errors.imageUrl}</p>
                  )}
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                  <div>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`block w-full border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded p-2`}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-1" htmlFor={name}>
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`block w-full border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded p-2`}
    >
      <option value="">Chọn mệnh ngũ hành</option>
      {options.map((element) => (
        <option key={element.elementId} value={element.elementId}>
          {element.element1}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default StaffBlogsDetail;
