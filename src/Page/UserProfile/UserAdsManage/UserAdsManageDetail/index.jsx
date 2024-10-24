import React from 'react';
import CloseIcon from '@mui/icons-material/Close';


const elementIdToCategory = {
    1: 'Kim',
    2: 'Thủy',
    3: 'Hỏa',
    4: 'Mộc',
    5: 'Thổ',
};

const UserAdsManageDetail = ({ ad, onClose }) => {
    if (!ad) return null;

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
                            <ul className="list-disc list-inside text-gray-600 mb-4">
                                <li>Giá trị đơn hàng từ 1 triệu 5 tặng kèm 1 chai vi sinh (không hợp nhất với combo khác).</li>
                                <li>Mua 10 tặng 1, tặng kèm 1 chai vi sinh cao cấp 800ml.</li>
                                <li>Miễn phí ship từ trại ra các bến xe tại Hà Nội.</li>
                            </ul>
                            <p className="text-gray-600">Liên hệ: 0987654321</p>
                            <p className="text-gray-600 mb-4">Mail: example@gmail.com</p>
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
                            <li>Trạng thái: <strong>{ad.status.status1 === 'Drafted' ? 'Bản nháp' : ad.status.status1}</strong></li>
                            <li>Ngày đăng: <strong>{ad.startedDate}</strong></li>
                            <li>Ngày hết hạn: <strong>{ad.expiredDate}</strong></li>
                            <li>Gói đăng ký: <strong>{ad.packageId}</strong></li>
                            <li>Số ngày đăng: <strong>{ad.duration ? ad.duration : 'Không khả dụng'} ngày</strong></li>
                            <li>Tổng tiền đã trả: <strong>{ad.totalPrice}đ</strong></li>
                        </ul>
                    </div>
                    <div className="flex justify-end space-x-4 mt-4">
                        <button className="bg-red-500 text-white px-4 py-2 rounded">Xóa bài</button>
                        {ad.status.status1 !== 'draft' && (
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Thanh toán và đăng tin</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAdsManageDetail;
