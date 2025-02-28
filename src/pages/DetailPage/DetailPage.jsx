import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FaSort } from "react-icons/fa";
import money from "../../images/Moneypay.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, useParams } from "react-router-dom";
import "../DetailPage/DetailPage.css";
import calander from "../../images/appointment 1.png";
import check from "../../images/Checkmark.png";
import bank from "../../images/paymentImage/banknotes 2.png";
import lastdate from "../../images/paymentImage/calendar 2.png";
import cash from "../../images/paymentImage/cash-payment 1.png";
import startdate from "../../images/paymentImage/january 1.png";
import box from "../../images/paymentImage/safe-box 2.png";
import payday1 from "../../images/paymentImage/Payday.png";
import thirty from "../../images/paymentImage/thirty-one 1.png";
import calender2 from "../../images/paymentImage/payday 1.png";
import money1 from "../../images/paymentImage/money (1) 2.png";
import money2 from "../../images/paymentImage/money 2.png";
import Alert from "../../components/Alert/Alert";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

import kametiLogo2 from "../../images/kametiLogo2.png";
import toogle from "../../images/toogle.png";
import toogle2 from "../../images/toogle2.png";

import k1 from "../../images/k1.png";
import k2 from "../../images/k2.png";
import k3 from "../../images/k3.png";
import k4 from "../../images/k4.png";
import k5 from "../../images/k5.png";
import k6 from "../../images/k6.png";
import k7 from "../../images/k7.png";
import k8 from "../../images/k8.png";
import k9 from "../../images/k9.png";
import k10 from "../../images/k10.png";
import k11 from "../../images/k11.png";
import k12 from "../../images/k12.png";
import k13 from "../../images/k13.png";
import k14 from "../../images/k14.png";
import daily1 from "../../images/daily1.png";
import daily2 from "../../images/daily2.png";

import { MdOutlineRestartAlt } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";

import axios from "axios";
import toast from "react-hot-toast";

import { FadeLoader, HashLoader } from "react-spinners";
import { IconButton } from "@mui/material";
import { TbMenu2 } from "react-icons/tb";

import WithdrawDates from "../../components/WithdrawDates/WithdrawDates";

