import React,{useState} from 'react'
import signup from '../../images/signup.png'
import logo from '../../images/Kameti (1).png'
import { Link } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(true);
  // const [emailSelected, setEmailSelected] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setresponseMessage] = useState('');

  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${apiBaseUrl}register`, {
        email: email, 
        phoneNum: phone,
        password: password, 
        loginWith: "signup",
        fcmtoken : 'asdf',
        platform : 'web',
        userType : 'user'
      });
      setresponseMessage('Sign-up successful! Redirecting...');
      // console.error('Sign-up success:', response?.data?.data?.id);
      localStorage.setItem('id',response?.data?.data?.id);
      localStorage.setItem('token',response?.data?.data?.token);
      window.location.href = '/create';
    } catch (error) {
      // Handle sign-in error (e.g., display error message to the user)
      setresponseMessage(error?.response?.data?.message);
      // console.error('Sign-up error:', error);
    }
  };

  return (
   <>
   <div className='w-[100%] flex bg-black h-[100vh] justify-center items-center'>
   <div className='w-[50%] bg-customBlack h-[90vh] rounded-[20px] flex justify-center items-center'>
   <img className='w-[60%]' src={signup}/>
   </div>
   <div className='w-[45%]  h-[90vh] rounded-[20px] flex justify-center flex-col items-center'>
   <img className='w-[30%] mb-10' src={logo}/>
   <div className='flex w-2/5 items-center relative'>
    {/* <div className='bg-black border text-white outline-none border-[#A87F0B] rounded-[30px] h-[45px] w-[100%] pl-[165px]'>
      <button className=' absolute left-0 rounded-[30px] h-[45px] text-[20px] w-[53%]' onClick={()=>setEmailSelected(false)} style={!emailSelected?{backgroundColor:"#A87F0B",color:'black'}:null}>Phone</button>
      <button className=' text-white absolute right-0 rounded-[30px] h-[45px] text-[20px] w-[53%]' onClick={()=>setEmailSelected(true)} style={emailSelected?{backgroundColor:"#A87F0B",color:'black'}:null}>Email</button>
    </div> */}
  </div>
  {responseMessage && <p className="text-white mt-3 w-[58%]">{responseMessage}</p>}
  <input className='bg-black border text-white outline-none	 border-gray-400 rounded-[30px] h-[50px] w-[60%] p-5 mt-5 ' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

   <input className='bg-black border text-white outline-none	 border-gray-400 rounded-[30px] h-[50px] w-[60%] p-5 mt-5 ' type='text' placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)} />
 
   <div className='bg-black flex items-center  border border-gray-400 rounded-[30px] h-[50px] w-[60%] p-5 mt-5 mb-5'>
   <input  className=' bg-black w-[100%] h-[20px] outline-none	 text-white' type={showPassword ? 'password' : 'text'} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
   {showPassword ? (
    <FaRegEyeSlash className='text-white ml-2 text-[22px]' onClick={() => setShowPassword(false)} />
  ) : (
    <MdOutlineRemoveRedEye className='text-white ml-2 text-[22px]' onClick={() => setShowPassword(true)} />
  )}</div>
  <button className='bg-[#A87F0B] rounded-[30px] h-[50px] text-[20px] w-[60%] flex justify-center' onClick={handleSignup}>Sign Up</button>
   <p className='text-[white] mt-10'>Already have an account?<Link to='/signin' className='text-[#A87F0B] ml-1'>Sign in</Link></p>
   </div>
   </div>
   
   </>
  )
}
