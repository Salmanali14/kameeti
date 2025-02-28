import React, { useState } from 'react';
import signup from '../../images/signup.png';
import logo from '../../images/layerImage.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';
import toast from "react-hot-toast";

import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';


import phoneIcon from '../../images/auth/phone.png';
import passwordIcon from '../../images/auth/password.png';
import emailIcon from '../../images/auth/email.png';
import addressIcon from '../../images/auth/address.png';
import nameIcon from '../../images/auth/name.png';
import { ClipLoader } from 'react-spinners';


export default function Signup() {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [btnloader, setBTnloader] = useState(false);
  const [responseMessage, setresponseMessage] = useState('');
  const [userType, setUserType] = useState('user');

  let navigate = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignup = async () => {
    const toastId = "signupToast"; // Unique toast ID
  
    // Clear any previous toasts
    toast.dismiss(toastId);
  
    if (!fullname) {
      toast.error("Name is required.", { id: toastId });
      return;
    }
  
    if (!username) {
      toast.error("Username is required.", { id: toastId });
      return;
    }
  
    if (!email) {
      toast.error("Email is required.", { id: toastId });
      return;
    }
  
    if (!validateEmail(email)) {
      toast.error("Invalid email format.", { id: toastId });
      return;
    }
  
    if (!phone) {
      toast.error("Phone number is required.", { id: toastId });
      return;
    }
  
    if (!password) {
      toast.error("Password is required.", { id: toastId });
      return;
    }
  
    if (!ConfirmPassword) {
      toast.error("Confirm password is required.", { id: toastId });
      return;
    }
  
    if (password !== ConfirmPassword) {
      toast.error("Passwords do not match.", { id: toastId });
      return;
    }
  
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", { id: toastId });
      return;
    }
  
    setBTnloader(true);
  
    try {
      const response = await axios.post(`${apiBaseUrl}register`, {
        email: email,
        phoneNumber: phone,
        password: password,
        loginWith: "signup",
        fcmtoken: "asdf",
        platform: "web",
        userType: userType,
        username: username,
        fullName: fullname,
      });
  
      toast.success("Successfully signed up!", { id: toastId });
  
      localStorage.setItem("id", response?.data?.data?.id);
      localStorage.setItem("token", response?.data?.data?.token);
  
      setTimeout(() => {
        navigate("/create");
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed", { id: toastId });
    } finally {
      setBTnloader(false);
    }
  };
  
  
  let screenwidth =window.innerWidth
  return (
    <>
     <div className="flex bg-gradient-to-l from-[#A87F0B] to-[#000000] min-h-[100vh] justify-center items-center">
  {/* Left Section: Laptop and Mobile */}
    {/* Right Section: Sign-up Form */}
    <div className="sm:w-[50%] w-[90%] min-h-[90vh]  flex flex-col justify-center items-center ">
    <h1 className="text-[40px] text-white font-bold mt-8">Sign Up</h1>
    <p className="text-white mb-5">Create an Account to Continue</p>
    {responseMessage && <p className="text-white sm:mt-3 mt-5 w-[58%]">{responseMessage}</p>}
  <div className="bg-[#6A6A6A80] flex items-center  rounded-[10px] h-[50px] sm:w-[70%] w-[100%] p-5 sm:mt-3 mt-5">
  <img src={nameIcon} width="23px" className='mr-2'/>
    
    <input
     className=" w-[100%] outline-none text-white"
      type="text"
      placeholder="Name"
      onChange={(e) => setFullname(e.target.value)}
      style={{
        WebkitTextFillColor: "white",
        backgroundColor: "transparent",
        caretColor: "white",
        transition: "background-color 5000s ease-in-out 0s",
      }}
    />
    </div>
  <div className="bg-[#6A6A6A80] flex items-center  rounded-[10px] h-[50px] sm:w-[70%] w-[100%] p-5 sm:mt-3 mt-5">
    <img src={nameIcon} width="23px" className='mr-2'/>

    <input
      className="w-[100%] outline-none text-white"
      type="text"
      placeholder="Username"
      onChange={(e) => setUsername(e.target.value)}
      style={{
        WebkitTextFillColor: "white",
        backgroundColor: "transparent",
        caretColor: "white",
        transition: "background-color 5000s ease-in-out 0s",
      }}
    />
    </div>

    <div className="bg-[#6A6A6A80] flex items-center rounded-[10px]  h-[50px] sm:w-[70%] w-[100%] p-5 sm:mt-3 mt-5">
          <img src={phoneIcon} width="23px" className='mr-2'/>
      
      <PhoneInput
        country={"pk"}
        value={phone}
        onChange={setPhone}
        inputStyle={{
          background: "transparent",
          color: "white",
          border: "none",
          width: "100%",
          height: "100%",
        }}
        buttonStyle={{
          background: "transparent",
          border: "none",
        }}
        containerStyle={{
          width: "100%",
        }}
        dropdownStyle={{
          background: "black",
          color: "white",
          border: "1px solid #9ca3af",
        }}
      />
    </div>
  <div className="bg-[#6A6A6A80] flex items-center  rounded-[10px] h-[50px] sm:w-[70%] w-[100%] p-5 sm:mt-3 mt-5">
  <img src={emailIcon} width="23px" className='mr-2'/>

    <input
        className="bg-transparent w-[100%] outline-none text-white"
      
      type="email"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      style={{
        WebkitTextFillColor: "white",
        backgroundColor: "transparent",
        caretColor: "white",
        transition: "background-color 5000s ease-in-out 0s",
      }}
    />
    </div>
    <div className="bg-[#6A6A6A80] flex items-center  rounded-[10px] h-[50px] sm:w-[70%] w-[100%] p-5 sm:mt-3 mt-5">
  <img src={passwordIcon} width="23px" className='mr-2'/>

      <input
        className="bg-transparent w-[100%] outline-none text-white"
        type={showPassword ? "password" : "text"}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          WebkitTextFillColor: "white",
          backgroundColor: "transparent",
          caretColor: "white",
          transition: "background-color 5000s ease-in-out 0s",
        }}
      />
      {showPassword ? (
        <FaRegEyeSlash
          className="text-white ml-2 text-[22px] cursor-pointer"
          onClick={() => setShowPassword(false)}
        />
      ) : (
        <MdOutlineRemoveRedEye
          className="text-white ml-2 text-[22px] cursor-pointer"
          onClick={() => setShowPassword(true)}
        />
      )}
      
    </div>
    <div className="bg-[#6A6A6A80] flex items-center rounded-[10px] h-[50px] sm:w-[70%] w-[100%] p-5 sm:mt-3 mt-5">
        <img src={passwordIcon} width="23px" className="mr-2" />
        <input
          className="bg-transparent w-[100%] outline-none text-white"
          type={showConfirmPassword ? "password" : "text"}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            WebkitTextFillColor: "white",
            backgroundColor: "transparent",
            caretColor: "white",
            transition: "background-color 5000s ease-in-out 0s",
          }}
        />
        {showConfirmPassword ? (
          <FaRegEyeSlash
            className="text-white ml-2 text-[22px] cursor-pointer"
            onClick={() => setShowConfirmPassword(false)}
          />
        ) : (
          <MdOutlineRemoveRedEye
            className="text-white ml-2 text-[22px] cursor-pointer"
            onClick={() => setShowConfirmPassword(true)}
          />
        )}
      </div>
    <div className="bg-[#6A6A6A80] flex items-center  rounded-[10px] h-[50px] sm:w-[70%] w-[100%] p-5 sm:mt-3 mt-5">
    <img src={addressIcon} width="23px" className='mr-2'/>

    <input
               className="bg-transparent w-[100%] outline-none text-white"
      
      type="text"
      placeholder="Address"
      // onChange={(e) => setEmail(e.target.value)}
      style={{
        WebkitTextFillColor: "white",
        backgroundColor: "transparent",
        caretColor: "white",
        transition: "background-color 5000s ease-in-out 0s",
      }}
    />
    </div>
    <button
      className="bg-[#A87F0B] text-white rounded-[10px] h-[50px] sm:w-[70%] w-[100%] flex justify-center items-center p-3 sm:mt-3  mt-5 sm:mt-5"
      style={{ boxShadow: '-4px -6px 6.8px 0px rgba(0, 0, 0, 0.25) inset' }}
      onClick={handleSignup}
      disabled={btnloader}
    >
    
    {btnloader ? (
      <ClipLoader size={25} color="#ffffff" className="" />
    ):
    "Sign Up"
    }
    </button>
    <p className="text-[white] sm:mt-2 mt-5 mb-5">
      Already have an account?
      <Link to="/signin" className="text-[#A87F0B] ml-1">
        Sign In
      </Link>
    </p>
  </div>
  {screenwidth > 430 && (
  
          <div className="hidden sm:flex w-[50%] h-full justify-center items-center">

          <div className="relative flex justify-center items-center">
            <img className="w-[100%] z-10" src={logo} alt="Laptop" />
         
          </div>
        </div>
  )}


</div>


    </>
  );
}
