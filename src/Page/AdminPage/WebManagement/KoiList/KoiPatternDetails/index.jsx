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
  
  const [patternName, setPatternName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [varietyId, setVarietyId] = useState(0);

  const fetchKoiPatternDetail = async () => {
    try {
      const response = await api.get(`Pattern/GetById/${koiPatternId}`);
      if (response.data.status) {
        setKoiPattern(response.data.data);
        setPatternName(response.data.data.patternName);
        setImageUrl(response.data.data.imageUrl);
        setVarietyId(response.data.data.varietyId || 0);
      } else {
        toast.error("Failed to load Koi pattern details");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the Koi pattern details");
      console.error(error);
    } finally {
      setLoading(false);
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
      if (error.response && error.response.status === 404) {
        toast.error('Pattern not found. Please check the ID.');
      } else {
        toast.error('An error occurred during deletion.');
      }
      console.error(error);
    }
    setDeletePopupVisible(false);
  };

  useEffect(() => {
    fetchKoiPatternDetail();
  }, []);

  return (
    <>
      <AdminHeader/>
      <div className="container mx-auto px-32 py-16 bg-violet-100">
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
            <ul>
              {koiPattern.patternColors.map((colorItem) => (
                <li key={colorItem.pcolorId} className="mb-2">
                  <strong>Color:</strong> {colorItem.color.name} - <strong>Values:</strong> {colorItem.values}
                </li>
              ))}
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
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                  <h2 className="text-lg font-semibold mb-4">Update Koi Pattern</h2>
                  <input 
                    type="text" 
                    value={patternName} 
                    onChange={(e) => setPatternName(e.target.value)} 
                    placeholder="Pattern Name"
                    className="border rounded-md p-2 w-full mb-2"
                  />
                  <input 
                    type="text" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                    placeholder="Image URL"
                    className="border rounded-md p-2 w-full mb-2"
                  />                  
                  <div className="flex justify-end">
                    <button 
                      onClick={updateKoiPattern}
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setUpdatePopupVisible(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Confirmation Popup Modal */}
            {deletePopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                  <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                  <p className="mb-4">Are you sure you want to delete this Koi pattern?</p>
                  <div className="flex justify-end">
                    <button 
                      onClick={deleteKoiPattern}
                      className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
                    >
                      Yes, Delete
                    </button>
                    <button 
                      onClick={() => setDeletePopupVisible(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>No Koi Pattern found</div>
        )}
      </div>
    </>
  );
}

export default Index;
