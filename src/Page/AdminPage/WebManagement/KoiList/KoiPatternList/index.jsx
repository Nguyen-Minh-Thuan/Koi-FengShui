import { useState, useEffect } from "react";
import AdminHeader from "../../../../../Component/HeaderAdmin";
import koiImg from "../../../../../assets/img/Home_banner.jpg";
import api from "../../../../../Config/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import editIcon from "../../../../../assets/Icon/edit.png";
import deleteIcon from "../../../../../assets/Icon/delete.png";
import { storage } from '../../../../../Config/firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Index = () => {
  const { koiVarietyId } = useParams();
  const navigate = useNavigate();
  const [pattern, setPattern] = useState([]);
  const [loading, setLoading] = useState(true);
  const [varietyDescription, setVarietyDescription] = useState("");
  const [varietyName, setVarietyName] = useState("");
  const [varietyImageUrl, setVarietyImageUrl] = useState("");
  const [updateVarietyPopupVisible, setUpdateVarietyPopupVisible] = useState(false);
  const [deleteVarietyPopupVisible, setDeleteVarietyPopupVisible] = useState(false);
  const [addPatternPopupVisible, setAddPatternPopupVisible] = useState(false);
  const [patternName, setPatternName] = useState("");
  const [imgFile, setImgFile] = useState(null);

  const deleteVariety = async () => {
    try {
      const response = await api.delete(`Koi/DeleteKoi/${koiVarietyId}`);
      if (response.status === 200) {
        navigate("/admin/koilist/");
        toast.success(`Delete Variety Successful !!`);
      }
    } catch (error) {
      toast.error(`Delete fail !!`);
      console.log(error);
    }
    setDeleteVarietyPopupVisible(false);
  };

  const updateVariety = async () => {
    try {
      const imgUrlFromFirebase = await uploadImageToFirebase();
      const response = await api.put(`Koi/UpdateKoi/${koiVarietyId}`, {
        varietyName,
        imageUrl: imgUrlFromFirebase,
        description: varietyDescription,
      });
      if (response.status === 200)
        toast.success("Update Variety successful !!");
    } catch (error) {
      toast.error("Update Variety Fail !!");
      console.log(error);
    }
    setUpdateVarietyPopupVisible(false);
  };


  const addNewPattern = async () => {
    try {
      const imgUrlFromFirebase = await uploadImageToFirebase();

      const response = await api.post(`Pattern/Create`, {
        patternName: patternName,
        imageUrl: imgUrlFromFirebase,
        varietyId: koiVarietyId,
      });
      if (response.status === 200){
        toast.success("Add new Pattern successful !!");
        fetchKoiVariety();
      }
    } catch (error) {
      toast.error("Add new Pattern Fail !!");
      console.log(error);
    }
    setAddPatternPopupVisible(false);
  };

  const openAddPatternPopup = () => {
    setAddPatternPopupVisible(true);
  };

  const closeAddPatternPopup = () => {
    setAddPatternPopupVisible(false);
  };

  const openDeleteVarietyPopup = () => {
    setDeleteVarietyPopupVisible(true);
  };

  const closeDeleteVarietyPopup = () => {
    setDeleteVarietyPopupVisible(false);
  };

  const openUpdateVarietyPopup = () => {
    setUpdateVarietyPopupVisible(true);
  };

  const closeUpdateVarietyPopup = () => {
    setUpdateVarietyPopupVisible(false);
  };

  const fetchKoiVariety = async () => {
    try {
      const response = await api.get(`Koi/GetKoiById/${koiVarietyId}`);
      if (response.data.status) {
        setPattern(response.data.data.patterns);
        setVarietyDescription(response.data.data.description);
        setVarietyName(response.data.data.varietyName);
        setVarietyImageUrl(response.data.data.imageUrl);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImageToFirebase = async () => {
    if (!imgFile) {
      toast.error("imgFile null")
      return null;
    }; 
    try {      
      const storageRef = ref(storage, `Koi_Images/${imgFile.name}`);
      await uploadBytes(storageRef, imgFile);
      const imgUrlFromFirebase = await getDownloadURL(storageRef);
      // toast.success("Upload to Firebase successful!");
      return imgUrlFromFirebase;
    } catch (error) {
      console.log(error);
      toast.error("Upload to Firebase failed");
      return null; 
    }
  };

  const handleChangeImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgFile(file);
    }
  };

  useEffect(() => {
    if (koiVarietyId) fetchKoiVariety();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-violet-100 min-h-screen">
      <AdminHeader />
      <ToastContainer />
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="w-full flex ">
            <h1 className="bg-white rounded-lg p-4 ml-3 my-4 mr-10  text-2xl shadow-lg flex">
              Variety Name: {varietyName}
            </h1>
            <div className="items-center flex">
              <button onClick={openUpdateVarietyPopup}>
                <img
                  className="h-12 p-2 rounded-lg shadow-lg bg-white"
                  src={editIcon}
                ></img>
              </button>
              <button onClick={openDeleteVarietyPopup}>
                <img
                  className="h-12 p-2 rounded-lg shadow-lg ml-8 bg-white"
                  src={deleteIcon}
                ></img>
              </button>
            </div>
          </div>
          <h1 className="bg-white rounded-lg w-fit p-4 ml-3 my-4 text-2xl shadow-lg flex">
            Decription: {varietyDescription}
          </h1>
          <button
            className="bg-white rounded-xl pr-4 ml-3 shadow-lg font-semibold flex items-center text-xl"
            onClick={openAddPatternPopup}
          >
            <span className="m-3 text-3xl">+</span>
            Create New Pattern Koi
          </button>
          {pattern.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {pattern.map((koi) => (
                <div
                  key={koi.patternId}
                  className="bg-white shadow-lg rounded-lg p-4 m-2 flex flex-col"
                >
                  <img
                    className="w-full h-fit object-cover"
                    src={koi.imageUrl || koiImg}
                  />
                  <h3 className="text-lg font-bold mt-2">
                    {koi.patternName || "Không có tên"}
                  </h3>
                  <p className="text-sm mt-2">
                    {koi.description || "No description"}
                  </p>
                  <div className="mt-auto text-right">
                    <Link
                      to={`/admin/koilist/${koi.varietyId}/${koi.patternId}`}
                      className="bg-blue-500 px-2 py-2 text-white rounded-lg hover:bg-blue-600"
                    >
                      View Koi Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="bg-white rounded-lg w-fit p-4 ml-3 my-4  text-2xl shadow-lg flex text-red-600">
              Not have any Koi !!.
            </h1>
          )}
        </div>
      </div>

      {/* Add New Pattern Popup */}
      {addPatternPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[60%]">
            <h2 className="text-xl font-semibold mb-4">Add New Pattern</h2>
            <label className="block mb-2">Pattern Name:</label>
            <input
              className="border p-2 w-full mb-4"
              value={patternName}
              onChange={(e) => setPatternName(e.target.value)}
            />
            <label className="block mb-2">Pattern Image :</label>
            <input
              className="border p-2 w-full mb-4"
              type='file'
              onChange={handleChangeImg}
              placeholder="Chọn ảnh"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={addNewPattern}
              >
                Add Pattern
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={closeAddPatternPopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {updateVarietyPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[60%]">
            <h2 className="text-xl font-semibold mb-4">Update Koi Variety</h2>
            <label className="block mb-2">Variety Name:</label>
            <input
              className="border p-2 w-full mb-4"
              value={varietyName}
              onChange={(e) => setVarietyName(e.target.value)}
            />
            <label className="block mb-2">Description:</label>
            <textarea
              className="border p-2 w-full mb-4"
              value={varietyDescription}
              onChange={(e) => setVarietyDescription(e.target.value)}
            />
            <label className="block mb-2">Image URL:</label>
            <input
              type='file'
              className="border p-2 w-full mb-4"
              onChange={handleChangeImg}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={updateVariety}
              >
                Update
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={closeUpdateVarietyPopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteVarietyPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this variety?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={deleteVariety}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={closeDeleteVarietyPopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
