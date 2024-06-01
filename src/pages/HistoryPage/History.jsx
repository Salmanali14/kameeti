import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import editimg from '../../images/paymentImage/Edit.png'
import remove from '../../images/paymentImage/Remove.png'
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
import Alert from '../../components/Alert/Alert';
import WithdrawDates from '../../components/WithdrawDates/WithdrawDates';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function History() {
  const [payments, setPayments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [CommId, setCommId] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawModalProps, setWithdrawModalProps] = useState({ counts: 0, dates: []});

  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem('token');

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
      setErrorMessage('An error occurred while fetching payments.');
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  useEffect(() => {
    getPayments(); // Fetch payments when the component mounts
  }, []);


  const handleRemoveConfirm = async () => {
    // console.log(CommId);
    try {
      const response = await axios.post(
        `${apiBaseUrl}committee/delete`,
        { id: CommId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setPayments(payments.filter(payment => payment.id !== CommId));
      setShowConfirmAlert(false); // Hide the confirm alert
    } catch (error) {
      console.error('Error removing record:', error);
    }
  };
  const navigate = useNavigate();
  const handleEditConfirm = () => {
    console.log('Edit confirmed');
    navigate(`/Create/${CommId}`); 
    setShowConfirmAlert(false);
  };
  const handleAlertCancel = () => {
    setShowConfirmAlert(false); // Hide the confirm alert
  };

  const openWithdrawModal = (counts, dates) => {
    setWithdrawModalProps({ counts, dates });
    setShowWithdrawModal(true);
  };

  
  return (
  <>
  <div className='w-[100%] h-[100vh] flex justify-center items-center bg-black'>
  <div className='w-[97%] rounded-[40px] h-[90vh] flex  '>
<Sidebar/>
  <div className='w-[75%] bg-maincolor ml-[2px] rounded-r-[20px]'>
  <div className='w-[100%] flex justify-between items-center mt-6 border-b-[2px] border-[black] '>
  <h1 className='text-[#A87F0B] text-[25px] font-bold ml-10 mb-6'>All kameties</h1>
  <div className='flex items-center'>
  <button className='flex justify-center items-center w-[180px] h-[40px]  rounded-[30px] bg-colorinput text-[white]  mb-6 mr-3' ><IoIosSearch className='text-[white] text-[20px]'/><input type='text' placeholder='Search' className='outline-none bg-transparent border-none w-[130px] placeholder-white'/></button>
  <button className='flex justify-center items-center w-[100px] h-[40px]  rounded-[30px] bg-colorinput text-[white]  mb-6 mr-10' ><MdOutlineRestartAlt className='text-[white] text-[20px]'/>Reset</button></div>
  </div>
  <div className='flex justify-center flex-wrap items-center w-[100%]'>
    
  {payments.map((payment, index) => (
                <div key={index} className='w-[40%] h-[370px] mt-1 rounded-[20px] bg-sidebar m-2'>
                  <div className='w-100% h-[60px] rounded-t-[20px] bg-colorinput flex justify-between items-center'>
                    <div className='flex items-center ml-5'>
                      <div className='w-[25px] ml-1 h-[25px] bg-customBlack text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
                        {index + 1}
                      </div>
                      <p className='text-white text-[20px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[125px] mr-2'>{payment.commHolderName}</p>

                    </div>
                    <div className='flex items-center'>
                      <button className='flex justify-center items-center w-[80px] h-[29px] rounded-[30px] mr-2 text-white text-[12px] bg-paytxt1'
                      onClick={() => {
                        setConfirmMessage("Are you sure you want to edit?");
                        setConfirmAction('edit');
                        setShowConfirmAlert(true);
                        setCommId(payment.id);
                      }}
                      >
                        Edit {'\u00A0'}<img className='w-[15px]' src={editimg} />
                      </button>
                      <button className='flex justify-center items-center w-[80px] h-[29px] rounded-[30px] mr-5 text-white text-[12px] bg-paytxt1' 
                      onClick={() => {
                        setConfirmMessage("Are you sure you want to remove?");
                        setConfirmAction('remove');
                        setShowConfirmAlert(true);
                        setCommId(payment.id);
                      }}
                      >
                        Remove {'\u00A0'}<img className='w-[15px]' src={remove} />
                      </button>
                    </div>
                  </div>
                  <div className='flex justify-center items-center w-[100%] flex-wrap mt-3'>
                    <div className='w-[30%] h-[90px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[30px]' src={bank} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Price(Each)</h2>
                      <h1 className='text-paytxt text-[12px] font-bold'>{payment.pricePerComm}</h1>
                    </div>
                    <div className='w-[30%] ml-2 mr-2 h-[90px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[30px]' src={money2} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Total Price(All)</h2>
                      <h1 className='text-paytxt text-[12px] font-bold'>{payment.totalPrice}</h1>
                    </div>
                    <div className='w-[30%] h-[90px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[30px]' src={box} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Your Committees</h2>
                      <h1 className='text-paytxt text-[12px] font-bold'>{payment.totalUserComms}</h1>
                    </div>
                    <div className='w-[30%] h-[90px] rounded-[20px] mt-2 bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[30px]' src={lastdate} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Total Month</h2>
                      <h1 className='text-paytxt text-[12px] font-bold'>{payment.totalMonths}</h1>
                    </div>
                    <div className='w-[30%] h-[90px] rounded-[20px] mt-2 ml-2 mr-2 bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[30px]' src={payday1} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Payable per Month</h2>
                      <h1 className='text-paytxt text-[12px] font-bold'>{payment.pricePerComm * payment.totalUserComms}</h1>
                    </div>
                    <div className='w-[30%] h-[90px] rounded-[20px] mt-2 bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[30px]' src={money1} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Paid Amount</h2>
                      <h1 className='text-paytxt text-[12px] font-bold'>{payment.paidAmount}</h1>
                    </div>
                    <div className='w-[30%] h-[90px] rounded-[20px] mt-2 bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[30px]' src={startdate} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Starting Date</h2>
                      <h1 className='text-paytxt text-[12px] font-bold'>{formatDate(payment.startingMonth)}</h1>
                    </div>
                    <div className='w-[60%] ml-4 h-[90px] rounded-[20px] mt-2 bg-colorinput flex justify-center items-center flex-col'>
                      <div className='flex items-center ml-[-20px]' onClick={() => {
                        
                        openWithdrawModal(payment?.totalUserComms, payment?.withdraw);
                        setCommId(payment.id);
                        }}>
                        <img className='w-[30px]' src={calander} />{'\u00A0'}
                        <h2 className='text-paytxt text-[12px] mt-[-15px]'>Withdraw Date </h2>
                      </div>
                      <h1 className='text-paytxt text-[12px] mt-[-15px]'>{payment.withdrawDate}</h1>
                    </div>
                  </div>
                </div>
              ))}
{/* 
  <div className='w-[40%] h-[370px] mt-1 rounded-[20px] bg-sidebar  '>
  <div className='w-100% h-[60px] rounded-t-[20px] bg-colorinput flex justify-between items-center'>
 <div className='flex items-center ml-5'> <div className='w-[25px] ml-1 h-[25px] bg-customBlack text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
  2
  </div>
  <p className='text-white text-[20px]'>Hilton</p></div>
  <div className='flex items-center'>
  <button className='flex justify-center items-center w-[80px] h-[29px] rounded-[30px] mr-2 text-white text-[12px] bg-paytxt1'>Edit {'\u00A0'}<img className='w-[15px]' src={editimg}/></button>
  <button className='flex justify-center items-center w-[80px] h-[29px] rounded-[30px] mr-5 text-white text-[12px] bg-paytxt1'>Remove {'\u00A0'}<img className='w-[15px]' src={remove}/></button>
  </div>
  </div>
  <div className='flex justify-center items-center w-[100%] flex-wrap mt-3'>
  <div className='w-[30%] h-[90px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
  <img className='w-[30px]' src={bank}/>
  <h2 className='text-paytxt text-[10px] mt-1'>Price(Each)</h2>
  <h1 className='text-paytxt text-[12px] font-bold'>2000</h1>
  </div>
  <div className='w-[30%] ml-2 mr-2 h-[90px] rounded-[20px]  bg-colorinput flex justify-center items-center flex-col'>
  <img className='w-[30px]' src={money2}/>
  <h2 className='text-paytxt text-[10px] mt-1'>Total Price(All)</h2>
  <h1 className='text-paytxt text-[12px] font-bold'>48000</h1>
  </div>
  <div className='w-[30%] h-[90px]  rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
  <img className='w-[30px]' src={box}/>
  <h2 className='text-paytxt text-[10px] mt-1'>Your Committees</h2>
  <h1 className='text-paytxt text-[12px] font-bold'>2</h1>
  </div>
  <div className='w-[30%] h-[90px] rounded-[20px] mt-2 bg-colorinput flex justify-center items-center flex-col'>
  <img className='w-[30px]' src={lastdate}/>
  <h2 className='text-paytxt text-[10px] mt-1'>Total Month</h2>
  <h1 className='text-paytxt text-[12px] font-bold'>12</h1>
  </div>
    <div className='w-[30%] h-[90px] rounded-[20px] mt-2 ml-2 mr-2 bg-colorinput flex justify-center items-center flex-col'>
    <img className='w-[30px]' src={payday1}/>
    <h2 className='text-paytxt text-[10px] mt-1'>Payable per Month</h2>
    <h1 className='text-paytxt text-[12px] font-bold'>2000</h1>
    </div>
  <div className='w-[30%] h-[90px]  rounded-[20px] mt-2 bg-colorinput flex justify-center items-center flex-col'>
  <img className='w-[30px]' src={money1}/>
  <h2 className='text-paytxt text-[10px] mt-1'>Paid Amount</h2>
  <h1 className='text-paytxt text-[12px] font-bold'>2000</h1>
  </div>

  <div className='w-[30%] h-[90px] rounded-[20px] mt-2  bg-colorinput flex justify-center items-center flex-col'>
  <img className='w-[30px]' src={startdate}/>
  <h2 className='text-paytxt text-[10px] mt-1'>Starting Date</h2>
  <h1 className='text-paytxt text-[12px] font-bold'>01/22/24</h1>
  </div>
  <div className='w-[60%] ml-4 h-[90px] rounded-[20px] mt-2 bg-colorinput flex justify-center items-center flex-col'>
  <div className='flex items-center ml-[-20px]'><img className='w-[30px]' src={calander}/>{'\u00A0'}
  <h2 className='text-paytxt text-[12px]  mt-[-15px]'>Withdraw Date </h2></div>
  <h1 className='text-paytxt text-[12px] mt-[-15px] '>12/2/2023</h1>
  </div>
  </div>
  </div> */}
  </div>
  </div>
  </div>

   {/* Confirm alert component */}
   {showConfirmAlert && (
        <Alert
          message={confirmMessage}
          onConfirm={() => {
            if (confirmAction === 'edit') {
              handleEditConfirm();
            } else if (confirmAction === 'remove') {
              handleRemoveConfirm();
            }
          }}
          onCancel={handleAlertCancel}
        />
      )}
      {showWithdrawModal && (
        <WithdrawDates
          counts={withdrawModalProps.counts}
          dates={withdrawModalProps.dates}
          committeeId={CommId}
          onClose={() => setShowWithdrawModal(false)}
          getPayments = {getPayments}
        />
      )}
      
  </div>
  </>
  )
}
