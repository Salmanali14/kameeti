import { useEffect, useState, useRef } from "react";
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
import toogle from "../../images/toogle.png";
import toogle2 from "../../images/toogle2.png";
import Sidebar from "../../components/Sidebar/Sidebar";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FaSort } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";

import money from "../../images/Moneypay.png";
import Calendar from "react-calendar";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";
import "./Payment.css";
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
import { MdOutlineRestartAlt } from "react-icons/md";
import unpay from "../../images/paymentImage/unpay.png";
import axios from "axios";
import { FadeLoader, HashLoader } from "react-spinners";
import { Button, IconButton, MenuItem, Select } from "@mui/material";
import kametiLogo2 from "../../images/kametiLogo2.png";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoShareSocial } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
import { MdContentCopy } from "react-icons/md";
import payment from "../../images/payment2.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LuCopyCheck } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TbMenu2 } from "react-icons/tb";
import MobileSidebar from "../../components/MobileSidebar/MobileSidebar";
import toast from "react-hot-toast";


export default function Payment() {
  const [isCopied, setIsCopied] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  const [committeeData, setCommitteeData] = useState(null);
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [paymentData, setPaymentData] = useState({ date: null, price: null });
  const [confirmAction, setConfirmAction] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [kametiType, setKametiType] = useState("daily");
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const urlId = searchParams.get("id"); // Get the ID from the URL

  const [btnloader, setBTnloader] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [dailyCommittees, setDailyCommittees] = useState([]);
  const [monthlyCommittees, setMonthlyCommittees] = useState([]);
  // Function to open modal and set date
  const handleDateClick1 = (index) => {
    setEditingIndex(index);
    setSelectedDate(selectedCommittee.withdraw[index] || new Date());
    setShowModal(true);
    
  };

  // Save selected date and close modal
  const handleSave = async () => {
    if (selectedDate !== null && editingIndex !== null) {
      // Convert selectedDate to timestamp before updating array
      const updatedWithdrawDates = [...selectedCommittee.withdraw];
      updatedWithdrawDates[editingIndex] = new Date(selectedDate).getTime();

      // Update the state
      setSelectedCommittee((prev) => ({
        ...prev,
        withdraw: updatedWithdrawDates,
      }));

      // Optionally send the updated dates to API
      try {
        await axios.post(
          `${apiBaseUrl}committees/change-withdraw-date`,
          {
            id: selectedCommittee.id,
            withdrawDates: updatedWithdrawDates, // Sending timestamps
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Dates updated successfully!");
      } catch (error) {
        console.error("Error updating withdraw dates:", error);
      }
    }

    // Close the modal and reset editing index
    setShowModal(false);
    setEditingIndex(null);
  };

  // Cancel date selection and close modal
  const handleCancel = () => {
    setShowModal(false);
    setEditingIndex(null);
  };
  const [loading, setLoading] = useState(true);
  // const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [activeKameti, setActiveKameti] = useState(null);
  const [withdrawDateStatus, setWithdrawDateStatus] = useState([]);
  // console.log(filteredPayments)


  const fetchKametis = async () => {
      try {
          setLoading(true);
          const response = await axios.get(`${apiBaseUrl}payment`, {
              headers: { Authorization: `Bearer ${token}` },
          }); 
  
          let dailyData = response?.data?.data?.daily_committees || [];
          let monthlyData = response?.data?.data?.monthly_committees || [];
  
          // If urlId exists, filter data
          if (urlId) {
              dailyData = dailyData.filter(item => item.id == urlId);
              monthlyData = monthlyData.filter(item => item.id == urlId);
          }
  
          setDailyCommittees(dailyData);
          setMonthlyCommittees(monthlyData);
  
          // Ensure daily Kameti is selected by default
          if (dailyData.length > 0) {
              setCommitteeData(dailyData);
              setSelectedCommittee(dailyData[0]);
              setKametiType("daily");
              setWithdrawDateStatus(dailyData[0].withdrawDateStatus)
              fetchPayments(dailyData[0].id, "daily");
          } else if (monthlyData.length > 0) {
              setCommitteeData(monthlyData);
              setSelectedCommittee(monthlyData[0]);
              setKametiType("monthly");
              fetchPayments(monthlyData[0].id, "monthly");
              setWithdrawDateStatus(monthlyData[0].withdrawDateStatus)
          } else {
              setCommitteeData([]);
              setSelectedCommittee(null);
              setKametiType("daily"); // Default to daily even if no data
          }
  
      } catch (error) {
          console.error("Error fetching data:", error);
      } finally {
          setLoading(false);
      }
  };
  console.log(selectedCommittee)
  
  // Fetch data when the component mounts
  useEffect(() => {
    

    fetchKametis();
  }, []);
  


const handleKametiTypeChange = (selectedType) => {
  setKametiType(selectedType);
console.log(selectedType)
  // Use stored data instead of refetching API
  if (selectedType === "daily") {
    setCommitteeData(dailyCommittees);
    if (dailyCommittees.length > 0) {
      setSelectedCommittee(dailyCommittees[0]);
      fetchPayments(dailyCommittees[0].id, "daily");
    }
  } else {
    setCommitteeData(monthlyCommittees);
    if (monthlyCommittees.length > 0) {
      setSelectedCommittee(monthlyCommittees[0]);
      fetchPayments(monthlyCommittees[0].id, "monthly");
    }
  }
};



  const fetchPayments = async (kametiId, type) => {
    // console.log(kametiId,urlId)
    setBTnloader(true);
    try {
      const response = await axios.get(
        `${apiBaseUrl}paymentsByKametiId/${kametiId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (type === "daily") {
        const allPaidKametis =
          response?.data?.data?.paidKametiResponse?.flatMap(
            (item) => item.paidkametis
          ) ?? [];
        // console.log(allPaidKametis);
        // Update the filteredPayments state
        setFilteredPayments(allPaidKametis);
        setBTnloader(false);
        setShowConfirmAlert(false);
      } else {
        console.log(response?.data?.data);
        console.log(
          response?.data?.data?.paidKametiResponse[0]?.paidkametis ?? []
        );

        var paidKametiResp = response?.data?.data?.paidKametiResponse;
        paidKametiResp.length == 0
          ? setFilteredPayments([])
          : setFilteredPayments(
              response?.data?.data?.paidKametiResponse[0]?.paidkametis ?? []
            );
        setBTnloader(false);
        setShowConfirmAlert(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setBTnloader(false);
      setShowConfirmAlert(false);
    }
  };

  const handlePayCommittee = async (status) => {
    if (status === "pay" && selectedRow.date == null) {
      toast.error("Date not selected");
      return;
    }
    setBTnloader(true);
    try {
      const paymentType =
        selectedCommittee?.kametiType === "daily" ? "daily" : "monthly";

      if (
        status === "pay" &&
        paymentType === "daily" &&
        date.getDate() === 28 &&
        date.getMonth() === 1
      ) {
        for (let i = 0; i < 3; i++) {
          await callPayCommitteeAPI(status);
        }

        toast.success(
          "Payment processed successfully for the 28th of February and the next two days!"
        );
        setBTnloader(false);
      } else {
        await callPayCommitteeAPI(status);

        // Show success message based on payment status
        if (status === "pay") {
          toast.success("Payment paid successfully.");
        } else if (status === "unpay") {
          toast.success("Payment unpaid successfully.");
        }
      }

      // Close confirmation alert after processing
    } catch (error) {
      console.error("Error:", error);
      setBTnloader(false);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const callPayCommitteeAPI = async (status) => {
    const response = await axios.post(
      `${apiBaseUrl}payCommittee`,
      {
        committeeID: selectedCommittee?.id,
        status: status === "pay" ? "paid" : "Unpaid",
        price: selectedRow.amount,
        date: dateToTimestamp(selectedRow.date),
        payment_id: status === "unpay" ? selectedRow.paymentId : null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("payment called:", response.data);
    localStorage.setItem(
      "selectedComm",
      JSON.stringify(response.data?.data?.kameti)
    );
    setSelectedCommittee((prevCommittee) => ({
      ...prevCommittee,
      paidAmount:
        prevCommittee.paidAmount + (status === "pay" ? selectedRow.amount : 0),
      remainingAmount:
        prevCommittee.remainingAmount -
        (status === "pay" ? selectedRow.amount : 0),
    }));

    fetchKametis(selectedCommittee?.kametiType);
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

  const handleAlertCancel = () => {
    setShowConfirmAlert(false); // Hide the confirm alert
  };
 

  useEffect(() => {
    if (selectedCommittee) {
      const filtered = selectedCommittee?.payments?.filter((payment) => {
        // Convert ase kall properties to lowercase for case-insensitive search
        const paymentValues = Object.values(payment).map((value) =>
          value.toString().toLowerCase()
        );
        // Check if any property includes the search query
        return paymentValues.some((value) =>
          value.includes(searchQuery.toLowerCase())
        );
      });
      setFilteredPayments(filtered);
    }
  }, [searchQuery, selectedCommittee]);

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



  const handleCommitteeChange = (event) => {
    const commId = parseInt(event.target.value, 10); // Convert the value to an integer

    const selectedComm = committeeData?.find((comm) => comm?.id === commId);

    setSelectedCommittee(selectedComm);
    fetchPayments(commId, selectedComm?.kametiType);
    localStorage.setItem("selectedComm", JSON.stringify(selectedComm));

    // Update the date to the starting month of the selected committee
    if (selectedComm?.startingMonth) {
      const newStartDate = new Date(selectedComm.startingMonth);
      setDate(newStartDate); // Reset calendar to start month
    }
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
  }, [filteredPayments, selectedCommittee?.id]);

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



    // Ensure the calendar always scrolls to the current month on page load
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-indexed (January is 0)


    const scrollToCurrentMonth = () => {
      const monthElement = document.querySelector(
        `[data-year="${currentYear}"][data-month="${currentMonth}"]`
      );
      if (monthElement) {
        // Use 'auto' for smoothness during transitions
        monthElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    scrollToCurrentMonth();
  }, [selectedCommittee, highlightedDatesMap]); // Dependency adjusted

  const currentDate = new Date();
  const committeeStartDate = selectedCommittee?.startingMonth
    ? new Date(selectedCommittee.startingMonth)
    : null;

  // If kametiType is "daily", force start date to the 1st of the starting month
  if (selectedCommittee?.kametiType === "daily" && committeeStartDate) {
    committeeStartDate.setDate(1); // Set to 1st of the month
  }
  const committeeEndDate = selectedCommittee?.endingMonth
    ? new Date(selectedCommittee.endingMonth)
    : null;
  
  // If current date is greater than end date, update end date to current date
  const adjustedEndDate =
    committeeEndDate && currentDate > committeeEndDate ? currentDate : committeeEndDate;
  // Ensure minDate allows backward navigation
  const adjustedMinDate = committeeStartDate
    ? new Date(committeeStartDate.setMonth(committeeStartDate.getMonth()))
    : null;

  const handleDateClick = (value) => {
    const clickedDate = value.toDateString();
    const clickedMonth = value.getMonth(); // 0-based index (January is 0, February is 1)
    const clickedYear = value.getFullYear();
    const date = new Date(value); // Parse the clicked date

    const payment = filteredPayments.find((p) => {
      const paymentDate = new Date(p.date);
      return paymentDate.toDateString() === clickedDate;
    });

    if (payment) {
      // Show payment details
      const price =
        selectedCommittee?.kametiType === "daily"
          ? selectedCommittee?.pricePerDayKameti *
            selectedCommittee?.myTotalKametis
          : selectedCommittee?.pricePerMonthKameti *
            selectedCommittee?.myTotalKametis;

      setPaymentDetails({
        date: payment.date,
        price: price,
      });
      setSelectedRow({
        date: payment.date,
        amount: price,
      });
      setModalVisible(true);
      setConfirmMessage("Do you want to unpay kameti?");
      setConfirmAction("unpayCommitee");
      setShowConfirmAlert(true);
    } else {
      let alreadyPaid = false;

      if (selectedCommittee?.kametiType === "monthly") {
        alreadyPaid = filteredPayments.some((p) => {
          const paymentDate = new Date(p.date);
          return (
            paymentDate.getMonth() === clickedMonth &&
            paymentDate.getFullYear() === clickedYear
          );
        });
      }

      if (!alreadyPaid) {
        const price =
          selectedCommittee?.kametiType === "monthly"
            ? selectedCommittee?.pricePerMonthKameti *
              selectedCommittee?.myTotalKametis
            : selectedCommittee?.pricePerDayKameti *
              selectedCommittee?.myTotalKametis;

        setSelectedRow({
          date: clickedDate,
          amount: price,
        });

        // Check for February 28th condition
        if (
          selectedCommittee?.kametiType === "daily" &&
          date.getDate() === 28 &&
          date.getMonth() === 1
        ) {
          setConfirmMessage(
            "By paying the kameti for this date, the remaining two days' payments will also be covered."
          );
        } else {
          setConfirmMessage("Do you want to pay kameti?");
        }

        setConfirmAction("payCommitee");
        setShowConfirmAlert(true);
      } else {
        toast.error("This month kameti has already been paid.");
      }
    }
  };

  const [rows, setRows] = useState([]);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);

    // Filter payments for the selected month from selectedCommittee object
    const selectedPayments = filteredPayments.filter((payment) => {
      const paymentDate = new Date(payment.date);
  
      const selectedMonthDate = new Date(Number(month));
      return (
        paymentDate.getMonth() + 1 === selectedMonthDate.getMonth() + 1 &&
        paymentDate.getFullYear() === selectedMonthDate.getFullYear()
      );
    });

    // Map payments to rows format and setRows
    const formattedRows = selectedPayments.map((payment, index) => ({
      id: index + 1,
      status: payment.status,
      amount: payment.price,
      paymentId: payment.id,
      date: new Date(payment.date).toISOString().split("T")[0], // Format date as YYYY-MM-DD
      photoStatus: payment.photoStatus || "No Photo",
    }));

    setRows(formattedRows);
  };
  let screenwidth = window.innerWidth;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selectedCommittee?.id || ""
  );

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleSelectOption = (id) => {
    setSelectedOption(id);
    handleCommitteeChange({ target: { value: id } }); // Simulate onChange event
    setModalOpen(false); // Close the modal after selection
  };

  const baseUrl = window.location.origin;

const link = `${baseUrl}/Detail/${selectedCommittee?.id}`;


      const handleCopyLink = () => {
        const baseUrl = window.location.origin;
        const fullUrl = `${baseUrl}/detail/${selectedCommittee?.id}`;
      
        console.log("Copying URL:", fullUrl);
      
        navigator.clipboard.writeText(fullUrl)
          .then(() => {
            console.log("Copied successfully!");
            setIsCopied(true);
      
            setTimeout(() => {
              setIsCopied(false);
            }, 3000);
          })
          .catch((err) => {
            console.error("Failed to copy:", err);
          });
      };
      

  // Share link (using Web Share API)
  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share Kameti Link",
          text: "Check out this Kameti link:",
          url: link,
        });
      } catch (error) {
        console.error("Error sharing link:", error);
      }
    } else {
      alert("Sharing is not supported on this device.");
    }
  };
  const handleOpenWeb = () => {
    const baseUrl = window.location.origin;
        const url = `${baseUrl}/detail/${selectedCommittee?.id}`;
    if (url) {
      window.open(url, "_blank"); // Open the URL in a new tab
    } else {
      console.error("URL is undefined.");
    }
  };
  const handleBack = () => {
    navigate(-1);
  };
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
 
  const dropdownRef = useRef(null);
  

  const toggleDropdown = () => {
    setIsToggled((prev) => !prev); // Toggle the button state
  };


  // Effect to handle dropdown visibility based on isToggled
  useEffect(() => {
    setShowDropdown(isToggled); // Show dropdown if isToggled is true, else hide it
  }, [isToggled]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(!isToggled){
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowDropdown(false); // Close dropdown if clicked outside
          setIsToggled(false); // Ensure the toggle button reflects the dropdown state
        }
      }
    
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside); // Listen for outside clicks
    } else {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener when dropdown is closed
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener on unmount
    };
  }, [showDropdown]);

  const formatPrice = (value) => {
    // Ensure value is a string before calling replace
    let formattedValue = String(value).replace(/[^0-9]/g, ""); // Remove non-numeric characters
    return new Intl.NumberFormat().format(formattedValue); // Format with commas
  };

  const withdrawStatus = (index, value) => {
    let counts = 2;
    console.log("Withdraw Index:", index);
    console.log("Withdraw Value:", value);
    
    selectedCommittee.withdrawDateStatus?.[index]
  };
  
  return (
    <>
      <div className="w-[100%] h-[100vh] flex justify-center items-center  bg-black">
        <div className="w-[100%] h-[100vh] flex  ">
          {screenwidth > 430 && <Sidebar />}
          {loading ? (
            <div className="loading-screen flex justify-center items-center sm:w-[75%] w-[100%] h-[100vh] bg-[black]">
              <FadeLoader color="#A87F0B" />
            </div>
          ) : (
            <div className="sm:w-[80%] w-[100%] h-[100%] sm:overflow-scroll  pb-3  sm:rounded-l-[0px] rounded-l-[20px] rounded-r-[20px]">
            <div className="w-[100%] h-[90px]  flex justify-between items-center pt-7  border-b-[1px] border-[#535353]">
              <span className="flex justify-center items-center w-full sm:w-auto sm:flex-row">
                            {screenwidth < 430 && (
                              <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer(true)}
                                edge="start"
                                  
                              >
                                <TbMenu2 className="text-white text-[35px] bg-[#A87F0B] rounded-lg p-[2px] ml-2" />
                              </IconButton>
                            )}
                            <MobileSidebar
                              drawerOpen={drawerOpen}
                              toggleDrawer={toggleDrawer}
                            />
               
                    <div className="flex justify-center items-center w-full sm:w-auto">
                      <h1 className="text-[white] sm:text-[25px] text-[20px] font-bold  sm:mb-6 flex items-center sm:ml-5 sm:mr-0 mr-6  justify-center sm:justify-start w-full">
                        {/* Image visible only on larger screens */}
                        <img
                          className="hidden sm:block w-[40px] mr-3"
                          src={payment}
                          alt="payment"
                        />
                        {urlId ? (
                               <div
                               className="flex items-center space-x-1"
                               onClick={handleBack}
                             >
                               <IoIosArrowBack className="text-white text-xl" />
                               <Button style={{ color: "white", fontSize: "16px" }}>
                                 Back
                               </Button>
                             </div>
                        ):('Payments')}
                        
                      </h1>
                    </div>
                          </span>
              </div>

              {committeeData?.length > 0 ? (
                <div className="w-[100%] mt-2 bg-[#282828] shadow-[inset_16px_6px_24px_0px_#FFFFFF40] flex justify-between items-center h-[100px]">
                  {/* Left Section */}
                  <div className="w-[50%] ml-5 flex flex-col justify-center">
                  <p className="text-gray-300 font-semibold text-[13px] block sm:hidden">
  {truncateText(selectedCommittee?.kametiName, 19) || "No Kameti"}
</p>
<p className="text-gray-300 font-semibold text-[14px] hidden sm:block">
  {selectedCommittee?.kametiName || "No Kameti"}
</p>

<div className="flex items-center cursor-pointer">
      <h1 className="text-yellow-500 font-bold text-[17px] sm:text-[28px]">
        Rs.{" "}
        {(
          selectedCommittee?.totalPrice && selectedCommittee?.myTotalKametis
            ? parseInt(selectedCommittee?.totalPrice) / parseInt(selectedCommittee?.myTotalKametis)
            : 0
        ).toLocaleString()}
      </h1>
      {/* Clicking Arrow Toggles the Icon */}
      {!urlId && (
        <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {isDropdownOpen ? (
            <BiSolidUpArrow className="ml-3 text-white" size={18} />
          ) : (
            <BiSolidDownArrow className="ml-3 text-white" size={18} />
          )}
        </div>
      )}
    </div>

      {/* Dropdown Select (Directly Opens When Clicking Arrow) */}
      <Select
        value={selectedCommittee?.id || ""}
        onChange={handleCommitteeChange}
        displayEmpty
        open={isDropdownOpen} // Controlled open state
        onClose={() => setIsDropdownOpen(false)} // Close when clicking outside
        sx={{
          width: { xs: "150px", sm: "250px" },
          fontSize: { xs: "12px", sm: "14px" },
         visibility:"hidden",
         height:"0px",
          backgroundColor: "#585858",
          color: "white",
          borderRadius: "5px",
          marginTop: "5px",
          "& .MuiSvgIcon-root": { color: "#999" },
          "&:hover": { borderColor: "#ccc" },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "#282828", // 🔴 Red background for the dropdown menu
            },
          },
        }}
      >
        
        {committeeData?.length === 0 ? (
          <MenuItem value="" disabled>No kameti</MenuItem>
        ) : (
          committeeData.map((comm, index) => {
            const calculatedValue =
              comm.totalPrice && comm.myTotalKametis
                ? "Rs. " + (parseInt(comm.totalPrice) / parseInt(comm.myTotalKametis)).toLocaleString()
                : "Rs. 0";

            return (
              <MenuItem
                key={index}
                value={comm.id}
                sx={{
                  fontSize: { xs: "12px", sm: "14px" },
                  backgroundColor: selectedCommittee?.id === comm.id ? "#A87F0B !important" : "transparent",
                  color: selectedCommittee?.id === comm.id ? "white" : "white",
                  "&:hover": { backgroundColor: "#A87F0B", color: "white" },
                }}
              >
                {comm.kametiName} ({calculatedValue})
              </MenuItem>
            );
          })
        )}
      </Select>

                    {/* <p className="text-gray-400 text-[12px] mt-1">
                    Select Kameti
                  </p> */}
                  </div>
             
                </div>
              ) : (
                ""
              )}
              {urlId ? (
                ""
              ) : (
                <div className="w-[100%] flex items-center justify-center">
                  <div className="flex w-[45%] sm:w-[23%] mt-9 mb-2 items-center relative">
                    <div className="bg-[#181818] border text-white outline-none border-[#e2e2e269] rounded-[30px] h-[39px] sm:h-[45px] w-[100%] relative">
                      <button
                        className={`text-white absolute left-0 rounded-[30px] h-[38px] sm:h-[44px] sm:text-[16px] w-[53%] ${
                          kametiType === "daily" ? "bg-[#A87F0B]" : ""
                        }`}
                        style={
                          kametiType === "daily"
                            ? {
                                boxShadow:
                                  "-4.2px 5.88px 7.22px 0px rgba(255, 255, 255, 0.34) inset",
                              }
                            : {}
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleKametiTypeChange("daily");
                        }}
                      >
                        Daily
                      </button>

                      <button
                        className={`absolute right-0 rounded-[30px] h-[38px] sm:h-[44px] sm:text-[16px] w-[53%] ${
                          kametiType === "monthly" ? "bg-[#A87F0B]" : ""
                        }`}
                        style={
                          kametiType === "monthly"
                            ? {
                                boxShadow:
                                  "-4.2px 5.88px 7.22px 0px rgba(255, 255, 255, 0.34) inset",
                              }
                            : {}
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleKametiTypeChange("monthly");
                        }}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {committeeData?.length > 0 ? (
                <div className="text-white min-h-screen mx-[1px] sm:mx-[50px]">
                  {/* Monthly Details */}
                  <div className="mt-6">
                    <div
                      className="grid grid-cols-1 rounded-b-[20px] mb-12 
"
                    >
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
                              (selectedCommittee?.totalPrice).toLocaleString(),
                          },
                          {
                            image: k4,
                            title: "Total Months",
                            value:
                              (selectedCommittee?.totalMonths).toLocaleString(),
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
                              (selectedCommittee?.myTotalKametis).toLocaleString(),
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
                        // {selectedCommittee : ()}
                        <div
                          key={sectionIndex}
                          className="mt-6 mb-1 bg-[#2B2B2B] rounded-[8px] py-[25px]" // Add bottom margin here
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
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 p-2 font-medium text-lg ">
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
                                      className="relative bg-[#A87F0B] w-[270px] md:w-[100%] lg:w-[240px] xl:w-[250px] sm:rounded-[20px] rounded-[10px] sm:px-[25px] px-[20px]  sm:py-[10px] py-[6px]  shadow-[inset_0px_-7px_4px_0px_#00000040] "
                                      onClick={toggleDropdown}
                                    >
                                      <h4 className="text-[13px] sm:text-[18px] text-[#FFFFFF] ">
                                        {item.title}
                                      </h4>
                                      <div className="flex items-center justify-between w-full text-sm sm:text-[17px]">
                                        <button className="font-['Poppins'] font-normal text-[17px]  tracking-[0%]">
                                          {item.value}
                                        </button>

                                        {isToggled ? (
                                      
                                          <BiSolidUpArrow/>

                                        ) : (
                                          <BiSolidDownArrow/>
                                     

                                        )}
                                      </div>
                                      {!showModal && showDropdown && (
                                        <div
                                          ref={dropdownRef}
                                          className="absolute top-full left-0 z-10 w-[270px] md:w-[100%] lg:w-[240px] xl:w-[250px] max-h-[155px] overflow-y-auto dropdown-scrollbar bg-[#333] text-white rounded-md mt-2 p-2 shadow-[inset_0px_-7px_4px_0px_#00000040]"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                     {selectedCommittee?.withdraw.map((date, index) => (
  <div
    key={index}
    className="dropdown-item flex items-center mb-5 justify-between"
  >
    <div className="flex items-center w-[70%]">
    {/* {withdrawDateStatus?.[index] && withdrawDateStatus?.[index] == 1 ? 
      <IoIosCheckmarkCircle onClick={() => withdrawStatus(index, 1)} />
      : <IoIosCheckmarkCircleOutline onClick={() => withdrawStatus(index, 0)} />
    } */}

      <span className="rounded-[100px] bg-[#A87F0B] text-center w-[30px] text-[15px]">
        {index + 1}
      </span>
      <strong className="ml-3 text-[16px] text-right font-sans">
        Rs.{formatPrice(
          parseInt(selectedCommittee?.totalPrice) /
          parseInt(selectedCommittee?.myTotalKametis)
        )}
      </strong>
    </div>
    <span
      className="text-right text-[13px] text-center w-[40%] cursor-pointer flex items-center justify-between"
      onClick={() => handleDateClick1(index)}
    >
      {date == null ? "Select Date" : formatDate(date)}
      <FaCalendarAlt className="text-yellow-500 text-[16px] w-[16px] h-[16px]" />
    </span>
  </div>
))}

                                        </div>
                                      )}

                                      {/* Modal for Calendar */}
                                      {showModal && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                          <div className="bg-[#373737] p-5 rounded-lg shadow-lg w-[300px]">
                                            <h2 className="text-lg font-bold mb-3">
                                              Select a Date
                                            </h2>

                                            {/* DatePicker */}
                                            <div className="flex justify-center items-center text-white w-full bg-[#373737] p-4 rounded-lg">
                                              <DatePicker
                                                selected={selectedDate}
                                                onChange={(date) =>
                                                  setSelectedDate(date)
                                                }
                                                className="text-center text-white"
                                                calendarClassName="bg-[#373737] text-white" // Apply styles to the calendar
                                                inline
                                                filterDate={(date) => {
                                                  // Disable the 31st for "daily" kametiType
                                                  if (
                                                    selectedCommittee?.kametiType ===
                                                    "daily"
                                                  ) {
                                                    return (
                                                      date.getDate() !== 31
                                                    ); // Disable 31st
                                                  }
                                                  return true; // Enable all other dates
                                                }}
                                                dayClassName={(date) => {
                                                  if (
                                                    selectedCommittee?.kametiType ===
                                                      "daily" &&
                                                    date.getDate() === 31
                                                  ) {
                                                    return "hidden-date"; // Add class to hide 31st date
                                                  }
                                                  return null;
                                                }}
                                              />
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex justify-center mt-3">
                                              <button
                                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                                onClick={handleCancel}
                                              >
                                                Cancel
                                              </button>
                                              <button
                                                className="bg-[#a87f0b] text-white px-4 ml-2 py-2 rounded-md"
                                                onClick={handleSave}
                                              >
                                                Save
                                              </button>
                                            </div>
                                          </div>
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

                  <div className="w-full flex flex-col items-center ">
                  <div className="text-white p-4 sm:p-6 text-center space-y-4 rounded-lg w-full max-w-[100%] sm:max-w-[900px] mx-auto">
  <p className="text-sm sm:text-lg">
    Want to share history with others? Tap Below
  </p>
  <div className="flex flex-wrap justify-center items-center space-x-2 text-[#CACACA]">
    <a
      href={`https://app.Kameti.pk/detail/${selectedCommittee?.id}`}
      className="underline text-[14px] sm:text-[15px] break-all"
    >
      {`https://app.kameti.pk/detail/${selectedCommittee?.id}`}
    </a>
    <div className="flex space-x-2">
      <span
        className="cursor-pointer"
        onClick={handleShareLink}
        title="Share Link"
      >
        <IoShareSocial size={20} className="sm:size-[23px]" />
      </span>
      <span className="cursor-pointer" title="Translate">
        <GrLanguage size={20} className="sm:size-[23px]" onClick={handleOpenWeb} />
      </span>
      <div className="relative inline-block">
        <span
          className="cursor-pointer"
          onClick={handleCopyLink}
          title="Copy Link"
        >
          {isCopied ? (
            <LuCopyCheck size={20} className="sm:size-[23px]" />
          ) : (
            <MdContentCopy size={20} className="sm:size-[23px]" />
          )}
        </span>

        {isCopied && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-600 text-white px-2 py-1 rounded-md mt-1 text-xs">
            Copied!
          </div>
        )}
      </div>
    </div>
  </div>

  <p className="text-sm sm:text-lg">
    Want to pay Kameti? Tap Below
  </p>
</div>


                    {/* Calendar Header */}
                    <div
                      className="w-full bg-[#A87F0B] text-center py-3 font-bold rounded-t-[20px] 
    text-sm sm:text-lg md:text-xl lg:text-2xl mt-5"
                    >
                      Calendar
                    </div>
                    {/* Calendar Container */}
                    <div
                      className="w-full h-[430px] sm:h-[450px] md:h-[440px]
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
                          if (selectedCommittee?.kametiType == "daily" && date.getDate() === 31) {
                            return true;
                          }

                          if (selectedCommittee?.endingMonth) {
                            const committeeEndDate = new Date(selectedCommittee.endingMonth);
                            if (date > committeeEndDate) {
                              return true;
                            }
                          }

                          return view === "month" && date.getMonth() !== new Date(date).getMonth();

                          
                        }}
                        className="react-calendar w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px]"
                        onClickDay={handleDateClick}
                        minDate={adjustedMinDate} // Allows navigation but prevents selection before start date
                        maxDate={adjustedEndDate}
                        view="month"
                        nextLabel="›"
                        prevLabel="‹"
                        next2Label={null}
                        prev2Label={null}
                        defaultActiveStartDate={currentDate}  // Ensures the calendar opens on the current month
                      />
                      </div>
                    </div>
                  </div>

                  {/* <p className="text-center py-5 text-sm sm:text-lg md:text-md ">
                  ©avicennaenterprisesolutions | All Rights Reserved
                </p> */}
                </div>
              ) : (
                <div className="flex justify-center items-center w-[100%] h-[70%] text-white">
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
              
              )}
            </div>
          )}
        </div>
      </div>
      {showConfirmAlert && (
        <Alert
          btnloader={btnloader}
          message={confirmMessage}
          onConfirm={() => {
            if (confirmAction === "payCommitee") {
              handlePayCommittee("pay");
            } else if (confirmAction === "unpayCommitee") {
              handlePayCommittee("unpay");
            }
          }}
          onCancel={handleAlertCancel}
        />
      )}

   
    </>
  );
}
