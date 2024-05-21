import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import profile from '../../images/paymentImage/Ellipse 31.png'
import editimg from '../../images/paymentImage/Edit.png'
import  delete1 from '../../images/paymentImage/Folder (1).png'
import folder from '../../images/paymentImage/Medical record.png'
export default function More() {
  return (
 <>
 <div className='w-[100%] h-[100vh] flex justify-center items-center bg-black'>
 <div className='w-[97%] rounded-[40px] h-[90vh] flex  '>
<Sidebar/>
 <div className='w-[75%] bg-maincolor ml-[2px] rounded-r-[20px]'>
 <div className='w-[100%] flex justify-between items-center mt-6 border-b-[2px] border-[black] '>
 <h1 className='text-[#A87F0B] text-[25px] font-bold ml-10 mb-6'>More</h1>
 </div>
 <div className='w-[100%] flex justify-center items-center flex-col'>
 <div className='w-[90%] rounded-[20px] h-[120px] bg-[#343434] mt-1 flex justify-between items-center'>
 <div className='flex justify-center items-center ml-5'>
 <img className='w-[100px]' src={profile} />
 <div className='flex justify-center items-start flex-col ml-5'>
 <h1 className='text-white font-bold text-[16px]'>Rocky D.</h1>
 <p className='text-[white] text-[10px]'>03042323456</p>
 </div>
 </div>
 <button className='flex mr-5 justify-center items-center w-[120px] h-[29px] rounded-[30px]  text-white text-[12px] bg-paytxt1'>Edit Profile {'\u00A0'}<img className='w-[15px]' src={editimg}/></button>
 </div>
 <div className='w-[90%] rounded-[20px] h-[250px] bg-[#343434] mt-2'>
 <div className='flex  justify-center items-center w-[100%] flex-wrap '>
 <div className='w-[20%] m-3  h-[110px] rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
  <img className='w-[30px]' src={folder}/>
  <h2 className='text-white text-[13px] mt-1'>All Records</h2>
  </div>
  <div className='w-[20%] m-3  h-[110px] rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
  <img className='w-[30px]' src={delete1}/>
  <h2 className='text-white text-[13px] mt-1'>All Records</h2>
  </div>
  <div className='w-[20%] m-3  h-[110px] rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
 
  </div>
  <div className='w-[20%] m-3  h-[110px] rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
 
  </div>
  </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </>
  )
}
