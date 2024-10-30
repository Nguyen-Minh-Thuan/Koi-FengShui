import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";
import AdsCard from "../../Component/AdsCard";
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [elements, setElements] = useState([]);
  const [adsData, setAdsData] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchElements = async () => {
    try {
      const response = await fetch(
        "https://localhost:7275/api/Element/GetElement"
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.status) {
        setElements(data.data);
      }
    } catch (error) {
      console.error("Error fetching elements:", error);
    }
  };

  const fetchBlog = async () => {
    console.log("Fetching blog with ID:", id);
    try {
      const blogId = parseInt(id, 10);
      const response = await fetch(
        `https://localhost:7275/api/Blog/GetBlogById?id=${blogId}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Blog data:", data);

      if (data && data.status && data.data && data.data.blogId !== undefined) {
        setBlog(data.data);
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

  const fetchAdsData = async () => {
    try {
      if (!blog || !blog.elementId) return;
      const response = await fetch(
        `https://localhost:7275/api/Advertisement/GetRecAds?Elementid=${blog.elementId}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (data && Array.isArray(data.data)) {
        setAdsData(data.data);
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchElements();
  }, [id]);

  useEffect(() => {
    if (blog && blog.elementId) {
      fetchAdsData();
    }
  }, [blog]);

  const getElementName = (elementId) => {
    const element = elements.find((el) => el.elementId === elementId);
    return element ? element.element1 : "Unknown";
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-xl font-semibold text-red-500">{error}</h2>
        <Link
          to="/blog"
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <h6 className="text-black text-xs mb-2 flex items-center">
          <AccessTimeIcon className="mr-2 text-xs" style={{ fontSize: '0.75rem' }} />
          Ngày đăng {formatDate(blog.createdDate)}
        </h6>
        {blog ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-auto max-h-[500px] object-cover transition-transform duration-300 hover:scale-105"
              />
              <h1 className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-3xl font-bold p-4">
                {blog.title}
              </h1>
            </div>
            <div className="p-6">
              {blog && blog.elementId && (
                <div
                  className={`mb-4 p-2 border-l-4 font-semibold ${getElementName(blog.elementId) === "Kim"
                    ? "bg-gray-100 border-gray-500 text-gray-700"
                    : getElementName(blog.elementId) === "Mộc"
                      ? "bg-green-100 border-green-500 text-green-700"
                      : getElementName(blog.elementId) === "Thủy"
                        ? "bg-blue-100 border-blue-500 text-blue-700"
                        : getElementName(blog.elementId) === "Hỏa"
                          ? "bg-red-100 border-red-500 text-red-700"
                          : getElementName(blog.elementId) === "Thổ"
                            ? "bg-yellow-100 border-yellow-600 text-yellow-700"
                            : ""
                    }`}
                >
                  Mệnh: {getElementName(blog.elementId)}
                </div>
              )}

              <div
                className="text-gray-700 mb-4"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              <div>
                <h1 className="text-2xl font-bold text-center mb-6">
                  CÁC LOẠI CÁ KOI NÊN NUÔI
                </h1>
                <div className="flex flex-wrap justify-center">
                  {adsData.length > 0 ? (
                    adsData.map((ad, index) => (
                      <AdsCard
                        key={index}
                        imageUrl={ad.imageUrl}
                        title={ad.title}
                        content={ad.content}
                        link={ad.link}
                        startedDate={ad.startedDate}
                      />
                    ))
                  ) : (
                    <p className="text-center">
                      Không có quảng cáo nào Phù hợp
                    </p>
                  )}
                </div>
              </div>
              <Link
                to="/blog"
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
              >
                Quay về
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Blog not found</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlogDetailPage;
