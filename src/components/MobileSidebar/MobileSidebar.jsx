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
      height: '100vh', // Full height of the viewport
    },
  }}
  open={drawerOpen}
  onClose={toggleDrawer(false)}
>
  <div
    style={{ width: 240, }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
  
  <div className='flex justify-center items-center w-[100%] '>
  <div className='w-[33%]'></div>
    <img className="w-[33%] mt-5  mb-5 ml-8 self-center" src={logo} alt="Logo" />
    <IoClose      onClick={toggleDrawer(false)} className='text-white ml-[50px] mb-5  text-[30px] w-[33%] ' />
    </div>
    <Divider />
    <List style={{ flexGrow: 1 }}>
      <ListItem style={{background:isActive =='/create' ? '#A87F0B' : ''}} button onClick={() => handleNavigation('/create')}>
        <ListItemIcon>
          <div
            className={`bg-[#393939] w-[35px] h-[35px] rounded-[50%] justify-center flex items-center `}
            
          >
            <img className="w-[100px]" src={create} alt="Create" />
          </div>
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            style: { fontWeight: 'bold', fontSize: '16px', color: 'white' },
          }}
          primary="Create"
        />
      </ListItem>
      <ListItem style={{background:isActive =='/payment' ? '#A87F0B' : ''}} button onClick={() => handleNavigation('/payment')}>
        <ListItemIcon>
          <div
            className={`bg-[#393939] w-[35px] h-[35px] rounded-[50%] justify-center flex items-center ${
              isActive == '/payment' ? 'bg-sidec' : ''
            }`}
          >
            <img className="w-[100px]" src={payment} alt="Payments" />
          </div>
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            style: { fontWeight: 'bold', fontSize: '16px', color: 'white' },
          }}
          primary="Payments"
        />
      </ListItem>
      <ListItem style={{background:isActive =='/history' ? '#A87F0B' : ''}} button onClick={() => handleNavigation('/history')}>
        <ListItemIcon>
          <div
            className={`bg-[#393939] w-[35px] h-[35px] rounded-[50%] justify-center flex items-center ${
              isActive == '/history' ? 'bg-sidec' : ''
            }`}
          >
            <img className="w-[100px]" src={file} alt="History" />
          </div>
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            style: { fontWeight: 'bold', fontSize: '16px', color: 'white' },
          }}
          primary="All Kameties"
        />
      </ListItem>
      <ListItem
      style={{background:isActive =='/more' ? '#A87F0B' : ''}}
        button
        sx={{ mb: '9px' }}
        onClick={() => handleNavigation('/more')}
      >
        <ListItemIcon>
          <div
            className={`bg-[#393939]  w-[35px] h-[35px] rounded-[50%] justify-center flex items-center `}
          >
            <img className="w-[100px]" src={more} alt="More" />
          </div>
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            style: { fontWeight: 'bold', fontSize: '16px', color: 'white' },
          }}
          primary="Settings"
        />
      </ListItem>
    </List>
    <Divider />
    <div
      onClick={handleLogoutAlert}
      className={`w-[100%] absolute bottom-0 h-[65px] bg-sidebar pl-7 flex items-center cursor-pointer bg-[#545454] shadow-[inset_-2px_-9px_17.6px_0px_#0000004D] hover:bg-[#6b6b6b] hover:shadow-[inset_-2px_-9px_20px_0px_#00000070]`}
    >
      <div className={`w-[45px] h-[45px] rounded-[50%] justify-center flex items-center`}>
        <img className="w-[45px]" src={logout} alt="Logout" />
      </div>
      <p className="text-white ml-4 text-[16px] font-bold hover:text-gray-300">
        Log Out
      </p>
    
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
