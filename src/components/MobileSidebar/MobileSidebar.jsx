import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Box, IconButton, Modal, Typography } from "@mui/material";

import { Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import file from '../../images/history2.png';
import more from '../../images/more2.png';
import logo from '../../images/logo1.png';
import create from '../../images/create.png';
import payment from '../../images/payment2.png';
import logout from '../../images/logout.png'; 
import { IoClose } from "react-icons/io5";
export default function MobileSidebar({ drawerOpen, toggleDrawer }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = window.location.pathname

 const [logoutAlert, setLogoutAlert] = useState(false);
  const handleLogoutAlert = () => {
    setLogoutAlert(!logoutAlert)
  }
    let handleLogoutout = () => {
      console.log("logout");
      localStorage.removeItem("id");
      navigate("/signin");
    };

  return (
    <>
    
<Drawer
  anchor="left"
  sx={{
    '& .MuiDrawer-paper': {
      backgroundColor: '#444343',
      display: 'flex',
      flexDirection: 'column',
      height: '100%', // Full viewport height
      position:'fixed'
    },
  }}
  open={drawerOpen}
  onClose={toggleDrawer(false)}
>
  <div 
    style={{ 
      width: 240, 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column" 
    }} 
    role="presentation"
  >
    {/* Logo and Close Button */}
    <div className='flex justify-center items-center w-full'>
      <div className='w-1/3'></div>
      <img className="w-1/3 mt-5 mb-5 ml-8 self-center" src={logo} alt="Logo" />
      <IoClose onClick={toggleDrawer(false)} className='text-white ml-12 mb-5 text-2xl w-1/3 cursor-pointer' />
    </div>
    <Divider />

    {/* Sidebar Menu (Non-Scrollable) */}
    <List style={{ flexGrow: 1 }}>
      <ListItem style={{ background: isActive === '/create' ? '#A87F0B' : '' }} button onClick={() => handleNavigation('/create')}>
        <ListItemIcon>
          <div className="bg-[#393939] w-9 h-9 rounded-full flex justify-center items-center">
            <img className="w-full" src={create} alt="Create" />
          </div>
        </ListItemIcon>
        <ListItemText primary="Create" primaryTypographyProps={{ style: { fontWeight: 'bold', fontSize: '16px', color: 'white' } }} />
      </ListItem>
      
      <ListItem style={{ background: isActive === '/payment' ? '#A87F0B' : '' }} button onClick={() => handleNavigation('/payment')}>
        <ListItemIcon>
          <div className={`bg-[#393939] w-9 h-9 rounded-full flex justify-center items-center ${isActive === '/payment' ? 'bg-sidec' : ''}`}>
            <img className="w-full" src={payment} alt="Payments" />
          </div>
        </ListItemIcon>
        <ListItemText primary="Payments" primaryTypographyProps={{ style: { fontWeight: 'bold', fontSize: '16px', color: 'white' } }} />
      </ListItem>

      <ListItem style={{ background: isActive === '/history' ? '#A87F0B' : '' }} button onClick={() => handleNavigation('/history')}>
        <ListItemIcon>
          <div className={`bg-[#393939] w-9 h-9 rounded-full flex justify-center items-center ${isActive === '/history' ? 'bg-sidec' : ''}`}>
            <img className="w-full" src={file} alt="History" />
          </div>
        </ListItemIcon>
        <ListItemText primary="All Kameties" primaryTypographyProps={{ style: { fontWeight: 'bold', fontSize: '16px', color: 'white' } }} />
      </ListItem>

      <ListItem style={{ background: isActive === '/more' ? '#A87F0B' : '' }} button sx={{ mb: '9px' }} onClick={() => handleNavigation('/more')}>
        <ListItemIcon>
          <div className="bg-[#393939] w-9 h-9 rounded-full flex justify-center items-center">
            <img className="w-full" src={more} alt="More" />
          </div>
        </ListItemIcon>
        <ListItemText primary="Settings" primaryTypographyProps={{ style: { fontWeight: 'bold', fontSize: '16px', color: 'white' } }} />
      </ListItem>
    </List>

    <Divider />

    {/* Logout Button (Fixed at Bottom) */}
    <div 
      onClick={handleLogoutAlert}
      className="w-full h-[65px] bg-[#545454] flex items-center pl-7 cursor-pointer shadow-[inset_-2px_-9px_17.6px_0px_#0000004D] hover:bg-[#6b6b6b] hover:shadow-[inset_-2px_-9px_20px_0px_#00000070] mt-auto "
    >
      <div className="w-11 h-11 rounded-full flex justify-center items-center">
        <img className="w-11" src={logout} alt="Logout" />
      </div>
      <p className="text-white ml-4 text-[16px] font-bold hover:text-gray-300">Log Out</p>
    </div>
  </div>
</Drawer>




<Modal open={logoutAlert} onClose={handleLogoutAlert}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
           maxWidth:"430px",
            width: "90%",
            bgcolor: '#373737',
            color: "white",
            outline: "none",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h7" component="h2" >
            Are you sure you want to logout this account?
          </Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <button className='bg-[#4B5563] text-white mr-5 h-[35px] rounded-md w-[100px]' onClick={handleLogoutAlert}>
              No
            </button>
            <button className='bg-[#A87F0B] h-[35px] rounded-md w-[100px]' onClick={() => { return handleLogoutout() }} >
              Yes
            </button>
          </Box>
        </Box>
      </Modal>
</>
  );
}
