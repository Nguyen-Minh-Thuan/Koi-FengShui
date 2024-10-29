import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState("");

  useEffect(() => {
    fetch("https://localhost:7275/api/Blog/GetAll")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setBlogs(data.data);
          setFilteredBlogs(data.data);
        } else {
          console.error("Invalid data format from API");
        }
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  useEffect(() => {
    fetch("https://localhost:7275/api/Element/GetElement")
      .then((response) => response.json())
      .then((result) => {
        if (result.status && Array.isArray(result.data)) {
          setElements(result.data);
        } else {
          console.error("Error: Invalid data format from API");
        }
      })
      .catch((error) => console.error("Error fetching elements:", error));
  }, []);

  useEffect(() => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedElementId) {
      filtered = filtered.filter(
        (blog) => blog.elementId === parseInt(selectedElementId)
      );
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, selectedElementId, blogs]);

  return (
    <>
      <NavBar />
      <img
        src="https://images.pexels.com/photos/2017752/pexels-photo-2017752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Blog</h2>
        <div className="mb-6 flex flex-col md:flex-row justify-center items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nhập từ khóa cần tìm kiếm..."
            className="border p-3 rounded-lg w-full md:w-2/5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 max-w-[450px]"
          />
          <select
            value={selectedElementId}
            onChange={(e) => setSelectedElementId(e.target.value)}
            className="border p-3 rounded-lg mt-4 md:mt-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 max-w-[250px] md:w-1/4"
          >
            <option value="">Tất cả các mệnh</option>
            {elements.length > 0 ? (
              elements.map((element) => (
                <option key={element.elementId} value={element.elementId}>
                  {element.element1}
                </option>
              ))
            ) : (
              <option disabled>Đang tải...</option>
            )}
          </select>
        </div>

        {Array.isArray(filteredBlogs) && filteredBlogs.length > 0 ? (
          <div className="space-y-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.blogId}
                className="flex bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 max-w-[700px] w-full mx-auto"
              >
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="h-40 w-40 object-cover"
                />
                <div className="p-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {blog.title}
                  </h3>
                  <p
                    className="text-gray-600 mb-4"
                    dangerouslySetInnerHTML={{ __html: blog.content }.slice(
                      0,
                      100
                    )}
                  >
                    ...
                  </p>
                  <Link
                    to={`/blog/detail/${blog.blogId}`}
                    className="text-blue-500 hover:underline"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Không tìm thấy bài viết nào
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
