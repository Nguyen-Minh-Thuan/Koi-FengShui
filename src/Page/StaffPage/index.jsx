import { useEffect, useState, useCallback } from "react";
import StaffHeader from "../../Component/StaffHeader";
import api from "../../Config/axios";
import { DataGrid } from "@mui/x-data-grid";
import StaffSidebar from "../../Component/StaffSideBar";
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

const CreateBlogPage = () => {
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

      let token = localStorage.getItem("token");
      token = token.replace(/^"|"$/g, "");

      const response = await fetch(
        "https://localhost:7275/api/Blog/CreateBlog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(createBlogData),
        }
      );

      if (response.ok) {
        console.log("Thông tin Blog đã được lưu thành công:", createBlogData);
        window.location.reload();
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
    <main className="bg-white shadow-lg rounded-lg border-2 p-6 my-14 mr-10">
      <div className="flex justify-center">
        <section className="col-span-9 w-full max-w-3xl">
          <h2 className="text-xl font-bold mb-6 text-center">Thông tin Blog</h2>
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
                    {option.element1}
                  </option>
                ))}
              </select>
              {errors.elementId && (
                <span className="text-red-500 text-sm">{errors.elementId}</span>
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
                <span className="text-red-500 text-sm">{errors.imageUrl}</span>
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
        </section>
      </div>
    </main>
  );
};

const Index = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [filteredAdvertisements, setFilteredAdvertisements] = useState([]);
  const [activeTab, setActiveTab] = useState("advertisements");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await api.get(
          "https://localhost:7275/api/Advertisement/GetAll"
        );
        if (response.data) {
          setAdvertisements(response.data.data);
          setFilteredAdvertisements(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get(
          "https://localhost:7275/api/Blog/GetAll"
        );
        if (response.data) {
          setBlogs(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const columns = [
    { field: "title", headerName: "Title", width: 250 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "packageName", headerName: "Package", width: 150 },
    { field: "startedDate", headerName: "Post Time", width: 150 },
    { field: "expiredDate", headerName: "Time Expired", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <button
          className="bg-blue-600 text-white rounded px-2 py-1 text-sm hover:bg-blue-700 transition duration-300"
          onClick={() => navigate(`/staff/adslist/${params.row.id}`)}
        >
          Detail
        </button>
      ),
    },
  ];

  const blogColumns = [
    { field: "title", headerName: "Title", width: 560 },
    { field: "createdDate", headerName: "Created Date", width: 150 },
    { field: "isActive", headerName: "Active Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <button
          className="bg-blue-600 text-white rounded px-2 py-1 text-sm hover:bg-blue-700 transition duration-300"
          onClick={() => navigate(`/staff/bloglist/${params.row.id}`)}
        >
          Detail
        </button>
      ),
    },
  ];

  const rows = advertisements.map((ad) => ({
    id: ad.adsId,
    title: ad.title,
    status: ad.status.status1,
    packageName: ad.packageId === 1 ? "Normal package" : "Exclusive package",
    startedDate: ad.startedDate
      ? new Date(ad.startedDate).toLocaleDateString()
      : "Not Started",
    expiredDate: ad.expiredDate
      ? new Date(ad.expiredDate).toLocaleDateString()
      : "Not Started",
    originalAd: ad,
  }));

  const blogRows = blogs.map((blog) => ({
    id: blog.blogId,
    title: blog.title,
    createdDate: new Date(blog.createdDate).toLocaleDateString(),
    isActive: blog.isActive ? "Active" : "Inactive",
    originalBlog: blog,
  }));

  return (
    <>
      <StaffHeader />
      <div className="flex mx-auto" style={{ backgroundColor: "#F5F7F9" }}>
        <StaffSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="w-3/4">
          <div className="gap-8">
            {activeTab === "advertisements" && (
              <div
                id="advertisements"
                className="bg-white shadow-lg rounded-lg border-2 p-6 my-14 mr-10"
              >
                <h3 className="text-2xl font-semibold mb-4">Advertisements</h3>

                <div style={{ height: 500, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    onPageSizeChange={(newPageSize) =>
                      setRowsPerPage(newPageSize)
                    }
                    pagination
                    page={page}
                    onPageChange={(newPage) => setPage(newPage)}
                  />
                </div>
              </div>
            )}
            {activeTab === "blogs" && (
              <div className="bg-white shadow-lg rounded-lg border-2 p-6 my-14 mr-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold">Blogs</h3>
                  <button
                    className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition duration-300"
                    onClick={() => setActiveTab("createblogs")}
                  >
                    Create Blog
                  </button>
                </div>
                <div style={{ height: 500, width: "100%" }}>
                  <DataGrid
                    rows={blogRows}
                    columns={blogColumns}
                    pageSize={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    onPageSizeChange={(newPageSize) =>
                      setRowsPerPage(newPageSize)
                    }
                    pagination
                    page={page}
                    onPageChange={(newPage) => setPage(newPage)}
                  />
                </div>
              </div>
            )}
            {activeTab === "createblogs" && <CreateBlogPage />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
