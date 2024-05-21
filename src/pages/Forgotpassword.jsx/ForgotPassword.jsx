import React from 'react'
import reset from '../../images/reset.png'
import logo from '../../images/Kameti (1).png'
import { Link } from 'react-router-dom';
import { RiWhatsappFill } from "react-icons/ri";


export default function ForgotPassword() {

  return (
   <>
   <div className='w-[100%] flex bg-black h-[100vh] justify-center items-center'>
   <div className='w-[50%] bg-customBlack h-[90vh] rounded-[20px] flex justify-center items-center'>
   <img className='w-[60%]' src={reset}/>
   </div>
   <div className='w-[45%]  h-[90vh] rounded-[20px] flex justify-center flex-col items-center'>
   <img className='w-[30%] mb-5' src={logo}/>
   <h1 className='text-[#A87F0B] text-[20px] mb-2'>Need Password?</h1>
   <p className='text-[white] text-[15px] mb-5'>Enter your details and we’ll send you the password in few minutes.</p>
   <div className='flex w-[65%] items-center relative'>
   <input className='bg-black border text-white outline-none border-gray-400 rounded-[30px] h-[50px] w-[100%] p-5 pr-[35%]  ' type='text' placeholder='Phone Number' />
   <button className='bg-[#A87F0B] absolute right-0 rounded-[30px] h-[50px] text-[20px] w-[30%]'>Send</button> 
   </div>
   <p className='text-[#A87F0B] text-[15px] mt-5'>Or Try Our WhatsApp Support?</p>
   <p className='text-white mt-2 mb-5'>Contact us on WhatsApp for a fastest supports</p>
   <button className='bg-[#07E259] rounded-[30px] h-[50px] text-[20px] w-[65%] flex justify-center items-center'><RiWhatsappFill className='text-[23px] mr-1'/>WhatsApp Support</button> 
   <Link to="/signin" className='bg-[#A87F0B] rounded-[30px] h-[50px] text-[20px] w-[30%] mt-10 flex justify-center'><button className='text-black'>Go Back</button> </Link>
   </div>
   </div>
   
   </>
  )
}
