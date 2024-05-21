import React,{useState} from 'react'
import sigin from '../../images/login.png'
import logo from '../../images/Kameti (1).png'
import { Link } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(true);
  const [emailSelected, setEmailSelected] = useState(false);
  return (
   <>
   <div className='w-[100%] flex bg-black h-[100vh] justify-center items-center'>
   <div className='w-[50%] bg-customBlack h-[90vh] rounded-[20px] flex justify-center items-center'>
   <img className='w-[60%]' src={sigin}/>
   </div>
   <div className='w-[45%]  h-[90vh] rounded-[20px] flex justify-center flex-col items-center'>
   <img className='w-[30%] mb-10' src={logo}/>
   <div className='flex w-2/5 items-center relative'>
    <div className='bg-black border text-white outline-none border-[#A87F0B] rounded-[30px] h-[45px] w-[100%] pl-[165px]'>
      <button className=' absolute left-0 rounded-[30px] h-[45px] text-[20px] w-[53%]' onClick={()=>setEmailSelected(false)} style={!emailSelected?{backgroundColor:"#A87F0B",color:'black'}:null}>Phone</button>
      <button className=' text-white absolute right-0 rounded-[30px] h-[45px] text-[20px] w-[53%]' onClick={()=>setEmailSelected(true)} style={emailSelected?{backgroundColor:"#A87F0B",color:'black'}:null}>Email</button>
    </div>
  </div>
{emailSelected ?(
  <input className='bg-black border text-white outline-none	 border-gray-400 rounded-[30px] h-[50px] w-[60%] p-5 mt-5 ' type='email' placeholder='Email' />
):(
   <input className='bg-black border text-white outline-none	 border-gray-400 rounded-[30px] h-[50px] w-[60%] p-5 mt-5 ' type='text' placeholder='Phone Number' />
  )}
   <div className='bg-black flex items-center border border-gray-400 rounded-[30px] h-[50px] w-[60%] p-5 mt-5 mb-3'>
   <input  className=' bg-black w-[100%] h-[20px] outline-none	 text-white' type={showPassword ? 'password' : 'text'} placeholder='Password'/>
   {showPassword ? (
    <FaRegEyeSlash className='text-white ml-2 text-[22px]' onClick={() => setShowPassword(false)} />
  ) : (
    <MdOutlineRemoveRedEye className='text-white ml-2 text-[22px]' onClick={() => setShowPassword(true)} />
  )}</div>
  <div className='w-[55%]'>
  <Link to='/forgot' className='text-[#A87F0B] text-[15px] flex justify-end mb-3 '>Forgot Password?</Link>
  </div>
   <Link to='/create' className='bg-[#A87F0B] rounded-[30px] h-[50px] text-[20px] w-[60%] flex justify-center'><button>Sign In</button> </Link>
   <p className='text-[white] mt-10'>Don’t have an account?<Link to='/signup' className='text-[#A87F0B] ml-1'>Sign Up</Link></p>
   </div>
   </div>
   
   </>
  )
}
