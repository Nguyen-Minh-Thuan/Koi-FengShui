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
  
  const [updatePatternPopupVisible, setUpdatePatternPopupVisible] = useState(false);
  const [deletePatternPopupVisible, setDeletePatternPopupVisible] = useState(false);
  const [addColorPopupVisible, setAddColorPopupVisible] = useState(false);
  const [updateColorPopupVisible, setUpdateColorPopupVisible] = useState(false);
  const [deleteColorPopupVisible, setDeleteColorPopupVisible] = useState(false);
  
  const [patternName, setPatternName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [varietyId, setVarietyId] = useState(0);
  const [colorId, setColorId] = useState(0);
  const [pColorId, setpColorId] = useState(0);

  const [newColorValue, setNewColorValue] = useState(); 
  const [selectedColorId, setSelectedColorId] = useState();
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
      toast.error(`An error occurred during update. ${error.response.data}`);
      console.error(error);
    }
    setUpdatePatternPopupVisible(false);
  };

  const deleteKoiPattern = async () => {
    try {
      const response = await api.delete(`Pattern/Detele/${koiPatternId}`);      
      if (response.status === 200) {
        toast.success('Koi pattern deleted successfully!');
        navigate(`/admin/koilist/${varietyId}`);
      } else {
        toast.error('Failed to delete the Koi pattern.');
      }
    } catch (error) {
      toast.error(`Eror: ${error.response.data}`)
      console.error(error);
    }
    setDeletePatternPopupVisible(false);
  };

  const openAddColorPopup = () => {
    setAddColorPopupVisible(true);
  }
  
  const closeAddColorPopup = () => {
    setAddColorPopupVisible(false);
    setSelectedColorId();
    setNewColorValue();
  }

  const openUpdateColorPopup = () => {
    setUpdateColorPopupVisible(true);
  }

  const closeUpdateColorPopup = () => {
    setUpdateColorPopupVisible(false);
    setSelectedColorId();
    setNewColorValue();
  }

  const addColorPattern = async () => {
    try {
      const newcolor = [{
        colorid: selectedColorId,
        value: newColorValue
      }]
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
    closeAddColorPopup();
  };
  

  const deleteColor = async () => {
    try {
      const response = await api.delete(`PatternColor/DeletePatternColor?id=${pColorId}`);
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
      const colorUpdating = {
        colorid: colorId,
        value: newColorValue
      }
      const response = await api.put(`PatternColor/UpdatePatternColor?PatternId=${koiPatternId}&PatternColorId=${pColorId}`, colorUpdating, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.status === 200) {
        toast.success('Color updated successfully!');
        fetchKoiPatternDetail();
      }
    } catch (error) {
      toast.error(`An error occurred while updating the color. ${error.response.status}`);
      console.error(error);
    }
    closeUpdateColorPopup();
  };

  useEffect(() => {
    fetchKoiPatternDetail();
    fetchAvailableColors(); 
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
              className="w-[70%] h-fit object-cover mb-4 rounded "
            />
            <h2 className="text-xl font-semibold mb-2">Pattern Colors:</h2>
            <ul className='p-6 rounded-lg bg-slate-100 '>
              {colorList.map((colorItem) => (
                <li key={colorItem.colorId} className="mb-2 flex justify-between w-[47%] ">
                  <div>
                    <strong>Color:</strong> {colorItem.color.name} - <strong>Values:</strong> {colorItem.values}
                  </div>
                  <div className='flex'>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600 w-fit"
                      onClick={() => {setpColorId(colorItem.pcolorId); setColorId(colorItem.colorId); openUpdateColorPopup()}}
                    >
                      Update Color Value
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => {setpColorId(colorItem.pcolorId);setDeleteColorPopupVisible(true)}}
                    >
                      Delete Color
                    </button>
                  </div>
                </li>
              ))}
              <button
                className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600 transition"
                onClick={() => openAddColorPopup()}
              >
                Add Color
              </button>
            </ul>

            <div className="flex justify-end mt-4 ">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition"
                onClick={() => setUpdatePatternPopupVisible(true)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => setDeletePatternPopupVisible(true)}
              >
                Delete
              </button>              
            </div>

            {updatePatternPopupVisible && (
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
                  <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setUpdatePatternPopupVisible(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {deletePatternPopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg">
                  <h2 className="text-lg font-semibold">Are you sure you want to delete this Koi pattern?</h2>
                  <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={deleteKoiPattern}>
                    Yes, Delete
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setDeletePatternPopupVisible(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {addColorPopupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-semibold ">Select New Color</h2>                
                <select
                  onChange={(e) => {
                    const colorId = parseInt(e.target.value, 10);
                    console.log('Selected Color ID:', colorId);
                    setSelectedColorId(colorId);
                  }}
                  className="border p-2 w-full"
                >
                  <option>-- Select color --</option>
                  {availableColors.map(color => (
                    <option key={color.colorId} value={color.colorId}>
                      {color.name}
                    </option>
                  ))}
                </select>

                <h2 className="text-lg font-semibold mt-4">Select value</h2>                  
                <select
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    console.log('New Color Value:', value); 
                    setNewColorValue(value);
                  }}
                  className="border p-2 w-full mb-6"
                >
                  <option value={0}>-- Select value --</option>
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

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={async () => {
                    if (selectedColorId && newColorValue) {
                      await addColorPattern();
                    } else {
                      alert('Please select a color and a valid value.');
                    }
                  }}
                >
                  Confirm Add
                </button>

                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => closeAddColorPopup()}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}


            {updateColorPopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg">
                  <h2 className="text-lg font-semibold">Update Color Value</h2>
                  <select className="border p-2 mb-2 w-full" onChange={(event) =>{ 
                      const value = parseFloat(event.target.value);
                      console.log('New Color Value:', value); 
                      setNewColorValue(value);
                      }} 
                    >
                    <option value={0}>-- Select value you want to updae --</option>
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
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => {
                    if(newColorValue)
                      updateColor(pColorId);
                    else
                      toast.error("Please choose value!!")
                  }}>
                    Confirm Update
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setUpdateColorPopupVisible(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {deleteColorPopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg">
                  <h2 className="text-lg font-semibold">Are you sure you want to delete this color?</h2>
                  <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={() => deleteColor(pColorId)}>
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
