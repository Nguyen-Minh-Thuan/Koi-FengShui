import React from 'react';
import { format } from 'date-fns';
import { Box, Container, Grid } from '@mui/material';
import NavBar from '../../../Component/NavBar';
import UserSidebar from '../../../Component/UserSidebar';
import Footer from '../../../Component/Footer';

const UserAdsList = () => {
    // Dữ liệu mẫu cho bảng
    const adsData = [
        {
            id: 1,
            title: 'Cá koi',
            status: 'Đang hiển thị',
            package: 'Premium',
            postDate: new Date('2023-05-01'),
            expiryDate: new Date('2023-06-01'),
        },
        {
            id: 2,
            title: 'Cá koi 2',
            status: 'Chờ duyệt',
            package: 'Standard',
            postDate: new Date('2023-05-05'),
            expiryDate: new Date('2023-06-05'),
        },
        {
            id: 3,
            title: 'Cá koi 3',
            status: 'Hết hạn',
            package: 'Basic',
            postDate: new Date('2023-04-15'),
            expiryDate: new Date('2023-05-15'),
        },
    ];

    return (
        <Box sx={{ backgroundColor: '#fafafa' }}>
            <NavBar />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <UserSidebar />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box component="main" sx={{ flexGrow: 1 }}>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="w-[105px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tiêu đề
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Trạng thái
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Package
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Thời gian đăng
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Thời gian hết hạn
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Chi tiết
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {adsData.map((ad) => (
                                            <tr key={ad.id}>
                                                <td className="w-[105px] px-6 py-4 truncate">{ad.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{ad.status}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{ad.package}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {format(ad.postDate, 'dd/MM/yyyy')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {format(ad.expiryDate, 'dd/MM/yyyy')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                        onClick={() => console.log(`View details for ad ${ad.id}`)}
                                                    >
                                                        Xem chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>

    );
};

export default UserAdsList;
