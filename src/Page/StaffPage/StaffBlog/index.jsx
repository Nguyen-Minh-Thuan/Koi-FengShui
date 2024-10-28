import React, { useEffect, useState } from 'react';
import api from '../../../Config/axios';
import { DataGrid } from '@mui/x-data-grid';
import StaffSidebar from '../../../Component/StaffSideBar';
import { useNavigate } from 'react-router-dom';
import StaffHeader from '../../../Component/StaffHeader';

const StaffBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('blogs');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('https://localhost:7275/api/Blog/GetAll');
        if (response.data) {
          setBlogs(response.data.data);
          setFilteredBlogs(response.data.data); 
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const columns = [
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'content', headerName: 'Content', width: 300 },
    { field: 'createdDate', headerName: 'Created Date', width: 150 },
    { field: 'isActive', headerName: 'Active', width: 100 },
    { 
      field: 'action', 
      headerName: 'Action', 
      width: 150, 
      renderCell: (params) => (
        <button 
          className="bg-blue-600 text-white rounded px-2 py-1 text-sm hover:bg-blue-700 transition duration-300"
          onClick={() => navigate(`/staff/blogs/${params.row.id}`)}
        >
          Detail
        </button>
      )
    },
  ];

  const rows = blogs.map((blog) => ({
    id: blog.blogId,
    title: blog.title,
    content: blog.content,
    createdDate: blog.createdDate ? new Date(blog.createdDate).toLocaleDateString() : 'Unknown',
    isActive: blog.isActive ? 'Yes' : 'No',
    originalBlog: blog,
  }));

  return (
    <>
      <StaffHeader />
      <div className="flex mx-auto" style={{ backgroundColor: '#F5F7F9' }}>
        <StaffSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="w-3/4">
          <div className="gap-8">
            {activeTab === 'blogs' && (
              <div id="blogs" className="bg-white shadow-lg rounded-lg border-2 p-6 my-14 mr-10">
                <h3 className="text-2xl font-semibold mb-4">Blogs</h3>
                
                <div style={{ height: 500, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
                    pagination
                    page={page}
                    onPageChange={(newPage) => setPage(newPage)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffBlog;
