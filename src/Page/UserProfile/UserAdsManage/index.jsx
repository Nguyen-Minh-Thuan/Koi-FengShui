import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Box, Container, Grid, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'; 
import NavBar from '../../../Component/NavBar';
import UserSidebar from '../../../Component/UserSidebar';
import Footer from '../../../Component/Footer';
import UserAdsManageDetail from './UserAdsManageDetail';

const UserAdsList = () => {
    const [adsData, setAdsData] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedAd, setSelectedAd] = useState(null);
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const fetchAdsData = async () => {
            if (user) { 
                try {
                    const response = await fetch(`https://localhost:7275/api/Advertisement/GetAdsByUser?userid=${user.userId}`);
                    const getData = await response.json();
                    const ads = getData.data;
                    setAdsData(ads);
                    console.log(ads);
                } catch (error) {
                    console.error('Error fetching ads data:', error);
                }
            }
        };
        fetchAdsData();
    }, [user]);

    useEffect(() => {
        const fetchPackageData = async () => {
            try {
                const response = await fetch('https://localhost:7275/api/Advertisement/GetPackage');
                const packageData = await response.json();
                setPackages(packageData.data);
            } catch (error) {
                console.error('Error fetching package data:', error);
            }
        };
        fetchPackageData();
    }, []);

    const handleViewDetails = (ad) => {
        setSelectedAd(ad);
    };

    const columns = [
        { field: 'title', headerName: 'Tiêu đề', width: 200 },
        { field: 'status', headerName: 'Trạng thái', width: 100 },
        { field: 'packageName', headerName: 'Gói', width: 100 },
        { field: 'startedDate', headerName: 'Thời gian đăng', width: 150 },
        { field: 'expiredDate', headerName: 'Thời gian hết hạn', width: 150 },
        {
            field: 'details',
            headerName: 'Hoạt động',
            width: 150,
            renderCell: (params) => (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                    onClick={() => handleViewDetails(params.row.originalAd)} 
                >
                    Chi tiết
                </button>
            ),
        },
    ];

    const rows = adsData.map((ad) => {
        const packageName = packages.find(pkg => pkg.packageId === ad.packageId)?.packageName || 'Chưa chọn gói';
        return {
            id: ad.adsId,
            title: ad.title,
            status: ad.status.status1 === 'Drafted' ? 'Bản nháp' :
                    ad.status.status1 === 'Pending' ? 'Chờ duyệt' :
                    ad.status.status1 === 'Deploying' ? 'Đang quảng cáo' :
                    ad.status.status1 === 'Sold Out' ? 'Đã bán' :
                    ad.status.status1 === 'Expired' ? 'Hết hạn' :
                    ad.status.status1 === 'Cancelled' ? 'Bị từ chối' :
                    ad.status.status1,
            packageName: packageName,
            startedDate: ad.startedDate ? format(new Date(ad.startedDate), 'dd/MM/yyyy') : 'Chưa bắt đầu',
            expiredDate: ad.expiredDate ? format(new Date(ad.expiredDate), 'dd/MM/yyyy') : 'Chưa bắt đầu',
            originalAd: ad, 
        };
    });

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
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
            {selectedAd && (
                <UserAdsManageDetail ad={selectedAd} onClose={() => setSelectedAd(null)} />
            )}
        </Box>
    );
};

export default UserAdsList;
