import React from 'react'
import logo from '../../images/Kameti (1).png'
import create from '../../images/create.png'
import payment from '../../images/payment2.png'
import file from '../../images/history2.png'
import more from '../../images/more2.png'

import { useNavigate,useLocation } from 'react-router-dom'
export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const handleNavigation = (path) => {
      navigate(path);
    };
    const isActive = (path, activeColor, inactiveColor) => {
        return location.pathname === path ? activeColor : inactiveColor;
      };
      const isActive1 = (path, activeColor, inactiveColor) => {
        return location.pathname === path ? activeColor : inactiveColor;
      };
  return (
 <>
 <div className='w-[25%] rounded-l-[20px] bg-maincolor h-[90vh] flex flex-col items-center '>
    <img className='w-[45%] mt-5' src={logo}/>
    <div className={`w-[90%] h-[50px] mt-10 rounded-[22px] bg-sidebar pl-7 flex items-center cursor-pointer ${isActive('/create', 'bg-sidecircle', '')}`} onClick={() => handleNavigation('/create')}>
    <div className={`bg-[#393939] w-[35px] h-[35px] rounded-[50%] justify-center flex items-center ${isActive('/create', 'bg-sidec', '')}`}>
     <img className='w-[20px]' src={create}/>
     </div>
     <p className='text-white ml-4 text-[18px]'>Create</p>
     
    </div>
    <div className={`w-[90%] h-[50px] mt-5 rounded-[22px] bg-sidebar pl-7 flex items-center cursor-pointer ${isActive('/payment', 'bg-sidecircle', '')}`} onClick={() => handleNavigation('/payment')}>
    <div className={`bg-[#393939] w-[35px] h-[35px] rounded-[50%] justify-center flex items-center ${isActive('/payment', 'bg-sidec', '')}`}>
    <img className='w-[20px]' src={payment}/>
    </div>
    <p className='text-white ml-4 text-[18px]'>Payments</p>
    
   </div>
   <div className={`w-[90%] h-[50px] mt-5 rounded-[22px] bg-sidebar pl-7 flex items-center cursor-pointer ${isActive('/history', 'bg-sidecircle', '')}`} onClick={() => handleNavigation('/history')}>
   <div className={`bg-[#393939] w-[35px] h-[35px] rounded-[50%] justify-center flex items-center ${isActive('/history', 'bg-sidec', '')}`}>
   <img className='w-[20px]' src={file}/>
   </div>
   <p className='text-white ml-4 text-[18px]'>History</p>
   
  </div>
  <div className={`w-[90%] h-[50px] mt-5 rounded-[22px] bg-sidebar pl-7 flex items-center cursor-pointer ${isActive('/more', 'bg-sidecircle', '')}`} onClick={() => handleNavigation('/more')}>
  <div className={`bg-[#393939] w-[35px] h-[35px] rounded-[50%] justify-center flex items-center ${isActive('/more', 'bg-sidec', '')}`}>
  <img className='h-[16px]' src={more}/>
  </div>
  <p className='text-white ml-4 text-[18px]'>More</p>
  
 </div>
    </div>
 </>
  )
}
