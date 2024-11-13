import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../Config/axios";
import StaffHeader from "../../../Component/StaffHeader";
import Imgtemp from "../../../assets/img/Home_img1.png";

const StaffAdsDetail = () => {
  const { adsId } = useParams();
  const [adDetail, setAdDetail] = useState(null);
  const [reasonDecline, setReasonDecline] = useState("");
  const [declinedPopupVisible, setDeclinePopupVisible] = useState(false);
  const [userName, setUserName] = useState("N/A");
  const [packageName, setPackageName] = useState("N/A");
  const [pendingAds, setPendingAds] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(false);

  const ApproveAds = async () => {
    try {
      console.log("Ads ID:", adsId);
      const response = await api.post(`staff/ApproveAdvertisement/${adsId}`);
      if (response.status === 200) {
        toast.success(`Success mesage: ${response.data}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        `Advertisement Approved Fail: ${error.response?.data || error.message}`
      );
    }
  };

  const openDeclinePopup = () => {
    setDeclinePopupVisible(true);
  };

  const closeDeclinePopup = () => {
    setDeclinePopupVisible(false);
    setReasonDecline("");
  };

  const DeclineAds = async () => {
    try {
      const response = await api.post(
        `staff/DeclineAdvertisement/${adsId}`,
        reasonDecline,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(`Success mesage: ${response.data}`);
      }
    } catch (error) {
      console.error(
        "Error declining ad:",
        error.response?.data || error.message
      );
      alert(`An error occurred: ${error.response?.data || error.message}`);
    }
    closeDeclinePopup();
  };

  useEffect(() => {
    const fetchAdDetail = async () => {
      try {
        const response = await api.get(`Advertisement/GetAdsById?id=${adsId}`);
        setAdDetail(response.data.data);
        if((response.data.data.status?.status1) === 'Pending' ? setButtonVisible(true) : setButtonVisible(false));
        const userId = response.data.data.userId;
        if (userId) {
          const userResponse = await api.get(`User/GetUserById?id=${userId}`);
          setUserName(userResponse.data.data.userName);
        }

        const PackageID = response.data.data.packageId;
        if (PackageID) {
          const packageResponse = await api.get(
            `Package/GetPackageById/${PackageID}`
          );
          setPackageName(packageResponse.data.data.packageName);
        }
      } catch (err) {
        console.error("Error fetching ad details:", err);
      }
    };

    if (adsId) {
      fetchAdDetail();
    }
  }, [adsId]);

  if (!adDetail) {
    return <div>Không có dữ liệu</div>;
  }

  return (
    <>
      <StaffHeader />
      <ToastContainer />
      <div className="p-8 mx-40 my-10 border border-gray-200 shadow-lg rounded-lg mb-4">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">
          Advertisement Details
        </h1>
        <div className="flex justify-between">
          <div className="pl-40">
            <p className="mb-2">
              <strong>Title:</strong> {adDetail?.title || "No Title Available"}
            </p>
            <p className="mb-2">
              <strong>User Name:</strong> {userName}
            </p>
            <p className="mb-2">
              <strong>Posted at:</strong>{" "}
              {adDetail?.startedDate
                ? new Date(adDetail.startedDate).toLocaleDateString("vi-VN")
                : "N/A"}
            </p>
            <p className="mb-2">
              <strong>Package:</strong> {packageName}
            </p>
          </div>

          <div className="pr-40">
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              {adDetail?.status?.status1 || "Unknown Status"}
            </p>
            <p className="mb-2">
              <strong>Payment Status:</strong>{" "}
              {adDetail?.paymentStatus ? "Paid" : "Unpaid"}
            </p>
            <p className="mb-2">
              <strong>Decline reason:</strong>{" "}
              {adDetail?.reason ? adDetail?.reason : "None"}
            </p>
          </div>
        </div>

        {buttonVisible &&
        <div className='flex justify-center'>
            <button className='bg-red-500 p-2 mx-8 rounded-lg text-white hover:bg-red-600' onClick={openDeclinePopup}>Decline</button>
            <button className='bg-green-500 p-2 mx-12 rounded-lg text-white hover:bg-green-600 ' onClick={ApproveAds}>Approve</button>
        </div>
        }

      </div>

      <div className="p-8 mx-40 my-10 border border-gray-200 shadow-lg rounded-lg mb-4">
        <h1 className="font-bold text-2xl text-center">{adDetail.title}</h1>
        <img className="rounded-lg my-4 px-[10%] h-[500px]" src={Imgtemp}></img>
        <div dangerouslySetInnerHTML={{ __html: adDetail.content }}></div>
      </div>

      {declinedPopupVisible && (
        <div className="fixed flex inset-0 items-center justify-center bg-opacity-50 bg-black ">
          <div className="bg-white shadow-md p-6 rounded-lg h-[40%] w-[50%]">
            <h1 className="text-xl font-semibold mb-4 text-center">
              Enter decline reason
            </h1>
            <input className="h-14 w-full border-2 border-black rounded p-2 mt-6"></input>
            <div className="flex justify-center p-8">
              <button
                className="bg-red-500 p-2 mx-4 rounded-lg text-white hover:bg-red-600"
                onClick={DeclineAds}
              >
                Decline
              </button>
              <button
                className="bg-orange-500 p-2 rounded-lg text-white hover:bg-orange-600 mx-4"
                onClick={closeDeclinePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StaffAdsDetail;