export default function Payment() {
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [kametiType, setKametiType] = useState("daily");
  const [loading, setLoading] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [withdrawModalProps, setWithdrawModalProps] = useState({
    counts: 0,
    dates: [],
  });
  const [isToggled, setIsToggled] = useState(false);
  // const kametiId = 27185;
  const { kametiId } = useParams();

  const openWithdrawModal = (counts, dates) => {
    setWithdrawModalProps({ counts, dates });
    setShowWithdrawModal(true);
  };
  const toggleDropdown = () => {
    setIsToggled(!isToggled);
    setShowDropdown(!showDropdown);
  };
  // console.log(filteredPayments)
  const fetchKametis = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}singleComm/${kametiId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      let kametees;
      setSelectedCommittee(response?.data?.data);
      kametees = response?.data?.data;
      // setFilteredPayments(kametees?.payments);

      if (kametees?.kametiType === "daily") {
        console.log(kametees?.payments?.paidKametiResponse);
        const allPaidKametis =
          kametees?.payments?.paidKametiResponse?.flatMap(
            (item) => item.paidkametis
          ) ?? [];
        // console.log(allPaidKametis);
        // Update the filteredPayments state
        setFilteredPayments(allPaidKametis);
      } else {
        console.log(kametees?.payments?.paidKametiResponse);
        console.log(
          kametees?.payments?.paidKametiResponse[0]?.paidkametis ?? []
        );

        var paidKametiResp = kametees?.payments?.paidKametiResponse;
        paidKametiResp.length == 0
          ? setFilteredPayments([])
          : setFilteredPayments(
              kametees?.payments?.paidKametiResponse[0]?.paidkametis ?? []
            );
      }

      setLoading(false);
    } catch (error) {
      if (error?.response?.status == 404) {
        setSelectedCommittee([]);
      }
      setLoading(false);
      // console.error('Error fetching data:', error?.response?.status);
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" }; // 'numeric' for full year
    return date.toLocaleDateString("en-GB", options); // 'en-GB' ensures the dd/mm/yyyy format
  };
  const dateToTimestamp = (date) => {
    const timestamp = new Date(date).getTime();
    return timestamp;
  };
  

  // const handleAlertCancel = () => {
  //   setShowConfirmAlert(false); // Hide the confirm alert
  // };
  useEffect(() => {
    fetchKametis(kametiType);
  }, [kametiType]);

  // useEffect(() => {
  //   if (selectedCommittee) {

  //     // const filtered = selectedCommittee?.payments?.filter(payment => {
  //     //   // Convert ase kall properties to lowercase for case-insensitive search
  //     //   const paymentValues = Object.values(payment).map(value => value.toString().toLowerCase());
  //     //   // Check if any property includes the search query
  //     //   return paymentValues.some(value => value.includes(searchQuery.toLowerCase()));
  //     // });
  //     setFilteredPayments(selectedCommittee?.payments);
  //   }
  // }, [selectedCommittee]);

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
        // Default sorting for other propertiess
        comparison = a[sortBy] - b[sortBy];
      }
      // Apply sortOrder
      return sortOrder === "asc" ? comparison : -comparison;
    });
    setFilteredPayments(sorted);
  };

  const [date, setDate] = useState(new Date());
  const [highlightedDatesMap, setHighlightedDatesMap] = useState({});
  const [highlightedDates, setHighlightedDates] = useState({
    dates: [],
    committeeId: null,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [months, setMonths] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [calendarKey, setCalendarKey] = useState(0); // Key to force re-render of the calendar
  const calendarRef = useRef(null);

  const getMonthsInRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const months = [];
    let currentDate = new Date(startDate); // Initialize currentDate with startDate

    while (currentDate <= endDate) {
      if (kametiType === "daily") {
        currentDate.setDate(1); // Set date to the 1st of the month if kametiType is 'daily'
      }
      months.push(currentDate.getTime()); // Add the timestamp of the current month

      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return months;
  };
  useEffect(() => {
    if (selectedCommittee) {
      console.log(selectedCommittee);
      // Set the months to be displayed on the calendar
      const newMonths = getMonthsInRange(
        selectedCommittee?.startingMonth,
        selectedCommittee?.endingMonth
      );
      setMonths(newMonths);

      // Reset calendar to the starting month of the selected committee
      setDate(new Date(selectedCommittee?.startingMonth));

      // Force calendar to re-render by changing key
      setCalendarKey((prevKey) => prevKey + 1);
    }
  }, [selectedCommittee?.id]);

  useEffect(() => {
    console.log(paymentDetails);
    if (selectedCommittee?.id) {
      if (filteredPayments?.length > 0) {
        const paymentDates = filteredPayments.map(
          (payment) => new Date(payment.date)
        );

        setHighlightedDatesMap((prevMap) => ({
          ...prevMap,
          [selectedCommittee.id]: paymentDates,
        }));

        setHighlightedDates({
          dates: paymentDates,
          committeeId: selectedCommittee.id,
        });
      } else {
        setHighlightedDatesMap((prevMap) => ({
          ...prevMap,
          [selectedCommittee.id]: [],
        }));

        setHighlightedDates({
          dates: [],
          committeeId: selectedCommittee.id,
        });
      }
    }
  }, [filteredPayments, selectedCommittee]);

  useEffect(() => {
    if (calendarRef.current) {
      // Force calendar to update view if necessary
      calendarRef.current.viewDate = new Date(selectedCommittee?.startingMonth);
    }
  }, [calendarKey]);

  useEffect(() => {
    if (selectedCommittee?.id && highlightedDatesMap[selectedCommittee?.id]) {
      setHighlightedDates({
        dates: highlightedDatesMap[selectedCommittee?.id],
        committeeId: selectedCommittee?.id,
      });
    } else {
      setHighlightedDates({ dates: [], committeeId: selectedCommittee?.id });
    }
  }, [selectedCommittee, highlightedDatesMap]);

  // const minDate = new Date(Math.min(...months));
  // const maxDate = new Date(Math.max(...months));


  const minDate = new Date(Math.min(...months));

  let maxDate = new Date(selectedCommittee?.endingMonth);



  // console.log(minDate, maxDate, ...months);
  const handleDateClick = (value) => {
    console.log(filteredPayments);
    const clickedDate = value.toDateString();
    const clickedMonth = value.getMonth();
    const clickedYear = value.getFullYear();
    // console.log(clickedDate);
    const payment = filteredPayments.find((p) => {
      const paymentDate = new Date(p.date);
      // console.log(paymentDate.toDateString());
      return paymentDate.toDateString() === clickedDate;
    });

    if (payment) {
      // Show payment details
      if (selectedCommittee?.kametiType == "daily") {
        var price =
          selectedCommittee?.pricePerDayKameti *
          selectedCommittee?.myTotalKametis;
      } else {
        var price =
          selectedCommittee?.pricePerMonthKameti *
          selectedCommittee?.myTotalKametis;
      }
      setPaymentDetails({
        date: payment.date,
        price: price,
      });
      setModalVisible(true);
    }
  };

  const [rows, setRows] = useState([]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  const formatPrice = (value) => {
    // Ensure value is a string before calling replace
    let formattedValue = String(value).replace(/[^0-9]/g, ""); // Remove non-numeric characters
    return new Intl.NumberFormat().format(formattedValue); // Format with commas
  };
  return (
    <>
      <div className="bg-[#2A2A2A] text-white min-h-screen">
        {/* Header Section */}
        <div className="bg-[#A87F0B] text-center py-1 px-2 text-[20px] sm:text-[27px]">

        {selectedCommittee?.kametiName}'s Kameti
        </div>

        {/* User Details */}
        <div className="mt-4 flex items-center justify-between w-full sm:w-[340px] relative">
          {/* Logo Section */}
          <div className="relative flex items-center gap-4 mt-[35px] rounded-tr-[30px] rounded-br-[30px] bg-[#FFFFFF33] ">
            {/* Logo */}
            <img
              src={kametiLogo2}
              alt="Kameti Logo"
              className="absolute h-[70px] object-cover w-[135px] md:w-[155px]"
            />

            {/* Overlay Content */}
            <div className="flex items-center gap-4">
              {/* Text Content */}
              <div className="flex flex-col sm:flex-col pl-[144px] sm:pl-[165px] h-[63px] pr-[30px] justify-center">
                <p className="text-sm sm:text-[15px] font-semibold">
                  Rs. {Number(selectedCommittee?.totalPrice).toLocaleString()}
                </p>
                <p className="text-[11px] w-[145px] sm:text-[12px] sm:w-auto">
                  
                  {selectedCommittee?.kametiName}
                  </p>
              </div>

            </div>
          </div>
        </div>

        {/* Monthly Details */}
        <div className="mt-6 pt-[26px]">
          <h2 className="bg-[#A87F0B] text-center py-3 font-bold rounded-t-[20px] text-sm sm:text-lg md:text-xl lg:text-2xl">
            {selectedCommittee?.kametiType === "daily"
              ? "Daily Kameti"
              : "Monthly Kameti"}
          </h2>

          <div className="grid grid-cols-1 bg-[#333232] rounded-b-[20px] mb-12">
            {/* Mapping through the separate sections */}
              {Object.entries({
                             monthly: [
                               ...(selectedCommittee?.kametiType === "daily"
                                 ? [
                                     {
                                       image: daily1,
                                       title: "Daily Amount",
                                       value:
                                         "Rs." +
                                         Number(
                                           selectedCommittee?.pricePerDayKameti
                                         ).toLocaleString(),
                                     },
                                     {
                                       image: daily2,
                                       title: "Daily Payable",
                                       value:
                                         "Rs." +
                                         Number(
                                           selectedCommittee?.perDayPayablePrice
                                         ).toLocaleString(),
                                     },
                                   ]
                                 : []),
                               {
                                 image: k1,
                                 title: "Monthly Amount",
                                 value:
                                   "Rs." +
                                   Number(
                                     selectedCommittee?.pricePerMonthKameti
                                   ).toLocaleString(),
                               },
                               {
                                 image: k2,
                                 title: "Monthly Payable",
                                 value:
                                   "Rs." +
                                   Number(
                                     selectedCommittee?.pricePerMonthKameti *
                                       selectedCommittee?.myTotalKametis
                                   ).toLocaleString(),
                               },
                               {
                                 image: k3,
                                 title: "Total Payable",
                                 value:
                                 "Rs." +
                                 Number(selectedCommittee?.totalPrice || 0).toLocaleString(),
                               },
                               {
                                 image: k4,
                                 title: "Total Months",
                                 value:
                                 (selectedCommittee?.totalMonths || 0).toLocaleString(),
                               },
                             ],
                             amounts: [
                               {
                                 image: k5,
                                 title: "Total Amount",
                                 value:
                                   "Rs." +
                                   (
                                     parseFloat(selectedCommittee?.totalPrice) /
                                     parseFloat(selectedCommittee?.myTotalKametis)
                                   ).toLocaleString(),
                               },
                               {
                                 image: k6,
                                 title: "Paid Amount",
                                 value:    "Rs." + Number(
                                   selectedCommittee?.paidAmount
                                 ).toLocaleString(),
                               },
                               {
                                 image: k7,
                                 title: "Remaining Amount",
                                 value:
                                   "Rs." +
                                   Number(
                                     selectedCommittee?.remainingAmount
                                   ).toLocaleString(),
                               },
                             ],
                             kameties: [
                               {
                                 image: k8,
                                 title: "My Kameties",
                                 value:
  (selectedCommittee?.myTotalKametis || 0).toLocaleString(),
                               },
                               {
                                 image: k9,
                                 title: "Paid Kameties",
                                 value:
                            
                                   (
                                     parseInt(selectedCommittee?.noOfPaidKameties) *
                                     parseInt(selectedCommittee?.myTotalKametis)
                                   ).toLocaleString(),
                               },
                               {
                                 image: k10,
                                 title: "Kameties Payable",
     
                                 value:
                                   selectedCommittee?.kametiType === "daily"
                                     ? parseInt(selectedCommittee?.totalMonths) *
                                       30 *
                                       parseInt(selectedCommittee?.myTotalKametis)
                                     : parseInt(selectedCommittee?.totalMonths) *
                                       parseInt(selectedCommittee?.myTotalKametis),
                               },
                               {
                                 image: k11,
                                 title: "Remaining Kameties",
                                 value:
                                   selectedCommittee?.kametiType === "daily"
                                     ? parseInt(selectedCommittee?.totalMonths) *
                                         30 *
                                         parseInt(
                                           selectedCommittee?.myTotalKametis
                                         ) -
                                       parseInt(
                                         selectedCommittee?.noOfPaidKameties
                                       ) *
                                         parseInt(selectedCommittee?.myTotalKametis)
                                     : parseInt(selectedCommittee?.totalMonths) *
                                         parseInt(
                                           selectedCommittee?.myTotalKametis
                                         ) -
                                       parseInt(
                                         selectedCommittee?.noOfPaidKameties
                                       ) *
                                         parseInt(selectedCommittee?.myTotalKametis),
                               },
                             ],
                             dates: [
                               {
                                 image: k12,
                                 title: "Start Date",
                                 value: formatDate(selectedCommittee?.startingMonth),
                               },
                               {
                                 image: k13,
                                 title: "End Date",
                                 value: formatDate(selectedCommittee?.endingMonth),
                               },
                               {
                                 image: k14,
                                 title: "Withdrawal Dates",
                                 value: "Click To View",
                               },
                             ],
                           }).map(([section, items], sectionIndex) => (
               <div
                                       key={sectionIndex}
                                       className="mt-6 mb-1 bg-[#2B2B2B] rounded-[8px] py-[25px] sm:m-[30px] m-[0px]" // Add bottom margin here
                                     >
                                       {/* Section Header */}
                                       <h3 className="font-medium text-lg pl-6 sm:pl-6 text-sm sm:text-lg md:text-xl lg:text-2xl pb-3">
                                         {section === "monthly"
                                           ? selectedCommittee?.kametiType == "daily"
                                             ? "Daily Kameti Info"
                                             : "Monthly Kameti Info"
                                           : section === "amounts"
                                           ? "Amounts Info"
                                           : section === "kameties"
                                           ? "Kameties Info"
                                           : section === "dates"
                                           ? "Dates Info"
                                           : ""}
                                       </h3>
             
                                       {/* Section Items */}
                                       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2 font-medium text-lg ">
                                         {items.map((item, index) => (
                                           <div
                                             key={index}
                                             className="flex items-center p-4 space-x-4 relative"
                                           >
                                             {/* Conditionally Render Image */}
                                             {item.title !== "Withdrawal Dates" && (
                                               <img
                                                 src={item.image}
                                                 alt={item.title}
                                                 className="w-[35px] h-[35px] sm:w-[65px] sm:h-[65px] object-cover rounded-md"
                                               />
                                             )}
                                             <div>
                                               {/* Conditional Dropdown for 'Withdrawal Dates' */}
                                               {item.title === "Withdrawal Dates" ? (
                                                             <div
                                                                                     className="relative bg-[#A87F0B] w-[280px] rounded-[20px] px-[15px] py-[10px] shadow-[inset_0px_-7px_4px_0px_#00000040]"
                                                                                     onClick={toggleDropdown}
                                                                                   >
                                                                                     <h4 className="text-xs sm:text-sm text-[#CACACA] sm:leading-[1.2]">
                                                                                                                           {item.title}
                                                                                                                         </h4>
                                                                                                                         <div className="flex items-center justify-between w-full text-sm">
                                                                                                                           <button>{item.value}</button>
                                                                                                                           {isToggled ? (
                                                                                                                             <img
                                                                                                                               src={toogle2}
                                                                                                                               alt="Toggle Two"
                                                                                                                               className="w-[25px] cursor-pointer"
                                                                                                                             />
                                                                                                                           ) : (
                                                                                                                             <img
                                                                                                                               src={toogle}
                                                                                                                               alt="Toggle One"
                                                                                                                               className="w-[25px] cursor-pointer"
                                                                                                                             />
                                                                                                                           )}
                                                                                                                         </div>
                                                                                                             {showDropdown && (
                                                                         <div
                                                                        
                                                                           className="absolute top-full left-0 z-10 w-[290px] max-h-[155px]  bg-[#333] text-white rounded-md mt-2 p-2 shadow-[inset_0px_-7px_4px_0px_#00000040]"
                                                                           onClick={(e) => e.stopPropagation()}
                                                                         >
                                                                           {selectedCommittee?.withdraw.map((date, index) => (
                                                                             <div key={index} className="dropdown-item flex items-center mb-5 justify-between">
                                                                               <div className="flex items-center w-[70%]">
                                                                                 <span className="rounded-[100px] bg-[#A87F0B] text-center w-[30px] text-[15px]">{index + 1}</span>
                                                                                 <strong className="ml-3 text-[16px] text-right">
                                                                                 Rs.{formatPrice(
                                                   parseInt(selectedCommittee?.totalPrice) /
                                                   parseInt(selectedCommittee?.myTotalKametis)
                                                 )}
                                                                                 </strong>
                                                                               </div>
                                                                               <span
                                                                                 className="text-right text-[15px] text-center w-[30%] cursor-pointer flex items-center justify-between"
                                                                              
                                                                               >
                                                                                 {date == null ? "N/A" :  formatDate(date)}
                                                                             
                                                                               </span>
                                               
                                               
                                                                               
                                                                             </div>
                                                                           ))}
                                                                         </div>
                                                                       )}
                                                                         </div>
                                               ) : (
                                                 <>
                                                   <h4 className="text-xs sm:text-lg text-[#CACACA] sm:leading-[1.2]">
                                                     {item.title}
                                                   </h4>
                                                   {/* <p className="text-sm sm:text-lg text-[#FFFFFF] sm:leading-[1.2]">
               {new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR' }).format(Number(item.value) || 0)}
             </p> */}
             
             <p className="text-sm sm:text-lg text-[#FFFFFF] sm:leading-[1.2] font-sans">
               {item.value}
             </p>
             
             
                                                 </>
                                               )}
                                             </div>
                                           </div>
                                         ))}
                                       </div>
                                     </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          {/* Calendar Header */}
          <div
            className="w-full bg-[#A87F0B] text-center py-3 font-bold rounded-t-[20px] 
    text-sm sm:text-lg md:text-xl lg:text-2xl"
          >
            Calendar
          </div>
          {/* Calendar Container */}
          <div
            className="w-full h-[430px] sm:h-[450px] md:h-[440px] rounded-b-[20px] 
    bg-[#333232] p-2 sm:p-4 overflow-hidden"
          >
            <div className="w-full overflow-auto calendar-container">
              <Calendar
                key={calendarKey}
                ref={calendarRef}
                onChange={setDate}
                value={date}
                tileClassName={({ date }) => {
                  const isHighlighted =
                    highlightedDates.committeeId === selectedCommittee?.id &&
                    highlightedDates.dates.some(
                      (d) => new Date(d).toDateString() === date.toDateString()
                    );

                  return isHighlighted ? "highlighted" : null;
                }}
                tileDisabled={({ date, view }) => {
                  return (
                    view === "month" &&
                    date.getMonth() !== new Date(date).getMonth()
                  );
                }}
                className="react-calendar w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px]"
                onClickDay={handleDateClick}
                minDate={minDate}
                maxDate={maxDate}
                view="month"
                nextLabel="›"
                prevLabel="‹"
                next2Label={null}
                prev2Label={null}
              />
            </div>
          </div>
        </div>

        <p className="text-center py-5 sm:text-[15px] text-[12px] px-1">
          ©Avicenna Enterprise Solutions | All Rights Reserved
        </p>
      </div>

      {showWithdrawModal && (
        <WithdrawDates
          counts={withdrawModalProps.counts}
          dates={withdrawModalProps.dates}
          committeeId={kametiId}
          onClose={() => setShowWithdrawModal(false)}
          getPayments={[]}
          accessFrom="live"
        />
      )}
      {modalVisible && paymentDetails && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-md flex justify-center items-center text-white px-4">
        <div className="bg-[#1E1E1E] rounded-2xl shadow-xl w-full max-w-[22rem] text-center overflow-hidden">
          {/* Header */}
          <div className="bg-[#D1A30C] py-4 rounded-t-2xl">
            <h2 className="text-xl font-bold tracking-wide">Kameti Payment Details</h2>
          </div>
      
          {/* Body */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
              <span className="font-semibold text-lg">Date:</span>
              <span className="text-gray-300">{formatDate(paymentDetails.date)}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
              <span className="font-semibold text-lg">Price:</span>
              <span className="text-gray-300">{formatPrice(paymentDetails.price)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Status:</span>
              <span className="text-green-400 font-bold">Paid</span>
            </div>
          </div>
      
          {/* Footer */}
          <div className="pb-6">
            <button
              onClick={() => setModalVisible(false)}
              className="bg-[#D1A30C] hover:bg-[#b68e0c] text-white py-2 px-8 rounded-full text-lg font-medium transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      
      )}
    
    </>
  );
}
