import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import editimg from "../../images/paymentImage/kametiEdit.png";
import remove from "../../images/paymentImage/trash.png";
import restore from "../../images/restore.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FaSort } from "react-icons/fa";
import money from "../../images/Moneypay.png";
import calander from "../../images/appointment 1.png";
import check from "../../images/Checkmark.png";
import toast from "react-hot-toast";

import "react-toastify/dist/ReactToastify.css";
import bank from "../../images/paymentImage/banknotes 2.png";
import lastdate from "../../images/paymentImage/calendar 2.png";
import cash from "../../images/paymentImage/cash-payment 1.png";
import startdate from "../../images/paymentImage/january 1.png";
import filter from "../../images/filter.png";

import box from "../../images/paymentImage/safe-box 2.png";
import payday1 from "../../images/paymentImage/Payday.png";
import thirty from "../../images/paymentImage/thirty-one 1.png";
import calender2 from "../../images/paymentImage/payday 1.png";
import money1 from "../../images/paymentImage/money (1) 2.png";
import money2 from "../../images/paymentImage/money 2.png";
import { MdOutlineRestartAlt } from "react-icons/md";
import Alert from "../../components/Alert/Alert";
import WithdrawDates from "../../components/WithdrawDates/WithdrawDates";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FadeLoader, HashLoader } from "react-spinners";
import { TbMenu2 } from "react-icons/tb";
import file from "../../images/history2.png";

import { IconButton } from "@mui/material";
import MobileSidebar from "../../components/MobileSidebar/MobileSidebar";

