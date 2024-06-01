import React,{useEffect, useState} from 'react'
import profile from '../../images/profile 1.png'
import money from '../../images/money (1) 1.png'
import total from '../../images/money 1.png'
import calender from '../../images/appointment 1.png'
import custumer from '../../images/customer 1.png'
import date from '../../images/start-date 1.png'
import payday from '../../images/Payday.png'
import axios from 'axios';

import { MdOutlineRestartAlt } from "react-icons/md";
import Sidebar from '../../components/Sidebar/Sidebar'
import { useParams } from 'react-router-dom'

export default function Create() {
  const [kametiHolderName, setKametiHolderName] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [pricePerKameti, setPricePerKameti] = useState('');
  const [totalMonths, setTotalMonths] = useState('');
  const [myTotalKameties, setMyTotalKameties] = useState('');
  const [payablePerMonth, setPayablePerMonth] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [responseMessage, setresponseMessage] = useState('');

  const handleReset = () => {
    setKametiHolderName('');
    setTotalPrice('');
    setPricePerKameti('');
    setTotalMonths('');
    setMyTotalKameties('');
    setPayablePerMonth('');
    setStartingDate('');
    setEndingDate('');
  };
  const fillValues = (data) => {
    setKametiHolderName(data.commHolderName);
    setTotalPrice(data.totalPrice);
    setPricePerKameti(data.pricePerComm);
    setTotalMonths(data.totalMonths);
    setMyTotalKameties(data.totalUserComms);
    // setPayablePerMonth(data.);
    setStartingDate(formatDate(data.startingMonth));
    setEndingDate(formatDate(data.endingMonth));
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem('token');
  const { id } = useParams();


  // console.log(token);
  const handleCreateCommittee = async () => {
    try {
      const response = await axios.post(`${apiBaseUrl}committee`, {
        commHolderName: kametiHolderName, 
        pricePerComm: pricePerKameti, 
        totalPrice: totalPrice,
        totalUserComms: myTotalKameties, 
        totalMonths: totalMonths, 
        startingMonth: startingDate,
        endingMonth: endingDate
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setresponseMessage(response?.data?.message);
      // console.error('comittee success:', response);
      handleReset();
    } catch (error) {
      // Handle sign-in error (e.g., display error message to the user)
      setresponseMessage(error?.response?.data?.message);
      // console.error('response:', error);
    }
  };
  const handleUpdateCommittee = async () => {
    try {
      const response = await axios.post(`${apiBaseUrl}committee/update`, {
        id: id, 
        commHolderName: kametiHolderName, 
        pricePerComm: pricePerKameti, 
        totalPrice: totalPrice,
        totalUserComms: myTotalKameties, 
        totalMonths: totalMonths, 
        startingMonth: startingDate,
        endingMonth: endingDate
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setresponseMessage(response?.data?.message);
      console.error('update response:', response);
      
    } catch (error) {
      setresponseMessage(error?.response?.data?.message);
      console.error('response:', error);
    }
  };


  const getSingleCommittee = async () => {
    try {
      if(id)
      {
        const response = await axios.post(`${apiBaseUrl}singleComm/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response);
        fillValues(response?.data?.data);
        // setPayments(response?.data?.data ? response?.data?.data : []);
      }
     
    } catch (error) {
      console.error('Error fetching committee:', error);
      // setErrorMessage('An error occurred while fetching committee.');
    }
  };

  useEffect(() => {
    getSingleCommittee();
  }, [id]);

  return (
    <>
    <div className='w-[100%] h-[100vh] flex justify-center items-center bg-black'>
    <div className='w-[97%] rounded-[40px] h-[90vh] flex  '>
 <Sidebar/>
    <div className='w-[75%] bg-maincolor ml-[2px] rounded-r-[20px]'>
    <div className='w-[100%] flex justify-between items-center mt-6 border-b-[2px] border-[black] '>
    <h1 className='text-[#A87F0B] text-[25px] font-bold ml-10 mb-6'>{id ? "Update kameti" : "Create Kameti" }</h1>
    <button className='flex justify-center items-center w-[100px] h-[40px]  rounded-[30px] bg-colorinput text-[white]  mb-6 mr-10' onClick={handleReset} ><MdOutlineRestartAlt className='text-[white] text-[20px]'/>Reset</button>
    </div>
    {responseMessage && <p className="text-white mt-3 w-[90%] ml-10">{responseMessage}</p>}
    <div className='w-[100%] flex items-center justify-center flex-col'>
    <div className='flex w-[91%] justify-center items-center'>
    <div className='w-[90%] flex items-center flex-col'>
<div className='w-[90%] mt-2 mb-2'>
    <label className='text-[white]'>Kameti Holder Name</label></div>
    <div className='  bg-colorinput    rounded-[30px] h-[50px] w-[100%]   mb-5 flex items-center' >
    <div className='  w-[90%] ml-[20px] h-[45px] outline-none border-none  justify-center flex items-center'>
  <img className='h-[25px]' src={profile}/>
  <input type='text' placeholder='Sanjay Singhania'  value={kametiHolderName} onChange={(e)=>setKametiHolderName(e.target.value)} className='outline-none border-none text-[white] placeholder-[#CACACA] bg-colorinput w-[100%] h-[40px] pl-3 '/>
  </div>
    </div>
    </div>
    {'\u00A0'}{'\u00A0'}
    <div className='w-[90%] flex items-center flex-col'>
<div className='w-[90%] mt-2 mb-2'>
    <label className='text-[white]'> Total Price </label></div>
    <div className='  bg-colorinput    rounded-[30px] h-[50px] w-[100%]   mb-5 flex items-center' >
    <div className='  w-[90%] ml-[10px] h-[45px] outline-none border-none  justify-center flex items-center'>
  <img className='h-[25px]' src={total}/>
  <input type='text' placeholder='e.g 24000' value={totalPrice} onChange={(e)=>setTotalPrice(e.target.value)} className='outline-none border-none text-[white] bg-colorinput w-[90%] h-[40px]  placeholder-[#CACACA] pl-3 '/>
  </div>
    </div>
    </div>
    </div>
    <div className='flex w-[100%] justify-center items-center'>
    <div className='w-[30%] flex items-center flex-col'>
<div className='w-[84%] mt-1 mb-2'>
    <label className='text-[white]'>Price Per Kameti</label></div>
    <div className='  bg-colorinput    rounded-[30px] h-[50px] w-[100%]   mb-5 flex items-center' >
    <div className='  w-[80%] ml-[20px] h-[45px] outline-none border-none  justify-center flex items-center'>
  <img className='h-[25px]' src={money}/>
  <input type='text' placeholder='e.g 24000' value={pricePerKameti} onChange={(e)=>setPricePerKameti(e.target.value)} className='outline-none border-none text-[white] bg-colorinput w-[90%] h-[40px] pl-3 placeholder-[#CACACA] '/>
  </div>
    </div>
    </div>
    {'\u00A0'}{'\u00A0'}
    <div className='w-[30%] flex items-center flex-col'>
    <div className='w-[84%] mt-1 mb-2'>
        <label className='text-[white]'> Total Months</label></div>
        <div className='  bg-colorinput    rounded-[30px] h-[50px] w-[100%]   mb-5 flex items-center' >
        <div className='  w-[80%] ml-[20px] h-[45px] outline-none border-none  justify-center flex items-center'>
      <img className='h-[25px]' src={calender}/>
      <input type='text' placeholder='e.g 12' value={totalMonths} onChange={(e)=>setTotalMonths(e.target.value)} className='outline-none border-none text-[white] bg-colorinput w-[90%] h-[40px] pl-3 placeholder-[#CACACA]'/>
      </div>
        </div>
        </div>
        {'\u00A0'}{'\u00A0'}
        <div className='w-[30%] flex items-center flex-col'>
        <div className='w-[84%] mt-1 mb-2'>
            <label className='text-[white]'>My Total Kameties</label></div>
            <div className='  bg-colorinput    rounded-[30px] h-[50px] w-[100%]   mb-5 flex items-center' >
            <div className='  w-[80%] ml-[20px] h-[45px] outline-none border-none  justify-center flex items-center'>
          <img className='h-[25px]' src={custumer}/>
          <input type='text' placeholder='e.g 1,2' value={myTotalKameties} onChange={(e)=>setMyTotalKameties(e.target.value)} className='outline-none border-none text-[white] bg-colorinput w-[90%] h-[40px] pl-3 placeholder-[#CACACA] '/>
          </div>
            </div>
            </div>
    </div>
    <div className='flex w-[100%] justify-center items-center'>
    {/* <div className='w-[30%] flex items-center flex-col'>
      <div className='w-[84%] mt-1 mb-2'>
        <label className='text-[white]'>Payable Per Month</label>
      </div>
      <div className='  bg-colorinput    rounded-[30px] h-[50px] w-[100%]   mb-5 flex items-center' >
        <div className='  w-[80%] ml-[20px] h-[45px] outline-none border-none  justify-center flex items-center'>
          <img className='h-[25px]' src={payday}/>
          <input type='text' placeholder='e.g 24000,2000' value={payablePerMonth} onChange={(e)=>setPayablePerMonth(e.target.value)} className='outline-none border-none text-[white] bg-colorinput w-[90%] h-[40px] pl-3 placeholder-[#CACACA] '/>
        </div>
      </div>
    </div> */}
    {'\u00A0'}{'\u00A0'}
    <div className='w-[46%] flex items-center flex-col'>
    <div className='w-[84%] mt-1 mb-2'>
        <label className='text-[white]'> Starting Date</label></div>
        <div className='  bg-colorinput    rounded-[30px] h-[50px] w-[100%]   mb-5 flex items-center' >
        <div className='  w-[80%] ml-[20px] h-[45px] outline-none border-none  justify-center flex items-center'>
      <img className='h-[25px]' src={date}/>
      <input type='date' value={startingDate} onChange={(e)=>setStartingDate(e.target.value)} className='outline-none border-none text-[white] bg-colorinput w-[90%] h-[40px] pl-2 '/>
      </div>
        </div>
        </div>
        {'\u00A0'}{'\u00A0'}
        <div className='w-[46%] flex items-center flex-col'>
        <div className='w-[84%] mt-1 mb-2'>
            <label className='text-[white]'>Ending Date</label></div>
            <div className='  bg-colorinput    rounded-[30px] h-[50px] w-[100%]   mb-5 flex items-center' >
            <div className='  w-[80%] ml-[20px] h-[45px] outline-none border-none  justify-center flex items-center'>
          <img className='h-[25px]' src={date}/>
          <input type='date' value={endingDate} onChange={(e)=>setEndingDate(e.target.value)} className='outline-none border-none text-[white] bg-colorinput w-[90%] h-[40px] pl-2 '/>
          </div>
            </div>
            </div>
            
    </div>
    <div className='w-[90%] mt-1 flex justify-end'>
    <button className='w-[200px] h-[50px] rounded-[30px] bg-colorinput font-bold text-[white]'>Cancel</button>
    <button className='w-[200px] h-[50px] rounded-[30px] bg-[#A87F0B] font-bold text-[black] ml-2' onClick={id ? handleUpdateCommittee : handleCreateCommittee} > {id ? "Update kameti" : "Create Kameti" }</button>
    </div>
    </div>
    </div>
    
    </div>
    
    </div>
    
    </>
  )
}
