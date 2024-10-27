import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import ChoosePackagePage from './Payment';


const elementIdToCategory = {
    1: 'Kim',
    2: 'Thủy',
    3: 'Hỏa',
    4: 'Mộc',
    5: 'Thổ',
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
};

const UserAdsManageDetail = ({ ad, onClose }) => {
    const [showPackagePopup, setShowPackagePopup] = useState(false);
    const navigate = useNavigate();

    if (!ad) return null;

    const packageType = ad.packageId === 1 ? 'Gói thường' 
                      : ad.packageId === 2 ? 'Gói Đặc biệt' 
                      : 'Chưa chọn gói';

    const totalPrice = ad.transactions && ad.transactions.length > 0 
        ? formatCurrency(ad.transactions[0].totalPrice) 
        : 'Chưa thanh toán';

    const statusLabel = ad.status.status1 === 'Drafted' ? 'Bản nháp'
                      : ad.status.status1 === 'Deploying' ? 'Đang quảng cáo'
                      : ad.status.status1 === 'Pending' ? 'Chờ duyệt'
                      : ad.status.status1 === 'Sold Out' ? 'Đã bán'
                      : ad.status.status1 === 'Expried' ? 'Hết hạn'
                      : 'Không xác định';

    const handleDeleteAd = (adId, userId, onClose) => {
        let token = localStorage.getItem('token'); 
        token = token.replace(/"/g, ''); 

        fetch(`https://localhost:7275/api/Advertisement/DeleteDraftById?id=${ad.adsId}&userId=${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Ad deleted successfully');
                onClose(); 
            } else {
                alert('Failed to delete ad');
            }
        })
        .catch(error => {
            console.error('Error deleting ad:', error);
            alert('An error occurred');
        });
    };

    const handleMarkAsSold = (adsId, userId) => {
        let token = localStorage.getItem('token');
        token = token.replace(/"/g, '');

        fetch(`https://localhost:7275/api/Advertisement/AdsSoldOut?id=${adsId}&userId=${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Ad marked as sold successfully');
            } else {
                alert('Failed to mark ad as sold');
            }
        })
        .catch(error => {
            console.error('Error marking ad as sold:', error);
            alert('An error occurred');
        });
    };

    const handlePaymentAndPost = () => {
        setShowPackagePopup(true);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white p-4 rounded-lg max-w-5xl mx-auto h-[500px] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
                <div className="max-w-5xl mx-auto p-4 font-sans " >
                    <div className="flex flex-col md:flex-row gap-8">
                        <img src={ad.imageUrl} alt={ad.title} className="w-full md:w-[233px] h-[350px] object-contain" />
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-3xl font-bold text-gray-800">{ad.title}</h1>
                                <button onClick={onClose} className="text-red-500">
                                    <CloseIcon />
                                </button>
                            </div>
                            <p className="text-gray-600 mb-4">{ad.content}</p>
                            
                            <div className="space-x-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                    Loại: {ad.adsType ? ad.adsType.typeName : 'Không khả dụng'}
                                </span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                    Mệnh:  {elementIdToCategory[ad.elementId] || 'Không khả dụng'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4 h-px border-0 bg-gray-300" />

                    <div className="text-gray-800">
                        <h2 className="text-xl font-bold mb-4">Thông tin chi tiết</h2>
                        <ul className="list-disc list-inside">
                            <li>Trạng thái: <strong>{statusLabel}</strong></li>
                            <li>Ngày đăng: <strong>{formatDate(ad.startedDate)}</strong></li>
                            <li>Ngày hết hạn: <strong>{formatDate(ad.expiredDate)}</strong></li>
                            <li>Gói đăng ký: <strong>{packageType}</strong></li>
                            <li>Số ngày đăng: <strong>{ad.duration ? `${ad.duration} ngày` : 'Chưa xác định'}</strong></li>
                            <li>Tổng tiền đã trả: <strong>{totalPrice}</strong></li>
                        </ul>
                    </div>
                    <div className="flex justify-end space-x-4 mt-4">
                        {ad.status.status1 === 'Drafted' && (
                            <button 
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => handleDeleteAd(ad.id, ad.userId, onClose)}
                            >
                                Xóa bài
                            </button>
                        )}
                        {ad.status.status1 === 'Deploying' && (
                            <button 
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => handleMarkAsSold(ad.adsId, ad.userId)}
                            >
                                Đã bán
                            </button>
                        )}
                        {ad.status.status1 === 'Drafted' && (
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handlePaymentAndPost}
                            >
                                Thanh toán và đăng tin
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {showPackagePopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
                    <div className="bg-white p-4 rounded-lg max-w-5xl mx-auto h-[570px] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <ChoosePackagePage 
                            adsId={ad.adsId}
                            adsTypeId={ad.adsTypeId}
                            userId={ad.userId}
                            title={ad.title}
                            content={ad.content}
                            elementId={ad.elementId}
                            imageUrl={ad.imageUrl}
                            onClose={() => setShowPackagePopup(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAdsManageDetail;
