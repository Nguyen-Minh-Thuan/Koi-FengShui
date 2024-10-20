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
        setBlogs(Array.isArray(data) ? data : []);
        setFilteredBlogs(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  useEffect(() => {
    fetch("https://localhost:7275/api/Element/GetElement")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
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
        (blog) => blog.elementID === parseInt(selectedElementId)
      );
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, selectedElementId, blogs]);

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title..."
            className="border p-3 rounded-lg w-full md:w-2/5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <select
            value={selectedElementId}
            onChange={(e) => setSelectedElementId(e.target.value)}
            className="border p-3 rounded-lg mt-4 md:mt-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 w-full md:w-1/4"
          >
            <option value="">All Elements</option>
            {elements.length > 0 ? (
              elements.map((element) => (
                <option key={element.elementId} value={element.elementId}>
                  {element.element1}
                </option>
              ))
            ) : (
              <option disabled>Loading elements...</option>
            )}
          </select>
        </div>

        {Array.isArray(filteredBlogs) && filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="rounded-t-lg h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {blog.content.slice(0, 30)}...
                  </p>
                  <Link
                    to={`/blog/detail/${blog.id}`}
                    className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No blogs found</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
