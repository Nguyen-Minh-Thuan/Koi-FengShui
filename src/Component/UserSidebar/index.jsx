import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from '@mui/material';
import { Person, Settings } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/user/profile', icon: <Person />, text: 'Thông tin cá nhân' },
    { path: '/user/settings', icon: <Settings />, text: 'Đổi mật khẩu' },
    
  ];

  const handleTabChange = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: 'white',
        color: 'black',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: 'black', mb: 2 }}>
          User Profile
        </Typography>
      </Box>
      <List component="nav" sx={{ p: 0 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            button
            onClick={() => handleTabChange(item.path)}
            sx={{
              bgcolor: location.pathname === item.path ? 'black' : 'white',
              color: location.pathname === item.path ? 'white' : 'black',
              '&:hover': {
                bgcolor: location.pathname === item.path ? 'black' : 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'white' : 'black' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserSidebar;
