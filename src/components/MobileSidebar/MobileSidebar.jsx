import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../images/Kameti (1).png';
import create from '../../images/create.png';
import payment from '../../images/payment2.png';
import file from '../../images/history2.png';
import more from '../../images/more2.png';

export default function MobileSidebar({ drawerOpen, toggleDrawer }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (paths) => {
    if (!Array.isArray(paths)) paths = [paths];
    return paths.includes(location.pathname);
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  return (
    <Drawer
      anchor="left"
      sx={{ '& .MuiDrawer-paper': { backgroundColor: '#444343' } }} 
      open={drawerOpen}
      onClose={toggleDrawer(false)}
    >
      <div
        style={{ width: 280 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <img className='w-[45%] mt-5 ml-5 mb-5' src={logo} alt="Logo" />
        <Divider />
        <List>
          <ListItem button onClick={() => handleNavigation('/create')}>
            <ListItemIcon>
              <div className={`bg-[#393939] w-[35px] h-[35px]  rounded-[50%] justify-center flex items-center ${isActive('/create') ? 'bg-sidec' : ''}`}>
                <img className='w-[20px]' src={create} alt="Create" />
              </div>
            </ListItemIcon>
            <ListItemText   primaryTypographyProps={{ style: { fontWeight: 'bold', fontSize: '16px',color:"white" } }}   primary="Create" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/payment')}>
            <ListItemIcon>
              <div className={`bg-[#393939] w-[35px] h-[35px] rounded-[50%] justify-center flex items-center ${isActive('/payment') ? 'bg-sidec' : ''}`}>
                <img className='w-[20px]' src={payment} alt="Payments" />
              </div>
            </ListItemIcon>
            <ListItemText   primaryTypographyProps={{ style: { fontWeight: 'bold', fontSize: '16px',color:"white" } }}   primary="Payments" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/history')}>
            <ListItemIcon>
              <div className={`bg-[#393939] w-[35px] h-[35px] rounded-[50%] justify-center flex items-center ${isActive('/history') ? 'bg-sidec' : ''}`}>
                <img className='w-[20px]' src={file} alt="History" />
              </div>
            </ListItemIcon>
            <ListItemText   primaryTypographyProps={{ style: { fontWeight: 'bold', fontSize: '16px',color:"white" } }}  primary="History" />
          </ListItem>
          <ListItem button  sx={{ mb: '9px' }}  onClick={() => handleNavigation('/more')}>
            <ListItemIcon>
              <div className={`bg-[#393939]  w-[35px] h-[35px] rounded-[50%] justify-center flex items-center ${isActive(['/more', '/delete', '/allrecords']) ? 'bg-sidec' : ''}`}>
                <img className='h-[16px] ' src={more} alt="More" />
              </div>
            </ListItemIcon>
            <ListItemText   primaryTypographyProps={{ style: { fontWeight: 'bold', fontSize: '16px',color:"white" } }}  primary="More" />
          </ListItem>
          <Divider />
       
        </List>
      </div>
    </Drawer>
  );
}
