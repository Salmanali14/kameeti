import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import profile1 from '../../images/salman.png'
import editimg from '../../images/paymentImage/Edit.png'
import  delete1 from '../../images/paymentImage/Folder (1).png'
import folder from '../../images/paymentImage/Medical record.png'
import  support from '../../images/Support.png'
import  star from '../../images/Star.png'
import  avatar from '../../images/Group 661 (2).png'

import  share from '../../images/Sharing.png'
import  protection from '../../images/Protection.png'
import  power from '../../images/log.png'
import  noti from '../../images/Notification.png'
import { useNavigate } from 'react-router-dom'
import { Box, Modal, Typography } from '@mui/material'
import Toggle from '../../components/Toggle.jsx/Toggle'
import { FaImage } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Cropper from '../../components/Cropper/Cropper'
import axios from 'axios'
import { ClipLoader, FadeLoader } from 'react-spinners'
import Share from '../ShareSocial/Share'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosInformationCircleOutline } from 'react-icons/io'
import InfoModal from '../../components/InfoModal/InfoModal'



export default function More() {
 
  const [btnloader,setBTnloader]=useState(false)
  let [cropModal, setcropModal] = useState(false);
  const [profile, setProfile] = useState('');
  const [profileImage, setProfileImage] = useState('');
  let [myprflimg, setmyprflimg] = useState(null);
  const [payments, setPayments] = useState([]);
  const [key, setKey] = useState('');
  let [cropPrfl, setCropPrfl] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });
  const handleclosecropper =()=>{

      setcropModal(false)
     }

  let [tempimg, settempimg] = useState(null)
  const [loading, setLoading] = useState(false);

  const getPayments = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}payment`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
      });
      console.log(response);
      setPayments(response?.data?.data ? response?.data?.data : []);
    } catch (error) {
      // console.error('Error fetching payments:', error);


    }
  };
  useEffect(() => {
    getPayments(); // Fetch payments when the component mounts
  }, []);
 
  let handleImageChange = (event) => {
      // profileImage
      setProfile("");
      const { files } = event.target;
    
      // setKey(key + 1);
      if (files && files?.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.addEventListener("load", () => {
          setProfile(reader.result);
          setKey(key+1)
          setcropModal(true);
        });
      } else {
        // If no file selected (e.g., user canceled cropping), clear the input field
        event.target.value = null;
      }
    };


  const navigate = useNavigate();
  let handleLogoutout = () =>{
    localStorage.removeItem("id")
    navigate("/signin")
  }
  const [deleteaccount, setDeleteaccount] = useState(false);
  const handledelete=()=>{
    setDeleteaccount(!deleteaccount)
  }
  const [edit, setEdit] = useState(false);
  const handleedit=()=>{
    setEdit(!edit)
  }

  let handleHistorydelete=()=>{
    navigate("/delete")
  }
  let handleallrecords=()=>{
    navigate("/allrecords")
  }
  let [name,setName]=useState("")
  let [address,setAddress]=useState("")
  let [phone,setPhone]=useState("")
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem('token');

console.log(tempimg)

const base64ToFile = async (base64String, fileName) => {
  const res = await fetch(base64String);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
};

const handleProfileUpdate = async () => {
  setBTnloader(true)
  try {
      let file;
      if (tempimg.startsWith('data:image')) {
          file = await base64ToFile(tempimg, 'profileImage.jpg');
      } else {
          file = userData?.profileUrl;
      }

      const formData = new FormData();
      formData.append('fullName', name);
      formData.append('location', address);
      if (typeof file === 'string') {
          formData.append('profileUrl', file); // existing URL
      } else {
          formData.append('profileUrl', file); // new file
      }
      formData.append('phoneNum', phone);

      // Log the FormData entries for debugging
      for (let pair of formData.entries()) {
          console.log(`${pair[0]}, ${pair[1]}`);
      }

      const response = await axios.post(`${apiBaseUrl}users/edit-profile`, formData, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
          }
      });

      // Handle the response
      if (response?.data?.message) {
        toast.success(response.data.message);
        setBTnloader(false)
      } else {
          toast.success('User data updated successfully');
          setBTnloader(false)
      }
      handleedit();
      fetchUserData();
  } catch (error) {
      // Handle errors
      setBTnloader(false)
      console.error('Error details:', error);
      const errorMessage = error?.response?.data?.message || 'An error occurred. Please try again later.';
      alert(errorMessage);
  }
};






  const [userData, setUserData] = useState(null);
  console.log(userData)
  const fetchUserData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${apiBaseUrl}getUser`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData(response?.data?.data);
      settempimg(response?.data?.data.profileUrl)
      setPhone(response?.data?.data.phoneNum)
      setAddress(response?.data?.data.location)
      setName(response?.data?.data.fullName)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
 
  let [isModalOpen,setisModalOpen] =useState(false)
  let [info,setInfo] =useState(false)
  let [shareinfo,setShare] =useState(false)
  let [recordinfo,setRecordinfo] =useState(false)
  let [deleteinfo,setDeleteInfo] =useState(false)


  let handleinfoRecord =()=>{
    setRecordinfo(true)
  }
  let handleinfoDelete =()=>{
    setDeleteInfo(true)
  }
  let handleinfoShare =()=>{
    setShare(true)
  }

  let handleopenshare =()=>{
    setisModalOpen(true)
 }
 let handleopenInfo =()=>{
  setInfo(true)
}

 let handleCloseshare =()=>{
    setisModalOpen(false)
    setInfo(false)
    setShare(false)
    setDeleteInfo(false)
    setRecordinfo(false)
 }
 const [deletedKametees, setDeletedKametees] = useState(null);
 const fetchKametees = async () => {
    setLoading(true)
   try {
     const response = await axios.get(`${apiBaseUrl}deletedRecords`, {
       headers: {
         Authorization: `Bearer ${token}`
       }
     });
     setDeletedKametees(response?.data?.data);
     setLoading(false)
   } catch (error) {
     console.error('Error fetching data:', error);
   }
 };

 useEffect(() => {
   fetchKametees();
 }, []);

  return (
 <>
 <Cropper
 cropModal={cropModal}
 handleclosecropper={handleclosecropper}
 theimg={profile}
 myimg={myprflimg}
 setmyimg={setmyprflimg}
 setcrop={setCropPrfl}
 crop={cropPrfl}
 aspect={1 / 1}
 setReduxState={settempimg}
 isCircle={true}
/>
 <div className='w-[100%] h-[100vh] flex justify-center items-center bg-black'>
 <div className='w-[97%] rounded-[40px] h-[95vh] flex  '>
<Sidebar/>
{loading ? (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "75%", height: "100vh",background:"black" }} className="loading-screen">    
<FadeLoader color="#A87F0B" />
  </div>
) : (
 <div className='w-[75%] bg-maincolor ml-[2px] rounded-r-[20px]'>
 <div className='w-[100%] flex justify-between items-center mt-6 border-b-[2px] border-[black] '>
 <h1 className='text-[#A87F0B] text-[25px] font-bold ml-10 mb-6'>More</h1>
 </div>
 <div className='w-[100%] flex justify-center items-center flex-col'>
 <div className='w-[98%] rounded-[20px] h-[120px] bg-[#343434] mt-2 flex justify-between items-center'>
 <div className='flex justify-center items-center ml-5'>
 <img className='w-[100px] h-[100px] rounded-full' src={userData?.profileUrl?userData?.profileUrl:avatar} />
 <div className='flex justify-center items-start flex-col ml-5'>
 <h1 className='text-white font-bold text-[16px]'>{userData?.fullName}</h1>
 <p className='text-[white] mt-1 mb-1 text-[12px]'>{userData?.phoneNum}</p>
 <p className='text-[white] text-[12px]'>{userData?.location}</p>
 {userData?.email &&
  <p className='text-[white] text-[12px]'>{userData?.email}</p>}
 </div>
 </div>
 <button onClick={handleedit} className='flex mr-5 justify-center items-center w-[120px] h-[29px] rounded-[30px]  text-white text-[12px] bg-paytxt1'>Edit Profile {'\u00A0'}<img className='w-[15px]' src={editimg}/></button>
 </div>
 <div className='w-[98%] rounded-[20px] h-[300px] flex justify-center items-center bg-[#343434] mt-2'>
 <div className='flex  justify-center items-center w-[100%] flex-wrap '>
 <div  className='w-[20%] m-3 relative h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
 <IoIosInformationCircleOutline onClick={handleinfoRecord} className='text-[white] absolute right-2 top-2 text-[25px]' />
  <img className='w-[30px]' onClick={handleallrecords} src={folder}/>
  <h2 className='text-white text-[13px] mt-1' onClick={handleallrecords}>All Records ({payments?.length})</h2>
  </div>
  <div  className='w-[20%] m-3 relative  h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
  <IoIosInformationCircleOutline onClick={handleinfoDelete} className='text-[white] absolute right-2 top-2 text-[25px]' />
  <img className='w-[30px]' onClick={handleHistorydelete} src={delete1}/>
  <h2 className='text-white text-[13px] mt-1' onClick={handleHistorydelete}>Delete Records ({deletedKametees?.length})</h2>
  </div>
  <div className='w-[20%] m-3  h-[110px] relative cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
  <IoIosInformationCircleOutline onClick={handleopenInfo} className='text-[white] absolute right-2 top-2 text-[25px]' />

  <img className='w-[30px]' src={noti}/>
  <div className='flex justify-center items-center'>
  <h2 className='text-white text-[13px] mt-1 mr-2'>Notification</h2>
  <Toggle />
  </div>
  </div>
  <div className='w-[20%] m-3 relative h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
  <IoIosInformationCircleOutline onClick={handleinfoShare} className='text-[white] absolute right-2 top-2 text-[25px]' />
  <img className='w-[30px]' onClick={handleopenshare}  src={share}/>
  <h2 className='text-white text-[13px] mt-1' onClick={handleopenshare} >Share</h2>
  </div>
  <div className='w-[20%] m-3  h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
  <img className='w-[30px]' src={protection}/>
  <h2 className='text-white text-[13px] mt-1 '>Privacy Police</h2>
  </div>
  <div className='w-[20%] m-3  h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
  <img className='w-[30px]' src={support}/>
  <h2 className='text-white text-[13px] mt-1 '>Support</h2>
  </div>
  <div className='w-[20%] m-3  h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
  <img className='w-[30px]' src={star}/>
  <h2 className='text-white text-[13px] mt-1'>Rate us</h2>
  </div>
  <div onClick={handledelete} className='w-[20%] m-3  h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
  <img className='w-[30px]' src={power}/>
  <h2 className='text-white text-[13px] mt-1 '>Logout</h2>
  </div>
  </div>
 </div>
 </div>
 </div>
)}
 </div>
 </div>
 <Modal open={deleteaccount} onClose={handleLogoutout}>
 <Box
   sx={{
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 400,
     bgcolor: '#373737',
     color:"white",
  outline:"none",
  borderRadius:"10px",
     boxShadow: 24,
     p: 4,
   }}
 >
   <Typography variant="h7" component="h2" >
     Are you sure you want to logout this account?
   </Typography>
   <Box mt={2} display="flex" justifyContent="flex-end">
     <button className='bg-[#4B5563] text-white mr-5 h-[35px] rounded-md w-[100px]' onClick={handledelete}>
       No
     </button>
     <button className='bg-[#A87F0B] h-[35px] rounded-md w-[100px]' onClick={() => { return handleLogoutout() }} >
     Yes
   </button>
   </Box>
 </Box>
