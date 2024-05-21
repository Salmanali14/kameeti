import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FaSort } from "react-icons/fa";
import money from '../../images/Moneypay.png'
import calander from '../../images/appointment 1.png'
import check from '../../images/Checkmark.png'
import bank from '../../images/paymentImage/banknotes 2.png'
import lastdate from '../../images/paymentImage/calendar 2.png'
import cash from '../../images/paymentImage/cash-payment 1.png'
import startdate from '../../images/paymentImage/january 1.png'
import box from '../../images/paymentImage/safe-box 2.png'
import payday1 from '../../images/paymentImage/Payday.png'
import thirty from '../../images/paymentImage/thirty-one 1.png'
import calender2 from '../../images/paymentImage/payday 1.png'
import money1 from '../../images/paymentImage/money (1) 2.png'
import money2 from '../../images/paymentImage/money 2.png'
import { MdOutlineRestartAlt } from "react-icons/md";
import unpay from '../../images/paymentImage/unpay.png'
export default function Payment() {
  return (
   <>
   <div className='w-[100%] h-[100vh] flex justify-center items-center bg-black'>
   <div className='w-[97%] rounded-[40px] h-[90vh] flex  '>
<Sidebar/>
   <div className='w-[75%] bg-maincolor ml-[2px] rounded-r-[20px] h-[100%]'>
   <div className='w-[100%] flex justify-between items-center mt-6 border-b-[2px] border-[black] '>
   <h1 className='text-[#A87F0B] text-[25px] font-bold ml-10 mb-6'>Payments</h1>
   </div>
   <div className='w-[100%] flex'>
   <div className='w-[75%] flex justify-center items-center flex-col'>
   <div className='w-[96%] mt-1  rounded-[20px] items-center  flex justify-between  h-[100px] bg-sidebar '>
   <div className='w-[50%] ml-5 flex justify-start  flex-col'>
   <p className='text-gray-200 font-bold'>Supereme Sdtrawa</p>
   <h1 className='text-yellow-600 font-bold text-[30px]' >Rs. 25,000</h1>
   <p className='text-gray-200 text-[12px]'>Payments</p>
   </div>
   <button className='flex justify-center items-center w-[100px] h-[40px] border rounded-[30px] bg-colorinput text-[white]  mb-6 mr-10' ><MdOutlineRestartAlt className='text-[white] text-[20px]'/>Reset</button>
   </div>
   <div className='w-[96%] h-[290px] overflow-y-scroll mt-2 rounded-[20px] items-center  flex flex-col  bg-sidebar'>
   <div className='w-[95%] flex'>
   <div className='w-[70%] mt-2 flex items-center rounded-[30px] h-[40px] bg-colorinput'>
   <IoIosSearch className='text-paytxt text-[25px] ml-5 mr-2'/>
   <input type='text' placeholder='Search' className='border-none outline-none bg-transparent text-paytxt w-[85%] placeholder-paytxt'/>
   </div>
   <div className='w-[30%] mt-2 ml-2 flex items-center justify-center rounded-[30px] h-[40px] text-paytxt bg-colorinput'>
   Sort By<FaSort className='text-paytxt text-[25px] ml-3'/>
   </div>
   </div>
   <div className='w-[95%] pt-2 pb-2 mt-2 flex items-center justify-around rounded-[30px] h-[50px] text-paytxt border-colorinput border-[2px]'>
   <div className='w-[40px] h-[30px]  bg-payform text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   No1.
   </div>
   <div className='w-[60px] h-[30px] bg-payform text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   Price
   </div>
   <div className='w-[60px] h-[30px] bg-payform text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   Month
   </div>
   <div className='w-[60px] h-[30px] bg-payform text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   Status
   </div>
   <div className='w-[120px] h-[30px] bg-payform text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   Payment Proof
   </div>
   </div>
 
   <div className='w-[95%] mt-2 flex items-center justify-around rounded-[30px] h-[40px] text-paytxt bg-colorinput border-colorinput border-[2px]'>
   <div className='w-[25px] ml-1 h-[25px] bg-payform text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
   1
   </div>
   <div className='w-[60px] h-[25px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2 ' src={money}/> 4000
   </div>
   <div className='w-[60px] h-[40px]   text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2 ' src={calander}/> 01/06/23
   </div>
   <div className='w-[60px] h-[25px] mr-[-10px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2' src={check}/> Paid
   </div>
   <div className=' h-[25px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
  <div className='w-[70px] h-[26px] rounded-[30px] text-[12px] text-black flex items-center justify-center cursor-pointer bg-uploaded'>
  Uploaded
  </div>
  {'\u00A0'}
  <div className='w-[70px] whitespace-nowrap mr-[-10px] text-[12px] h-[26px] rounded-[30px] text-black flex items-center justify-center cursor-pointer bg-paytxt'>
  See Photo
  </div>
   </div>
   </div>
   <div className='w-[95%] mt-2 flex items-center justify-around rounded-[30px] h-[40px] text-paytxt bg-colorinput border-colorinput border-[2px]'>
   <div className='w-[25px] ml-1 h-[25px] bg-payform text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
   2
   </div>
   <div className='w-[60px] h-[40px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2 ' src={money}/> 4000
   </div>
   <div className='w-[60px] h-[25px]   text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2 ' src={calander}/> 01/06/23
   </div>
   <div className='w-[60px] h-[25px] mr-[-10px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2' src={check}/> Paid
   </div>
   <div className=' h-[25px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
  <div className='w-[70px] h-[26px] rounded-[30px] text-[12px] text-black flex items-center justify-center cursor-pointer bg-uploaded'>
  Uploaded
  </div>
  {'\u00A0'}
  <div className='w-[70px] whitespace-nowrap mr-[-10px] text-[12px] h-[26px] rounded-[30px] text-black flex items-center justify-center cursor-pointer bg-paytxt'>
  See Photo
  </div>
   </div>
   </div>
   <div className='w-[95%] mt-2 flex items-center justify-around rounded-[30px] h-[40px] text-paytxt bg-colorinput border-colorinput border-[2px]'>
   <div className='w-[25px] ml-1 h-[25px] bg-payform text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
   3
   </div>
   <div className='w-[60px] h-[40px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2 ' src={money}/> 4000
   </div>
   <div className='w-[60px] h-[25px]   text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2 ' src={calander}/> 01/06/23
   </div>
   <div className='w-[60px] h-[25px] mr-[-10px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2' src={check}/> Paid
   </div>
   <div className=' h-[25px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
  <div className='w-[70px] h-[26px] rounded-[30px] text-[12px] text-black flex items-center justify-center cursor-pointer bg-uploaded'>
  Uploaded
  </div>
  {'\u00A0'}
  <div className='w-[70px] whitespace-nowrap mr-[-10px] text-[12px] h-[26px] rounded-[30px] text-black flex items-center justify-center cursor-pointer bg-paytxt'>
  See Photo
  </div>
   </div>
   </div>
   <div className='w-[95%] mt-2 flex items-center justify-around rounded-[30px] h-[40px] text-paytxt bg-colorinput border-colorinput border-[2px]'>
   <div className='w-[25px] ml-1 h-[25px] bg-payform text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
   4
   </div>
   <div className='w-[60px] h-[25px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2 ' src={money}/> 4000
   </div>
   <div className='w-[60px] h-[40px]   text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2 ' src={calander}/> 01/06/23
   </div>
   <div className='w-[60px] h-[25px] mr-[-10px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2' src={check}/> Paid
   </div>
   <div className=' h-[25px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
  <div className='w-[70px] h-[26px] rounded-[30px] text-[12px] text-black flex items-center justify-center cursor-pointer bg-uploaded'>
  Uploaded
  </div>
  {'\u00A0'}
  <div className='w-[70px] whitespace-nowrap mr-[-10px] text-[12px] h-[26px] rounded-[30px] text-black flex items-center justify-center cursor-pointer bg-paytxt'>
  See Photo
  </div>
   </div>
   </div>
   <div className='w-[95%] mt-2 flex items-center justify-around rounded-[30px] h-[40px] text-paytxt bg-colorinput border-colorinput border-[2px]'>
   <div className='w-[25px] ml-1 h-[25px] bg-payform text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
   5
   </div>
   <div className='w-[60px] h-[25px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2 ' src={money}/> 4000
   </div>
   <div className='w-[60px] h-[40px]   text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2 ' src={calander}/> 01/06/23
   </div>
   <div className='w-[60px] h-[25px] mr-[-10px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2' src={check}/> Paid
   </div>
   <div className=' h-[25px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
  <div className='w-[70px] h-[26px] rounded-[30px] text-[10px] text-uploaded flex items-center justify-center border-[1px] cursor-pointer border-uploaded'>
  Upload
  </div>
  {'\u00A0'}
  <div className='w-[70px] whitespace-nowrap mr-[-10px] text-[8px] h-[26px] rounded-[30px] text-uploaded flex items-center justify-center cursor-pointer border-[1px] border-uploaded'>
   Upload to See 
  </div>
   </div>
   </div>
   <div className='w-[95%] mt-2 flex items-center justify-around rounded-[30px] h-[40px] text-paytxt bg-colorinput border-colorinput border-[2px]'>
   <div className='w-[25px] ml-1 h-[25px] bg-payform text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
   6
   </div>
   <div className='w-[60px] h-[25px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2 ' src={money}/> 4000
   </div>
   <div className='w-[60px] h-[40px]   text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2 ' src={calander}/> 01/06/23
   </div>
   <div className='w-[60px] h-[25px] mr-[-10px]  text-[#8A8A8A] text-[13px] rounded-[30px] flex justify-center items-center'>
   <img className='w-[15px] mr-2' src={unpay}/> Pay
   </div>
   <div className=' h-[25px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
  <div className='w-[70px] h-[26px] rounded-[30px] text-[12px] text-[#8A8A8A] flex items-center justify-center border-[1px] border-[#8A8A8A]'>
  Uploaded
  </div>
  {'\u00A0'}
  <div className='w-[70px] whitespace-nowrap mr-[-10px] text-[12px] h-[26px] rounded-[30px] text-[#8A8A8A] flex items-center justify-center border-[1px] border-[#8A8A8A]'>
  See Photo
  </div>
   </div>
   </div>
<br></br>

   </div>
   </div>
   <div className='w-[30%] mr-4 h-[400px] flex justify-center m-0 mt-1 bg-sidebar rounded-[20px]'>
  <div className='w-[95%] flex justify-evenly overflow-y-auto  mt-2  flex-wrap '>
  <div className='w-[43%] h-[100px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
  <img className='w-[50px]' src={bank}/>
  <h2 className='text-paytxt text-[10px] mt-1'>Price(Each)</h2>
  <h1 className='text-paytxt text-[16px] font-bold'>2000</h1>
  </div>
  <div className='w-[43%] h-[100px] rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
  <img className='w-[50px]' src={money2}/>
  <h2 className='text-paytxt text-[10px] mt-1'>Total Price(All)</h2>
  <h1 className='text-paytxt text-[16px] font-bold'>48000</h1>
  </div>
  <div className='w-[43%] h-[100px]  rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
  <img className='w-[50px]' src={box}/>
  <h2 className='text-paytxt text-[10px] mt-1'>Your Committees</h2>
  <h1 className='text-paytxt text-[16px] font-bold'>2</h1>
  </div>
  <div className='w-[43%] h-[100px] rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
  <img className='w-[40px]' src={lastdate}/>
  <h2 className='text-paytxt text-[10px] mt-1'>Total Month</h2>
  <h1 className='text-paytxt text-[16px] font-bold'>12</h1>
  </div>
    <div className='w-[43%] h-[100px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
    <img className='w-[40px]' src={payday1}/>
    <h2 className='text-paytxt text-[10px] mt-1'>Payable per Month</h2>
    <h1 className='text-paytxt text-[16px] font-bold'>2000</h1>
    </div>
  <div className='w-[43%] h-[100px]  rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
  <img className='w-[40px]' src={money1}/>
  <h2 className='text-paytxt text-[10px] mt-1'>Paid Amount</h2>
  <h1 className='text-paytxt text-[16px] font-bold'>2000</h1>
  </div>
   <div className='w-[43%] h-[100px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
   <img className='w-[40px]' src={cash}/>
   <h2 className='text-paytxt text-[10px] mt-1'>Remaining Amount</h2>
   <h1 className='text-paytxt text-[16px] font-bold'>2000</h1>
   </div>
  <div className='w-[43%] h-[100px] rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
  <img className='w-[40px]' src={startdate}/>
  <h2 className='text-paytxt text-[10px] mt-1'>Starting Date</h2>
  <h1 className='text-paytxt text-[16px] font-bold'>01/22/24</h1>
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
