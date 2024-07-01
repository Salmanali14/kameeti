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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);
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

  useEffect(() => {
    if (selectedCommittee) {
      const filtered = selectedCommittee.payments.filter(payment => {
        // Convert all properties to lowercase for case-insensitive search
        const paymentValues = Object.values(payment).map(value => value.toString().toLowerCase());
        // Check if any property includes the search query
        return paymentValues.some(value => value.includes(searchQuery.toLowerCase()));
      });
      setFilteredPayments(filtered);
    }
  }, [searchQuery, selectedCommittee]);
  
  

  const handleCommitteeChange = (event) => {
    const commId = parseInt(event.target.value, 10); // Convert the value to an integer
    const user = committeeData?.find(user => user?.id === commId);
    // console.log(user);
    setSelectedCommittee(user);
  };

  const remainingUnpaidMonths = selectedCommittee?.totalMonths - selectedCommittee?.payments.length;
  const handleSortBy = (sortBy, sortOrder) => {
    // Sort the filtered payments based on the chosen property
    const sorted = [...filteredPayments].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        // Convert date strings to Date objects for proper comparison
        comparison = new Date(a[sortBy]) - new Date(b[sortBy]);
      } else if (sortBy === "price") {
        // Convert prices to numbers for proper comparison
        comparison = parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
      } else if (sortBy === "status") {
        // Sort by status alphabetically
        comparison = a[sortBy].localeCompare(b[sortBy]);
      } else {
        // Default sorting for other properties
        comparison = a[sortBy] - b[sortBy];
      }
      // Apply sortOrder
      return sortOrder === "asc" ? comparison : -comparison;
    });
    setFilteredPayments(sorted);
  };
  
  
  const [kametiType, setKametiType] = useState('daily');

  const handleKametiTypeChange = (event) => {
    setKametiType(event.target.value);
  };

  const [rows, setRows] = useState([{ id: 1, amount: 200, date: '', photoStatus: 'No Photo' }]);

  const addNewRow = () => {
    if (rows.length < 31) {
      const newRow = { id: rows.length + 1, amount: 200, date: '', photoStatus: 'No Photo' };
      setRows([...rows, newRow]);
    } else {
      alert('Cannot add more than 31 rows');
    }
  };

  const removeRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };
  return (
    <>
      <div className='w-[100%] h-[100vh] flex justify-center items-center bg-black'>
        <div className='w-[97%] rounded-[40px] h-[95vh] flex  '>
          <Sidebar />
          <div className='w-[75%] bg-maincolor ml-[2px] rounded-r-[20px] h-[100%]'>
            <div className='w-[100%] flex justify-between items-center mt-6 border-b-[2px] border-[black] '>
              <h1 className='text-[#A87F0B] text-[25px] font-bold ml-10 mb-6'>Payments</h1>
              <div className="mb-6 ml-[130px] flex items-center mr-6">
              <label className='text-[#A87F0B] text-[15px] font-bold mr-2 whitespace-nowrap  '>Select Kameti Type :</label>
              <select value={kametiType} className='bg-colorinput text-[white] text-[15px] h-[40px] w-[100px] pl-2 outline-none  rounded-3xl' onChange={handleKametiTypeChange}>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            {kametiType === "daily" &&
              <div className="mb-6 ml-[130px] flex items-center mr-6">
              <label className='text-[#A87F0B] text-[15px] font-bold mr-2  whitespace-nowrap '>Select Month :</label>
              <select  className='bg-colorinput text-[white] text-[15px] h-[40px] w-[100px] pl-2 outline-none  rounded-3xl' >
                <option value="daily">january</option>
                <option value="monthly">february</option>
              </select>
            </div>
            }
            </div>
            <div className='w-[100%] flex'>
              <div className='w-[75%] flex justify-center items-center flex-col'>
                <div className='w-[98%]  mt-2  rounded-[20px] items-center  flex justify-between  h-[100px] bg-sidebar '>
                  <div className='w-[50%] ml-5 flex justify-start  flex-col'>
                    <p className='text-gray-200 font-bold'>{selectedCommittee?.commHolderName}</p>
                    <h1 className='text-yellow-600 font-bold text-[30px]' >Rs.  {Number(selectedCommittee?.totalPrice).toLocaleString()}</h1>
                    <p className='text-gray-200 text-[12px]'></p>
                  </div>
                  <div className='flex justify-start flex-col w-[35%] mr-3'>
                    <select className='w-[100%] outline-none border border-[white] bg-[#373737] text-[#999] text-[14px] h-[40px] rounded-[5px] pl-1 pr-3'
                      onChange={handleCommitteeChange}
                    >
                      {committeeData?.length === 0 ? (
                        <option value="" selected="selected" disabled>No kameti</option>
                      ) : (
                        committeeData && committeeData.map((user, index) => (
                          <option key={index} value={user.id}>
                            {user.commHolderName}({user?.totalPrice})
                          </option>))
                      )}

                    </select>
                  </div>
                </div>

                <div className='w-[98%] h-[320px] overflow-y-scroll mt-2 rounded-[20px] items-center  flex flex-col  bg-sidebar'>
                  <div className='w-[95%] flex'>
                    <div className='w-[70%] mt-2 flex items-center rounded-[30px] h-[40px] bg-colorinput'>
                      <IoIosSearch className='text-paytxt text-[25px] ml-5 mr-2' />
                      <input value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} type='text' placeholder='Search' className='border-none outline-none bg-transparent text-paytxt w-[85%] placeholder-paytxt' />
                    </div>
                    <div className='w-[40%] mt-2 ml-2 flex items-center justify-center rounded-[30px] h-[40px] text-paytxt bg-colorinput'>
                    Sort By
                    <select
                      className='outline-none bg-transparent ml-2 text-[13px]  bg-[#373737] text-[#999]'
                      onChange={(e) => handleSortBy(e.target.value, "desc")}
                    >
                      <option value="id" className='text-[13px] bg-[#373737] '>Ascending order</option>
                      <option value="date"  className='text-[13px] bg-[#373737]'>Desending order</option>
                    </select>
                  </div>                  
                  </div>
                  {kametiType === "monthly" &&
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
                  }
                  {kametiType === "daily" &&
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
                      <div className='w-[80px] h-[30px] bg-payform text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
                         Action
                      </div>
                    </div>
                    }
                  {/* Assuming totalMonth is the variable containing the total number of months */}


                  {/* showing paid committees */}
                  {kametiType === "monthly" &&
                    <>
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((item, index) => (
                      <div key={index} className='w-[95%] mt-2 flex items-center justify-around rounded-[30px] h-[40px] text-paytxt bg-colorinput border-colorinput border-[2px]'>
                        <div className='w-[25px] ml-3 h-[25px] bg-payform text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
                          {index + 1}
                        </div>
                        <div className='w-[60px] h-[25px] ml-[5px] text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
                          <img className='w-[15px] mr-2' src={money} alt="money" /> {selectedCommittee?.pricePerComm * selectedCommittee?.totalUserComms}
                        </div>
                        <div className='w-[65px] h-[40px] ml-2 text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
                          <input type='text' className='bg-[#373737] w-[100%] text-white' value={formatDate(item?.date)} disabled
                            onChange={(event) =>
                              setPaymentData(
                                {
                                  date: event.target.value,
                                  price: selectedCommittee?.pricePerComm * selectedCommittee?.totalUserComms
                                }
                              )} />
                        </div>
                        <div className='w-[60px] h-[25px] text-[white] text-[13px] rounded-[30px] flex justify-center items-center cursor-pointer' onClick={() => {
                          setConfirmMessage("Are you sure to unpay this kameti?");
                          setConfirmAction('unpayCommitee');
                          setShowConfirmAlert(true);
                          setPaymentId(item?.id);
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
                    ))
                  ) : (
                    <p className='text-center text-[white] text-[14px]'></p>
                  )}
                  </>
                }
                  {/* showing unpaid committees */}
                   {kametiType === "monthly" &&
                    <>
                  {Array.from({ length: remainingUnpaidMonths })
                  .filter((_, index) => {
                    // Filter the unpaid months based on the search query
                    if (!searchQuery.trim()) return true; // Return true if searchQuery is empty
                    // Check if the index + 1 (month number) includes the search query
                    return (index + 1).toString().includes(searchQuery.trim());
                  })
                  .map((_, index) => (
                    <div key={index} className='w-[95%] mt-2 flex items-center justify-around rounded-[30px] h-[40px] text-paytxt bg-colorinput border-colorinput border-[2px]'>
                      <div className='w-[25px] ml-3 h-[25px] bg-payform text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
                        {selectedCommittee?.payments.length + index + 1}
                      </div>
                      <div className='w-[60px] h-[25px] ml-[15px] text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
                        <img className='w-[15px] mr-2' src={money} alt="money" /> {selectedCommittee?.pricePerComm * selectedCommittee?.totalUserComms}
                      </div>
                      <div className='w-[100px] h-[40px]  text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
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
                
                        setConfirmMessage("Are you sure to pay this kameti?");
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
                </>
}
{kametiType === "daily" &&
<>
{rows.map((row, index) => (
  <div key={index} className='w-[95%] mt-2 pl-3 flex items-center justify-around rounded-[30px] h-[40px] text-paytxt bg-colorinput border-colorinput border-[2px]'>
    <div className='w-[25px]  h-[25px] bg-payform text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
      {row.id}
    </div>
    <div className='w-[60px] h-[25px] ml-[0px] pl-[30px] text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
      <img className='w-[15px] mr-2' src={money} alt="money" /> {row.amount}
    </div>
    <div className='w-[105px] pr-1 h-[40px] ml-[25px] text-[white] text-[13px] rounded-[30px] flex justify-center items-center'>
      <input type='date' className='bg-[#373737] w-[100%] text-white' value={row.date} onChange={(e) => {
        const updatedRows = [...rows];
        updatedRows[index].date = e.target.value;
        setRows(updatedRows);
      }} />
    </div>
    <div className='w-[60px] pr-[20px] h-[25px] text-[white] text-[13px] rounded-[30px] flex justify-center items-center cursor-pointer'>
      Pay
    </div>
    <div className='h-[25px] text-[white] pr-3 text-[13px] rounded-[30px] flex justify-center items-center'>
      <div className='w-[70px] h-[26px] rounded-[30px] text-[12px] text-black flex items-center justify-center cursor-pointer bg-uploaded'>
        Upload
      </div>
      {'\u00A0'}
      <div className='w-[70px] whitespace-nowrap mr-[-10px] text-[12px] h-[26px] rounded-[30px] text-black flex items-center justify-center cursor-pointer bg-paytxt'>
        {row.photoStatus}
      </div>
    </div>
    <div className='pr-4'>
  
    <button onClick={() => removeRow(row.id)} className="ml-2 p-1 bg-red-500 text-white w-[70px] h-[26px] rounded-[30px] text-[12px]  flex items-center justify-center cursor-pointer ">Remove</button>
    </div>
  </div>
))}

  <button onClick={addNewRow} className="mt-4 p-2 w-[140px] h-[40px] rounded-[30px] bg-[#A87F0B] font-bold text-[black]">Add Next Day</button>
</>
}

                  <br></br>

                </div>
              </div>


              <div className='w-[30%] mr-2 h-[427px] flex justify-center m-0 mt-2 bg-sidebar rounded-[20px]'>
                <div className='w-[95%] flex justify-evenly overflow-y-auto  mt-2  flex-wrap '>
                  <div className='w-[43%] h-[100px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                    <img className='w-[50px]' src={bank} />
                    <h2 className='text-paytxt text-[10px] mt-1'>Price(Each)</h2>
                    <h1 className='text-paytxt text-[16px] font-bold'>{Number(selectedCommittee?.pricePerComm).toLocaleString()}</h1>
                  </div>
                  <div className='w-[43%] h-[100px] rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
                    <img className='w-[50px]' src={money2} />
                    <h2 className='text-paytxt text-[10px] mt-1'>Total Price(All)</h2>
                    <h1 className='text-paytxt text-[16px] font-bold'>{Number(selectedCommittee?.totalPrice).toLocaleString()}</h1>
                  </div>
                  <div className='w-[43%] h-[100px]  rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                    <img className='w-[50px]' src={box} />
                    <h2 className='text-paytxt text-[10px] mt-1'>Your kameti</h2>
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
                    <h1 className='text-paytxt text-[16px] font-bold'>{Number(selectedCommittee?.pricePerComm * selectedCommittee?.totalUserComms).toLocaleString()}</h1>
                  </div>
                  <div className='w-[43%] h-[100px]  rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
                    <img className='w-[40px]' src={money1} />
                    <h2 className='text-paytxt text-[10px] mt-1'>Paid Amount</h2>
                    <h1 className='text-paytxt text-[16px] font-bold'>{Number(selectedCommittee?.paidAmount).toLocaleString()}</h1>
                  </div>
                  <div className='w-[43%] h-[100px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                    <img className='w-[40px]' src={cash} />
                    <h2 className='text-paytxt text-[10px] mt-1'>Remaining Amount</h2>
                    <h1 className='text-paytxt text-[16px] font-bold'>{Number(selectedCommittee?.remainingAmount).toLocaleString()}</h1>
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