</Modal>
<Modal open={edit} onClose={handleedit}>
<Box
  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#181818',
    color:"white",
 outline:"none",
 borderRadius:"10px",
    boxShadow: 24,
    p: 4,
  }}
>
<div className='flex justify-center flex-col items-center w-[100%]'>
<div className='flex w-[100%]'>
<div className='flex justify-between items-center w-[100%]'>
<p className='text-[#A87F0B] font-[600]'>Edit Profile</p>
<div onClick={handleedit} className='flex justify-center items-center w-[25px] h-[25px] rounded-full bg-[#747474]'>
<IoClose/>
</div>
</div>
</div>
<div className='flex justify-center items-center flex-col mt-5 w-[100%]'>
<div className='h-[120px] w-[120px] border rounded-full absolute  top-[50px] '>

<label htmlFor="img" className='w-[0px] h-[0px] absolute top-[95px] left-[86px]'>
    <div className=' border rounded-full w-[20px] h-[20px] flex justify-center items-center text-sm font-[1500] text-white bg-blue-400' >+</div>
    <input key={key} type="file" name="img" id='img' className='opacity-0 w-[0px] h-[0px]' onChange={handleImageChange} />

</label>
<img src={tempimg?tempimg:avatar }  className='rounded-full w-[120px] h-[120px]' />
</div>
<div className='flex justify-center flex-col mt-[90px] items-center w-[100%]'>
<input type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} className='w-[100%] outline-none rounded-[60px] h-[40px] pl-6 pr-6 mt-5 bg-[#333333] text-[#FFFFFF]'/>
<input type='text' placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)} className='w-[100%] outline-none rounded-[60px] h-[40px] pl-6 pr-6 mt-5 bg-[#333333] text-[#FFFFFF]'/>
<input type='text' placeholder='Enter phone' value={phone} onChange={(e) => setPhone(e.target.value)} className='w-[100%] outline-none rounded-[60px] h-[40px] pl-6 pr-6 mt-5 bg-[#333333] text-[#FFFFFF]'/>
<div className='flex justify-center mt-5 items-center w-[100%]'>
<button 
onClick={handleedit}
className="bg-[#4B5563] text-white py-2 px-4 w-[120px] h-[35px] flex justify-center items-center rounded-3xl mr-2  transition duration-200"
>
Cancel
</button>
<button onClick={handleProfileUpdate}
className="bg-[#A87F0B] text-white py-2 px-4 w-[120px] h-[35px] flex justify-center items-center rounded-3xl  transition duration-200"
>
{btnloader? <div cla><ClipLoader size={20} color="#181818" className='mt-2' /></div>: "Update"}
</button>
</div>
</div>
</div>
</div>
</Box>
</Modal>
<Modal
open={isModalOpen}
onClose={handleCloseshare}
aria-labelledby="image-modal"
aria-describedby="image-modal-description"
>
<Box
  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#181818',
    borderRadius: '10px',
    background: '#181818',
    outline: 'none',
    boxShadow: 24,
    maxHeight: "600px",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }}
>
<div className='flex justify-end w-[90%] mt-3'>
<div onClick={handleCloseshare} className='flex justify-center items-center border border-[#E5D6C5] w-[25px] h-[25px] rounded-[50%]'>
<IoClose className='text-[white]' />
</div>
</div>
  <div className="flex justify-center items-center mt-2 w-[100%]">
    <Share />
    
  </div>
  <br></br>
</Box>
</Modal>
<ToastContainer
position="top-center"
autoClose={2000} // Auto close after 3 seconds
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
transition={Slide} // Optional transition effect
/>


<InfoModal info={info} handleCloseshare={handleCloseshare} message="Trigger a reminder when it's your scheduled date to pay the kameti."/>
<InfoModal info={shareinfo} handleCloseshare={handleCloseshare} message="Share this kameti app with your friends to benefit from its features."/>
<InfoModal info={deleteinfo} handleCloseshare={handleCloseshare} message="Delete all historical kameti records."/>
<InfoModal info={recordinfo} handleCloseshare={handleCloseshare} message="Complete records of your kameti."/>

 </>
  )
}