export default function History({ recordType = null }) {
  // recordType will be all/deleted
  const [payments, setPayments] = useState([]);
  const [allKameties, setAllKameties] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [CommId, setCommId] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  const [btnloader, setBTnloader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawModalProps, setWithdrawModalProps] = useState({
    counts: 0,
    dates: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(2);
  const [selectedKametiType, setSelectedKametiType] = useState("daily");


  const getPayments = async () => {
    setLoading(true);
    try {
      const endpoint = recordType === "deleted" ? "deletedRecords" : "payment";
      const response = await axios.get(`${apiBaseUrl}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const dailyCommittees = response?.data?.data?.daily_committees || [];
      const monthlyCommittees = response?.data?.data?.monthly_committees || [];
  
      const allData = [...dailyCommittees, ...monthlyCommittees];
  
      setAllKameties(allData); // Save all data together
      setPayments(allData); // Default to show all
      setLoading(false);
    } catch (error) {
      setErrorMessage("An error occurred while fetching payments.");
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  let path = window.location.pathname;
  useEffect(() => {
    console.log(payments);
    console.log(allKameties);
    if (path == "/history") {
      recordType == "all";
    }
    getPayments(); // Fetch payments when the component mounts
 
  }, [path]);

  const handleRemoveConfirm = async () => {
    // console.log(CommId);
    setBTnloader(true);
    try {
      const response = await axios.post(
        `${apiBaseUrl}committee/delete`,
        { id: CommId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPayments(payments.filter((payment) => payment.id !== CommId));
      setShowConfirmAlert(false);
      toast.success("Record deleted successfuly!");
      setBTnloader(false);
    } catch (error) {
      console.error("Error removing record:", error);
      setBTnloader(false);
    }
  };
  const handleDelParmanetConfirm = async () => {
    // console.log(CommId);
    setBTnloader(true);
    try {
      const response = await axios.post(
        `${apiBaseUrl}committee/deletePermanent`,
        { id: CommId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPayments(payments.filter((payment) => payment.id !== CommId));
      setShowConfirmAlert(false);
      toast.success("Record deleted successfuly!");
      setBTnloader(false);
    } catch (error) {
      console.error("Error deleting record:", error);
      setBTnloader(false);
    }
  };
  const handleRestoreConfirm = async () => {
    // console.log(CommId);
    setBTnloader(true);
    try {
      const response = await axios.post(
        `${apiBaseUrl}committee/restore`,
        { id: CommId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPayments(payments.filter((payment) => payment.id !== CommId));
      setShowConfirmAlert(false);
      setBTnloader(false);
      toast.success("Record restored successfuly!");
    } catch (error) {
      console.error("Error restoring record:", error);
      setBTnloader(false);
    }
  };
  const navigate = useNavigate();
  const handleEditConfirm = () => {
    console.log("Edit confirmed");
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


  const handleKametiType = (type1) => {
    let type = type1 || "daily";
    console.log(allKameties);
    
    // Check if allKameties is defined and is an array
    if (Array.isArray(allKameties)) {
      if (type === "daily") {
        setPayments(allKameties.filter(item => item?.kametiType === "daily"));
      } else {
        setPayments(allKameties.filter(item => item?.kametiType === "monthly"));
      }
    } else {
      console.error("allKameties is undefined or not an array");
    }
    setSelectedKametiType(type);
  };
  
  useEffect(() => {
    handleKametiType("daily");
  }, [allKameties]); // Trigger useEffect when allKameties changes
  

  const handleShowKameti = (paymentid) => {
    console.log(paymentid);
    navigate(`/payment?id=${paymentid}`);
  };

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = payments
    .filter((payment) =>
      payment.kametiName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstPayment, indexOfLastPayment);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(payments.length / paymentsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  let screenwidth = window.innerWidth;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  function truncate(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + "...";
  }

  return (
    <>
      <div className="w-[100%] h-[100vh] flex justify-center items-center bg-black">
        <div className="w-[100%] rounded-[40px] h-[100vh] flex  ">
          {screenwidth > 430 && <Sidebar />}
          {loading ? (
            <div className="loading-screen flex justify-center items-center sm:w-[75%] w-[100%] h-[100vh] bg-[black]">
              <FadeLoader color="#A87F0B" />
            </div>
          ) : (
            <div className="sm:w-[80%] w-[100%] h-[100vh] overflow-y-scroll sm:pb-3 sm:rounded-l-[0px] rounded-l-[20px] rounded-r-[20px] flex flex-col items-center">

              <div className="w-[100%] h-[90px]  flex justify-between items-center pt-7  border-b-[1px] border-[#535353]">
                
                <span className="flex justify-center items-center w-full sm:w-auto">
                  {screenwidth < 430 && (
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={toggleDrawer(true)}
                      edge="start"
                    >
                      <TbMenu2 className="text-white bg-[#A87F0B] rounded-lg p-[2px] text-[35px] ml-2" />
                    </IconButton>
                  )}
                  <MobileSidebar
                    drawerOpen={drawerOpen}
                    toggleDrawer={toggleDrawer}
                  />

                  {/* Centering the h1 text */}
                  <h1 className="text-white sm:text-[25px]  sm:mr-0 mr-8 text-[20px] font-bold flex items-center justify-center sm:ml-5 sm:mb-6 w-full">
                    {/* Image visible only on larger screens */}
                    {recordType === "deleted" ? (
                      "All Deleted"
                    ) : (
                      <>
                        <img
                          className="hidden sm:block w-[40px] mr-3"
                          src={file}
                          alt="All kameties icon"
                        />
                        All Kameties
                      </>
                    )}
                  </h1>
                </span>
              </div>

              <br />

              <div className="w-[100%] flex items-center justify-center">
                <div className="flex w-[45%] sm:w-[23%] mb-2 items-center relative">
                  <div className="bg-[#181818] border text-white outline-none border-[#e2e2e269] rounded-[30px] h-[39px] sm:h-[45px] w-[100%] relative">
                    <button
                      className={`text-white absolute left-0 rounded-[30px] h-[39px] sm:h-[44px] sm:text-[16px] w-[53%] ${
                        selectedKametiType === "daily" ? "bg-[#A87F0B]" : ""
                      }`}
                      style={
                        selectedKametiType === "daily"
                          ? {
                              boxShadow:
                                "-4.2px 5.88px 7.22px 0px rgba(255, 255, 255, 0.34) inset",
                            }
                          : {}
                      }
                      onClick={() => handleKametiType("daily")}
                    >
                      Daily
                    </button>
                    <button
                      className={`absolute right-0 rounded-[30px] h-[39px] sm:h-[44px] sm:text-[16px] w-[53%] ${
                        selectedKametiType === "monthly" ? "bg-[#A87F0B]" : ""
                      }`}
                      style={
                        selectedKametiType === "monthly"
                          ? {
                              boxShadow:
                                "-4.2px 5.88px 7.22px 0px rgba(255, 255, 255, 0.34) inset",
                            }
                          : {}
                      }
                      onClick={() => handleKametiType("monthly")}
                    >
                      Monthly
                    </button>
                  </div>
                </div>
              </div>

              <br />
              {payments.length === 0 ? (
  <div className="flex justify-center items-center w-[100%] h-[100%] text-white">
    <p className="text-[#ffffff] text-center sm:text-[20px] text-[15px]">
      No record(s) found, click to create{" "}
      <span
        className="underline cursor-pointer text-[#A87F0B] hover:text-[#d4a20a]"
        onClick={() => navigate("/create")} // Change the route as needed
      >
        Kameti
      </span>
    </p>
  </div>
) : (
  <>
    <button
      className={`flex items-center justify-between sm:w-[92%] w-[89%] ${
        payments.length === 0 ? "h-[67px]" : "h-[45px] py-[19px]"
      } rounded-[10px] bg-colorinput text-[white] pl-5`}
    >
      {/* Search Icon and Input */}
      <div className="flex items-center w-full">
        <IoIosSearch className="text-[white] sm:text-[20px]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="outline-none text-[14px] pr-2 sm:text[16px] bg-transparent border-none w-full placeholder-white"
        />
      </div>
    </button>

    <div className="flex justify-center items-center w-[93%]">
      <div className="flex justify-between flex-wrap sm:h-[67vh] mt-[10px] overflow-y-auto w-[100%]">
                    {payments
                      .filter((payment) => {
                        // Filter payments based on search query
                        return payment.kametiName
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase());
                      })
                      .map((payment, index) => (
                        <div
                          key={index}
                          className="sm:w-[100%] w-[100%]  mt-2 rounded-[20px] bg-sidebar m-2"
                        >
                          {/* <div className='w-100% h-[60px] rounded-t-[20px] bg-colorinput flex justify-between items-center'>
                            <div className='flex items-center ml-5'>
                              <div className='w-[25px] ml-1 h-[25px] bg-customBlack text-[white] mr-1 text-[12px] rounded-[50px] flex justify-center items-center'>
                                {index + 1}
                              </div>
                              <p className='text-white text-[20px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[125px] ml-2'>{payment.kametiName}</p>

                            </div>

                          </div> */}

<div 
  className="w-[100%] relative bg-colorinput items-center flex-row px-[12px] py-[14px] sm:p-[30px] rounded-[10px] cursor-pointer"  
  onClick={() => handleShowKameti(payment.id)}
>

                          <div className="w-full h-[30px] flex items-center flex-wrap sm:flex-nowrap relative">
  {/* Kameti Name Label */}
  <h2 className="text-white text-[12px] sm:text-[17px] w-auto sm:w-[19%] whitespace-nowrap">
    Kameti Name
  </h2>

  {/* Separator */}
  <p className="text-paytxt w-auto sm:w-[5%] font-bold mx-2">:</p>

  {/* Truncated name for small screens */}
  <h1 className="text-white text-[12px] sm:text-[17px] block sm:hidden">
    {truncate(payment.kametiName, 14)}
  </h1>

  {/* Full name for larger screens */}
  <h1 className="text-white text-[12px] sm:text-[17px] hidden sm:block">
    {payment.kametiName}
  </h1>

  {/* Action buttons */}
  {recordType === "deleted" ? (
    <div className="flex items-center absolute right-0">
      <button
        className="flex justify-center items-center mr-2 text-white text-[12px] bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          setConfirmMessage("Are you sure you want to restore?");
          setConfirmAction("restore");
          setShowConfirmAlert(true);
          setCommId(payment.id);
        }}
      >
        <img className="w-[20px] sm:w-[30px]" src={restore} />
      </button>
      <button
        className="flex justify-center items-center text-white text-[12px] bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          setConfirmMessage("Are you sure you want to delete permanently?");
          setConfirmAction("del_parmanent");
          setShowConfirmAlert(true);
          setCommId(payment.id);
        }}
      >
        <img className="w-[20px] sm:w-[30px]" src={remove} />
      </button>
    </div>
  ) : (
    <div className="flex items-center absolute right-0">
      <button
        className="flex justify-center items-center mr-2 text-white text-[12px] bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          setConfirmMessage("Are you sure you want to edit?");
          setConfirmAction("edit");
          setShowConfirmAlert(true);
          setCommId(payment.id);
        }}
      >
        <img className="w-[20px] sm:w-[30px]" src={editimg} />
      </button>
      <button
        className="flex justify-center items-center text-white text-[12px] bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          setConfirmMessage("Are you sure you want to remove?");
          setConfirmAction("remove");
          setShowConfirmAlert(true);
          setCommId(payment.id);
        }}
      >
        <img className="w-[20px] sm:w-[30px]" src={remove} />
      </button>
    </div>
  )}
</div>


                            <div className="w-full h-[30px] flex items-center flex-wrap sm:flex-nowrap relative">
  <h2 className="text-white text-[12px] sm:text-[17px] w-auto sm:w-[19%] whitespace-nowrap">
    Monthly Amount
  </h2>

  <p className="text-paytxt w-auto sm:w-[5%] font-bold mx-2">:</p>

  <h1 className="text-white text-[12px] sm:text-[17px] w-auto">
    Rs.{Number(payment.pricePerMonthKameti).toLocaleString()}
  </h1>
</div>

                            {payment.kametiType === "daily" && (
                           <div className="w-full h-[30px] flex items-center flex-wrap sm:flex-nowrap">
                           <h2 className="text-white text-[12px] sm:text-[17px] w-auto sm:w-[19%] whitespace-nowrap">
                             Daily Amount
                           </h2>
                         
                           <p className="text-paytxt w-auto sm:w-[5%] font-bold mx-2">:</p>
                         
                           <h1 className="text-white text-[12px] sm:text-[17px] w-auto">
                             Rs.{Number(payment.pricePerDayKameti).toLocaleString()}
                           </h1>
                         </div>
                         
                            )}
                            {/* <div className="w-[100%] h-[30px] flex items-center flex-row">
                              <h2 className="text-white text-[12px] sm:text-[17px] sm:w-[25%] w-[40%]">
                               
                                  My Kameti (s){" "}
                                </h2>
                                <p className="text-paytxt w-[5%] font-bold font-bold">:</p>

                                <h1 className="text-white text-[12px] sm:text-[17px]">
                                  {payment.myTotalKametis}
                                </h1>F
                              </div> */}
                          <div className="w-full h-[30px] flex items-center flex-wrap sm:flex-nowrap">
  <h2 className="text-white text-[12px] sm:text-[17px] w-auto sm:w-[19%] whitespace-nowrap">
    Monthly Payable
  </h2>

  <p className="text-paytxt w-auto sm:w-[5%] font-bold mx-2">:</p>

  <h1 className="text-white text-[12px] sm:text-[17px] w-auto">
    Rs.{Number(payment.perMonthPayablePrice).toLocaleString()}
  </h1>
</div>

                            {payment.kametiType === "daily" && (
                            <div className="w-full h-[30px] flex items-center flex-wrap sm:flex-nowrap">
                            <h2 className="text-white text-[12px] sm:text-[17px] w-auto sm:w-[19%]  whitespace-nowrap">
                              Daily Payable
                            </h2>
                          
                            <p className="text-paytxt w-auto sm:w-[5%] font-bold mx-2">:</p>
                          
                            <h1 className="text-white text-[12px] sm:text-[17px] w-auto">
                              Rs.{Number(payment.perDayPayablePrice).toLocaleString()}
                            </h1>
                          </div>
                          
                            )}
                            {/* <div className="w-[100%] h-[30px] flex items-center flex-row ">
                              <h2 className="text-white text-[12px] sm:text-[17px] sm:w-[25%] w-[40%]">

                                  Total Price(All)
                                </h2>
                                <p className="text-paytxt w-[5%] font-bold">:</p>

                                <h1 className="text-white text-[12px] sm:text-[17px]">
                                  {Number(payment.totalPrice).toLocaleString()}
                                </h1>
                              </div> */}
                          <div className="w-full h-[30px] flex items-center flex-wrap sm:flex-nowrap">
  <h2 className="text-white text-[12px] sm:text-[17px] w-auto sm:w-[19%] whitespace-nowrap">
    Total Month
  </h2>

  <p className="text-paytxt w-auto sm:w-[5%] font-bold mx-2">:</p>

  <h1 className="text-white text-[12px] sm:text-[17px] w-auto">
    {payment.totalMonths}
  </h1>
</div>

                            <div className="w-full h-[30px] flex items-center flex-wrap sm:flex-nowrap">
  <h2 className="text-white text-[12px] sm:text-[17px] w-auto sm:w-[19%] whitespace-nowrap">
    Paid Amount
  </h2>

  <p className="text-paytxt w-auto sm:w-[5%] font-bold mx-2">:</p>

  <h1 className="text-white text-[12px] sm:text-[17px] w-auto">
    Rs.{Number(payment.paidAmount).toLocaleString()}
  </h1>
</div>

                            <div className="w-full h-[30px] flex items-center flex-wrap sm:flex-nowrap">
  <h2 className="text-white text-[12px] sm:text-[17px] w-auto sm:w-[19%] whitespace-nowrap">
    Remaining Amount
  </h2>

  <p className="text-paytxt w-auto sm:w-[5%] font-bold mx-2">:</p>

  <h1 className="text-white text-[12px] sm:text-[17px] w-auto">
    Rs.{Number(payment.remainingAmount).toLocaleString()}
  </h1>

  <div className="absolute right-2 sm:right-5 flex flex-col items-center">
    <button
      style={{
        boxShadow: "-2.17px 3.04px 3.73px 0px #00000057 inset",
      }}
      className={`py-[7px] px-[5px] text-[10px] w-[65px] rounded-[10px] border-none cursor-pointer shadow-inner transition-colors 
      ${
        payment.kametiType === "daily"
          ? "bg-[#A87F0B] text-white"
          : "bg-[#CACACA] text-black"
      } 
      sm:py-[10px] sm:px-[10px] sm:text-[15px] sm:w-[110px]`}
      onClick={() => console.log(`Button clicked for ${payment.kametiType}`)}
    >
      {payment.kametiType === "daily" ? "Daily" : "Monthly"}
    </button>

    {recordType === "deleted" && payment.id ? null : (
      <p
        className="text-[#A87F0B] text-xs sm:text-sm cursor-pointer hover:text-[#7A5C08] mt-2"
        onClick={() => handleShowKameti(payment.id)}
      >
        Show More
      </p>
    )}
  </div>
</div>

                            {/* <div className="w-[100%] h-[30px] flex items-center flex-row ">
                              <h2 className="text-white text-[12px] sm:text-[17px] sm:w-[25%] w-[40%]">

                                  Starting Date
                                </h2>
                                <p className="text-paytxt w-[10%] font-bold">:</p>

                                <h1 className="text-white text-[12px] sm:text-[17px]">
                                  {formatDate(payment.startingMonth)}
                                </h1>
                              </div> */}
                            {/* <div className="w-full h-[30px] flex items-center relative">
                              <h2 className="text-white text-[12px] sm:text-[17px] sm:w-[25%] w-[40%]">

                                  Ending Date
                                </h2>
                                <p className="text-paytxt w-[10%] font-bold">:</p>
                                <h1 className="text-white text-[12px] sm:text-[17px]">
                                  {formatDate(payment.endingMonth)}
                                </h1>

                            
                             </div> 

                              {/* <div className={`m-1 h-[90px] rounded-[20px] bg-colorinput flex justify-center items-center flex-row ${payment.kametiType === "daily" ? 'w-[30%]' : 'w-[100%]'}`}>
                              <div className='flex cursor-pointer items-center justify-center flex-col '>
                                <img className='w-[30px] ' src={calander} />
                                <h2 className='text-paytxt text-[12px] mt-1 '>Withdraw Date </h2>
                              </div>
                              {recordType == "all" && (
                                <button onClick={() => {

                                  openWithdrawModal(payment?.myTotalKametis, payment?.withdraw);
                                  setCommId(payment.id);
                                }} className='w-[70px] h-[22px] rounded-[20px] text-paytxt text-[11px]  bg-maincolor ' >View Date</button>)}
                            </div> */}
                          </div>
                        </div>
                      ))}
                    {payments.filter((payment) =>
                      payment.kametiName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    ).length === 0 &&
                      searchQuery.trim() !== "" && (
                        <p className="flex justify-center items-center text-[white] w-[80%]">
                          No results found
                        </p>
                      )}
                  </div>
                </div>
                </>
              )}
              {/* 
<div className='flex justify-center mb-3 items-center w-[100%]'>
<button className='flex justify-center items-center w-[90px] h-[30px] mb-1 bg-[#323232] text-[#999] text-[13px] rounded-3xl '>Previous</button>
<div className='flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#A87F0B] ml-5 mr-2'>1</div>
<div className='flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#323232] ml-2 mr-2'>2</div>
<div className='flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#323232] ml-2 mr-2'>3</div>
<div className='flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#323232] ml-2 mr-2'>4</div>
<div className='flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#323232] ml-2 mr-5'>5</div>
<button className='flex justify-center items-center w-[90px] h-[30px] mb-1 bg-[#323232] text-[white] text-[13px] rounded-3xl '>Next</button>
</div>
*/}
            </div>
          )}
        </div>

        {/* Confirm alert component */}
        {showConfirmAlert && (
          <Alert
            message={confirmMessage}
            btnloader={btnloader}
            onConfirm={() => {
              if (confirmAction === "edit") {
                handleEditConfirm();
              } else if (confirmAction === "remove") {
                handleRemoveConfirm();
              } else if (confirmAction === "restore") {
                handleRestoreConfirm();
              } else if (confirmAction === "del_parmanent") {
                handleDelParmanetConfirm();
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
            getPayments={getPayments}
          />
        )}
      </div>

    </>
  );
}
