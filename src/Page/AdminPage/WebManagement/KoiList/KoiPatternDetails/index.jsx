import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../../../Config/axios';
import { toast, ToastContainer } from 'react-toastify';
import AdminHeader from '../../../../../Component/HeaderAdmin';

const Index = () => {
  const { koiPatternId } = useParams();
  const navigate = useNavigate();
  const [koiPattern, setKoiPattern] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [updatePopupVisible, setUpdatePopupVisible] = useState(false);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [addColorPopupVisible, setAddColorPopupVisible] = useState(false);
  const [updateColorPopupVisible, setUpdateColorPopupVisible] = useState(false);
  const [deleteColorPopupVisible, setDeleteColorPopupVisible] = useState(false);
  
  const [patternName, setPatternName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [varietyId, setVarietyId] = useState(0);
  const [colorId, setColorId] = useState(0);

  const [newColorValue, setNewColorValue] = useState(0.1); 
  const [selectedColorId, setSelectedColorId] = useState(0);
  const [colorList, setColorList] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);

  const fetchKoiPatternDetail = async () => {
    try {
      const response = await api.get(`Pattern/GetById/${koiPatternId}`);
      if (response.data.status) {
        setKoiPattern(response.data.data);
        setPatternName(response.data.data.patternName);
        setImageUrl(response.data.data.imageUrl);
        setVarietyId(response.data.data.varietyId || 0);
        setColorList(response.data.data.patternColors || []); // Get pattern colors
      } else {
        toast.error("Failed to load Koi pattern details");
      }
    } catch (error) {
      toast.error("Koi pattern does not exist!!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableColors = async () => {
    try {
      const response = await api.get(`Color/GetColor`); // Replace with your actual endpoint
      if (response.data.status) {
        setAvailableColors(response.data.data); // Assuming this is the structure of your response
      } else {
        toast.error("Failed to load color list");
      }
    } catch (error) {
      toast.error("An error occurred while fetching colors");
      console.error(error);
    }
  };

  const updateKoiPattern = async () => {
    try {
      const response = await api.put(`Pattern/Update/${koiPatternId}`, {
        patternName,
        imageUrl,
        varietyId,
      });

      if (response.status === 200) {
        toast.success('Koi pattern updated successfully!');
        fetchKoiPatternDetail();        
      } else {
        toast.error('Failed to update the Koi pattern.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('Pattern not found. Please check the ID.');
      } else {
        toast.error('An error occurred during update.');
      }
      console.error(error);
    }
    setUpdatePopupVisible(false);
  };

  const deleteKoiPattern = async () => {
    try {
      const response = await api.delete(`Pattern/Delete/${koiPatternId}`);      
      if (response.status === 200) {
        toast.success('Koi pattern deleted successfully!');
        navigate(`/admin/koilist/${varietyId}`);
      } else {
        toast.error('Failed to delete the Koi pattern.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error(`Error: ${error.response.status} ${error.response.data}`);
        } else {
          toast.error('An error occurred during deletion.');
        }
      } else {
        toast.error('An error occurred. Please try again later.');
      }
      console.error(error);
    }
    setDeletePopupVisible(false);
  };

  const openAddColorPopup = () => {
    setAddColorPopupVisible(true);
  }
  
  const closeAddColorPopup = () => {
    setAddColorPopupVisible(false);
    setSelectedColorId(0);
    setNewColorValue(0);
  }

  const openUpdateColorPopup = () => {
    setUpdateColorPopupVisible(true);
  }

  const closeUpdateColorPopup = () => {
    setUpdateColorPopupVisible(false);
    setSelectedColorId(0);
    setNewColorValue(0);
  }

  const addColorPattern = async () => {
    try {
      const newcolor = {
        colorid: selectedColorId,
        value: newColorValue
      }
      console.log(newcolor, koiPatternId);
      const response = await api.post(`PatternColor/InputPatternColor?id=${koiPatternId}`, newcolor);
  
      if (response.status === 200) {
        toast.success('Color added successfully!');
        fetchKoiPatternDetail(); 
      } else {
        toast.error('Failed to add color.');
      }
    } catch (error) {
      toast.error(`An error occurred while adding the color. ${error.response?.status}`);
      console.error(error);
    }
    setAddColorPopupVisible(false); 
  };
  

  const deleteColor = async (colorid) => {
    try {
      const response = await api.delete(`PatternColor/DeletePatternColor?id=${colorid}`);
      if (response.status === 200) {
        toast.success('Color deleted successfully!');
        fetchKoiPatternDetail();
      } else {
        toast.error('Failed to delete color.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the color.');
      console.error(error);
    }
    setDeleteColorPopupVisible(false);
  };

  const updateColor = async () => {
    try {
      const response = await api.put(`PatternColor/UpdatePatternColor?PatternId=${koiPatternId}&PatternColorId=${colorId}`, {
        colorId: colorId,
        value: newColorValue,
      });
      if (response.status === 200) {
        toast.success('Color updated successfully!');
        fetchKoiPatternDetail();
      } else {
        toast.error('Failed to update color.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the color.');
      console.error(error);
    }
    setUpdateColorPopupVisible(false);
  };

  useEffect(() => {
    fetchKoiPatternDetail();
    fetchAvailableColors(); // Fetch the colors when the component mounts
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="mx-auto px-32 py-16 min-h-screen bg-violet-100">
        <ToastContainer />
        {loading ? (
          <div>Loading...</div>
        ) : koiPattern ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">{koiPattern.patternName}</h1>
            <img 
              src={koiPattern.imageUrl} 
              alt={koiPattern.patternName} 
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">Pattern Colors:</h2>
            <ul className='p-6 rounded-lg bg-slate-100 '>
              {colorList.map((colorItem) => (
                <li key={colorItem.pcolorId} className="mb-2 flex justify-between w-[30%] ">
                  <div>
                    <strong>Color:</strong> {colorItem.color.name} - <strong>Values:</strong> {colorItem.values}
                  </div>
                  <div>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                      onClick={openUpdateColorPopup}
                    >
                      Update Color Value
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => setDeleteColorPopupVisible(true)}
                    >
                      Delete Color
                    </button>
                  </div>
                </li>
              ))}
              <button
                className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600 transition"
                onClick={() => setAddColorPopupVisible(true)}
              >
                Add Color
              </button>
            </ul>

            {/* Update and Delete Buttons */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition"
                onClick={() => setUpdatePopupVisible(true)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => setDeletePopupVisible(true)}
              >
                Delete
              </button>              
            </div>

            {/* Update Popup Modal */}
            {updatePopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg">
                  <h2 className="text-lg font-semibold">Update Koi Pattern</h2>
                  <input 
                    type="text" 
                    value={patternName} 
                    onChange={(e) => setPatternName(e.target.value)} 
                    className="border p-2 mb-2 w-full" 
                    placeholder="Pattern Name" 
                  />
                  <input 
                    type="text" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                    className="border p-2 mb-2 w-full" 
                    placeholder="Image URL" 
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={updateKoiPattern}>
                    Confirm Update
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setUpdatePopupVisible(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Delete Popup Modal */}
            {deletePopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg">
                  <h2 className="text-lg font-semibold">Are you sure you want to delete this Koi pattern?</h2>
                  <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={deleteKoiPattern}>
                    Yes, Delete
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setDeletePopupVisible(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {addColorPopupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-semibold my-4">Select New Color</h2>
                
                {/* Dropdown cho màu sắc */}
                <select
                  onChange={(e) => {
                    const colorId = parseInt(e.target.value, 10);
                    console.log('Selected Color ID:', colorId); // Log giá trị đã chọn
                    setSelectedColorId(colorId);
                  }}
                  className="border p-2 w-full"
                >
                  {availableColors.map(color => (
                    <option key={color.colorId} value={color.colorId}>
                      {color.name}
                    </option>
                  ))}
                </select>

                {/* Dropdown cho giá trị màu sắc */}
                <select
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    console.log('New Color Value:', value); 
                    setNewColorValue(value);
                  }}
                  className="border p-2 mb-2 w-full my-6"
                >
                  <option value={0.1}>0.1</option>
                  <option value={0.2}>0.2</option>
                  <option value={0.3}>0.3</option>
                  <option value={0.4}>0.4</option>
                  <option value={0.5}>0.5</option>
                  <option value={0.6}>0.6</option>
                  <option value={0.7}>0.7</option>
                  <option value={0.8}>0.8</option>
                  <option value={0.9}>0.9</option>
                  <option value={1}>1</option>
                </select>

                {/* Nút xác nhận thêm màu sắc */}
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={async () => {
                    // Kiểm tra xem có chọn màu và giá trị hợp lệ không
                    if (selectedColorId && newColorValue) {
                      await addColorPattern();
                    } else {
                      alert('Please select a color and a valid value.');
                    }
                  }}
                >
                  Confirm Add
                </button>

                {/* Nút hủy */}
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setAddColorPopupVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}


            {/* Update Color Popup Modal */}
            {updateColorPopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg">
                  <h2 className="text-lg font-semibold">Update Color Value</h2>
                  <select onChange={(event) => setNewColorValue(parseFloat(event.target.value, 10))} className="border p-2 mb-2 w-full">
                    <h3>{selectedColorId}</h3>
                    <option value={0.1}> 0.1 </option>
                    <option value={0.2}> 0.2 </option>
                    <option value={0.3}> 0.3 </option>
                    <option value={0.4}> 0.4 </option>
                    <option value={0.5}> 0.5 </option>
                    <option value={0.6}> 0.6 </option>
                    <option value={0.7}> 0.7 </option>
                    <option value={0.8}> 0.8 </option>
                    <option value={0.9}> 0.9 </option>
                    <option value={1}> 1 </option>
                  </select>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => updateColor(selectedColorId)}>
                    Confirm Update
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setUpdateColorPopupVisible(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Delete Color Popup Modal */}
            {deleteColorPopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg">
                  <h2 className="text-lg font-semibold">Are you sure you want to delete this color?</h2>
                  <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={() => deleteColor(selectedColorId)}>
                    Yes, Delete
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setDeleteColorPopupVisible(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Koi pattern not found.</p>
        )}
      </div>
    </>
  );
};

export default Index;
