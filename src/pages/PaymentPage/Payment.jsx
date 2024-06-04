import React, { useEffect, useState } from 'react'
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
import Alert from '../../components/Alert/Alert';
import { MdOutlineRestartAlt } from "react-icons/md";
import unpay from '../../images/paymentImage/unpay.png'
import axios from 'axios';
import { Slide, ToastContainer, toast } from 'react-toastify';
export default function Payment() {
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem('token');
  const [committeeData, setCommitteeData] = useState(null);
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [paymentData, setPaymentData] = useState({ date: null, price: null });
  const [confirmAction, setConfirmAction] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  const fetchKametiWithPayments = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}payment`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      var kametees = response?.data?.data;
      setCommitteeData(response?.data?.data);
      if (kametees.length > 0) {
        setSelectedCommittee(kametees[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePayCommittee = async (status) => {
    if (status === "pay" && paymentData.date == null) {
      toast.error("date not selected");
    }
    else {
      try {
        const response = await axios.post(`${apiBaseUrl}payCommittee`, {
          committee_id: selectedCommittee?.id,
          status: status === "pay" ? "paid" : "Unpaid",
          price: paymentData.price,
          date: paymentData.date,
          payment_id: status === "unpay" ? paymentId : null

        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
          console.log(response);
          fetchKametiWithPayments();
        });
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
    setShowConfirmAlert(false);
  }
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const handleAlertCancel = () => {
    setShowConfirmAlert(false); // Hide the confirm alert
  };
  useEffect(() => {
    fetchKametiWithPayments();
  }, []);

  const handleCommitteeChange = (event) => {
    const commId = parseInt(event.target.value, 10); // Convert the value to an integer
    const user = committeeData?.find(user => user?.id === commId);
    // console.log(user);
    setSelectedCommittee(user);
  };

  const remainingUnpaidMonths = selectedCommittee?.totalMonths - selectedCommittee?.payments.length;
  return (
    <>
      <div className='w-[100%] h-[100vh] flex justify-center items-center bg-black'>
        <div className='w-[97%] rounded-[40px] h-[95vh] flex  '>
          <Sidebar />
          <div className='w-[75%] bg-maincolor ml-[2px] rounded-r-[20px] h-[100%]'>
            <div className='w-[100%] flex justify-between items-center mt-6 border-b-[2px] border-[black] '>
              <h1 className='text-[#A87F0B] text-[25px] font-bold ml-10 mb-6'>Payments</h1>
            </div>
            <div className='w-[100%] flex'>
              <div className='w-[75%] flex justify-center items-center flex-col'>
                <div className='w-[96%] mt-1  rounded-[20px] items-center  flex justify-between  h-[100px] bg-sidebar '>
                  <div className='w-[50%] ml-5 flex justify-start  flex-col'>
                    <p className='text-gray-200 font-bold'>{selectedCommittee?.commHolderName}</p>
                    <h1 className='text-yellow-600 font-bold text-[30px]' >Rs.{selectedCommittee?.totalPrice}</h1>
                    <p className='text-gray-200 text-[12px]'>Payments</p>
                  </div>
                  <div className='flex justify-start flex-col w-[35%] mr-3'>
                    <select className='w-[100%] outline-none border border-[white] bg-[#373737] text-[#999] text-[14px] h-[40px] rounded-[5px] pl-1 pr-3'
                      onChange={handleCommitteeChange}
                    >
                      {committeeData?.length === 0 ? (
                        <option value="" selected="selected" disabled>No committee</option>
                      ) : (
                        committeeData && committeeData.map((user, index) => (
                          <option key={index} value={user.id}>
                            {user.commHolderName}({user?.totalPrice})
                          </option>))
                      )}

                    </select>
                  </div>
                </div>
                <div className='w-[96%] h-[330px] overflow-y-scroll mt-2 rounded-[20px] items-center  flex flex-col  bg-sidebar'>
                  <div className='w-[95%] flex'>
                    <div className='w-[70%] mt-2 flex items-center rounded-[30px] h-[40px] bg-colorinput'>
                      <IoIosSearch className='text-paytxt text-[25px] ml-5 mr-2' />
                      <input type='text' placeholder='Search' className='border-none outline-none bg-transparent text-paytxt w-[85%] placeholder-paytxt' />
                    </div>
                    <div className='w-[30%] mt-2 ml-2 flex items-center justify-center rounded-[30px] h-[40px] text-paytxt bg-colorinput'>
                      Sort By<FaSort className='text-paytxt text-[25px] ml-3' />
                    </div>
                  </div>
                  <div className='w-[95%] pt-2 pb-2 mt-2 flex items-center justify-around rounded-[30px] h-[50px] text-paytxt border-colorinput border-[2px]'>
                    <div className='w-[40px] h-[30px]  bg-payform text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
                      No.
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

                  {/* Assuming totalMonth is the variable containing the total number of months */}


                  {/* showing paid committees */}
                  {selectedCommittee?.payments.map((item, index) => (

                    <div key={index} className='w-[95%] mt-2 flex items-center justify-around rounded-[30px] h-[40px] text-paytxt bg-colorinput border-colorinput border-[2px]'>
                      <div className='w-[25px] ml-3 h-[25px] bg-payform text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
                        {index + 1}
                      </div>
                      <div className='w-[60px] h-[25px] ml-[-10px] text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
                        <img className='w-[15px] mr-2' src={money} alt="money" /> {selectedCommittee?.pricePerComm * selectedCommittee?.totalUserComms}
                      </div>
                      <div className='w-[105px] h-[40px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
                        <input type='text' className='bg-[#373737] w-[100%] text-white' value={formatDate(item?.date)} disabled
                          onChange={(event) =>
                            setPaymentData(
                              {
                                date: event.target.value,
                                price: selectedCommittee?.pricePerComm * selectedCommittee?.totalUserComms
                              }
                            )} />
                      </div>
                      <div className='w-[60px] h-[25px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center cursor-pointer' onClick={() => {

                        setConfirmMessage("Are you sure to unpay this committee?");
                        setConfirmAction('unpayCommitee');
                        setShowConfirmAlert(true);
                        setPaymentId(item?.id)
                      }}>
                        <img className='w-[15px] mr-2' src={check} alt="check" />
                        Paid
                      </div>
                      <div className='h-[25px] text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
                        <div className='w-[70px] h-[26px] rounded-[30px] text-[12px] text-black flex items-center justify-center cursor-pointer bg-uploaded'>
                          Upload
                        </div>
                        {'\u00A0'}
                        <div className='w-[70px] whitespace-nowrap mr-[-10px] text-[12px] h-[26px] rounded-[30px] text-black flex items-center justify-center cursor-pointer bg-paytxt'>
                          No Photo
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* showing unpaid committees */}
                  {Array.from({ length: remainingUnpaidMonths }).map((_, index) => (

                    <div key={index} className='w-[95%] mt-2 flex items-center justify-around rounded-[30px] h-[40px] text-paytxt bg-colorinput border-colorinput border-[2px]'>
                      <div className='w-[25px] ml-3 h-[25px] bg-payform text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
                        {selectedCommittee?.payments.length + index + 1}
                      </div>
                      <div className='w-[60px] h-[25px] ml-[-10px] text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
                        <img className='w-[15px] mr-2' src={money} alt="money" /> {selectedCommittee?.pricePerComm * selectedCommittee?.totalUserComms}
                      </div>
                      <div className='w-[105px] h-[40px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
                        <input type='date' className='bg-[#373737] w-[100%] text-white'
                          onChange={(event) =>
                            setPaymentData(
                              {
                                date: event.target.value,
                                price: selectedCommittee?.pricePerComm * selectedCommittee?.totalUserComms
                              }
                            )} />
                      </div>
                      <div className='w-[60px] h-[25px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center cursor-pointer' onClick={() => {

                        setConfirmMessage("Are you sure to pay this committee?");
                        setConfirmAction('payCommitee');
                        setShowConfirmAlert(true);
                      }}>
                        {/* <img className='w-[15px] mr-2' src={check} alt="check" /> */}
                        Pay
                      </div>
                      <div className='h-[25px] text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
                        <div className='w-[70px] h-[26px] rounded-[30px] text-[12px] text-black flex items-center justify-center cursor-pointer bg-uploaded'>
                          Upload
                        </div>
                        {'\u00A0'}
                        <div className='w-[70px] whitespace-nowrap mr-[-10px] text-[12px] h-[26px] rounded-[30px] text-black flex items-center justify-center cursor-pointer bg-paytxt'>
                          No Photo
                        </div>
                      </div>
                    </div>
                  ))}


                  <br></br>

                </div>
              </div>


              <div className='w-[30%] mr-4 h-[440px] flex justify-center m-0 mt-1 bg-sidebar rounded-[20px]'>
                <div className='w-[95%] flex justify-evenly overflow-y-auto  mt-2  flex-wrap '>
                  <div className='w-[43%] h-[100px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                    <img className='w-[50px]' src={bank} />
                    <h2 className='text-paytxt text-[10px] mt-1'>Price(Each)</h2>
                    <h1 className='text-paytxt text-[16px] font-bold'>{selectedCommittee?.pricePerComm}</h1>
                  </div>
                  <div className='w-[43%] h-[100px] rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
                    <img className='w-[50px]' src={money2} />
                    <h2 className='text-paytxt text-[10px] mt-1'>Total Price(All)</h2>
                    <h1 className='text-paytxt text-[16px] font-bold'>{selectedCommittee?.totalPrice}</h1>
                  </div>
                  <div className='w-[43%] h-[100px]  rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                    <img className='w-[50px]' src={box} />
                    <h2 className='text-paytxt text-[10px] mt-1'>Your Committees</h2>
                    <h1 className='text-paytxt text-[16px] font-bold'>{selectedCommittee?.totalUserComms}</h1>
                  </div>
                  <div className='w-[43%] h-[100px] rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
                    <img className='w-[40px]' src={lastdate} />
                    <h2 className='text-paytxt text-[10px] mt-1'>Total Month</h2>
                    <h1 className='text-paytxt text-[16px] font-bold'>{selectedCommittee?.totalMonths}</h1>
                  </div>
                  <div className='w-[43%] h-[100px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                    <img className='w-[40px]' src={payday1} />
                    <h2 className='text-paytxt text-[10px] mt-1'>Payable per Month</h2>
                    <h1 className='text-paytxt text-[16px] font-bold'>{selectedCommittee?.pricePerComm * selectedCommittee?.totalUserComms}</h1>
                  </div>
                  <div className='w-[43%] h-[100px]  rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
                    <img className='w-[40px]' src={money1} />
                    <h2 className='text-paytxt text-[10px] mt-1'>Paid Amount</h2>
                    <h1 className='text-paytxt text-[16px] font-bold'>{selectedCommittee?.paidAmount}</h1>
                  </div>
                  <div className='w-[43%] h-[100px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                    <img className='w-[40px]' src={cash} />
                    <h2 className='text-paytxt text-[10px] mt-1'>Remaining Amount</h2>
                    <h1 className='text-paytxt text-[16px] font-bold'>{selectedCommittee?.remainingAmount}</h1>
                  </div>
                  <div className='w-[43%] h-[100px] rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
                    <img className='w-[40px]' src={startdate} />
                    <h2 className='text-paytxt text-[10px] mt-1'>Starting Date</h2>
                    <h1 className='text-paytxt text-[16px] font-bold'>{formatDate(selectedCommittee?.startingMonth)}</h1>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {showConfirmAlert && (
        <Alert
          message={confirmMessage}
          onConfirm={() => {
            if (confirmAction === 'payCommitee') {
              handlePayCommittee("pay");
            }
            else if (confirmAction === "unpayCommitee") {
              handlePayCommittee("unpay");
            }
          }}
          onCancel={handleAlertCancel}
        />
      )}
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
    </>



  )
}
