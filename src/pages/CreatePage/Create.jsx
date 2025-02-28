import React, { useEffect, useState } from "react";
import profile from "../../images/profile 1.png";
import money from "../../images/money (1) 1.png";
import total from "../../images/money 1.png";
import calender from "../../images/appointment 1.png";
import custumer from "../../images/customer 1.png";
import date from "../../images/start-date 1.png";
import axios from "axios";
import toast from "react-hot-toast";

import "react-toastify/dist/ReactToastify.css";
import { MdOutlineRestartAlt } from "react-icons/md";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import WithdrawDates from "../../components/WithdrawDates/WithdrawDates";
import { TbMenu2 } from "react-icons/tb";
import MobileSidebar from "../../components/MobileSidebar/MobileSidebar";
import { IconButton } from "@mui/material";
import create from "../../images/create.png";
import { IoIosInformationCircleOutline } from "react-icons/io";
import InfoModal from "../../components/InfoModal/InfoModal";
import Alert from "../../components/Alert/Alert";
import Swal from "sweetalert2";

export default function Create() {
  const [btnloader, setBTnloader] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const [kametiHolderName, setKametiHolderName] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [pricePerKameti, setPricePerKameti] = useState("");
  const [pricePerDayKameti, setPricePerDayKameti] = useState("");
  const [totalMonths, setTotalMonths] = useState("");
  const [myTotalKameties, setMyTotalKameties] = useState("");
  const [payablePerMonth, setPayablePerMonth] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [kametiType, setKametiType] = useState("monthly");
  const [withdrawDates, setWithdrawDates] = useState([]);
  const [showWithdrawDates, setShowWithdrawDates] = useState(false);

  let navigate = useNavigate();
console.log("startingDate",)
const handleReset = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "This will reset all form fields!",
    icon: "warning",
    confirmButtonText: "OK",
    confirmButtonColor: "#a87f0b", // Change confirm button color
    cancelButtonText: "Cancel",
    cancelButtonColor: "#85837d", // Change cancel button color
    background: "#373737",
    color: "#fff",
    showCancelButton: true,
    customClass: {
      confirmButton: 'confirm-btn',  // Custom class for confirm button
      cancelButton: 'cancel-btn',    // Custom class for cancel button
    },
    didOpen: () => {
      // Apply inline styles to the confirm button
      const confirmButton = document.querySelector('.swal2-confirm');
      const cancelButton = document.querySelector('.swal2-cancel');
      
      if (confirmButton) {
        confirmButton.style.backgroundColor = "#a87f0b"; // OK button color
        confirmButton.style.color = "white";
        confirmButton.style.borderRadius = "10px"; // Rounded corners for the confirm button
        confirmButton.style.width = "100px";
      }
      
      if (cancelButton) {
        cancelButton.style.backgroundColor = "#85837d"; // Cancel button color
        cancelButton.style.color = "white";
        cancelButton.style.borderRadius = "10px"; // Rounded corners for the cancel button
        cancelButton.style.width = "100px";
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Reset form fields
      setKametiHolderName("");
      setTotalPrice("");
      setPricePerKameti("");
      setPricePerDayKameti("");
      setTotalMonths("");
      setMyTotalKameties("");
      setPayablePerMonth("");
      setStartingDate("");
      setEndingDate("");
    }
  });
};
  const handleAlertConfirm = () => {
    // Close the confirmation alert after user confirms
    setShowConfirmAlert(false);
  };
  const handleAlertCancel = () => {
    setShowConfirmAlert(false); // Hide the confirm alert
  };

  const fillValues = (data) => {
    console.log(data);
    setKametiHolderName(data.kametiName);
    setTotalPrice(data.totalPrice / data.myTotalKametis);
    setPricePerKameti(data.pricePerMonthKameti);
    setPricePerDayKameti(data.pricePerDayKameti);
    setTotalMonths(data.totalMonths);
    setMyTotalKameties(data.myTotalKametis);
    setStartingDate(formatDate(data.startingMonth));
    setEndingDate(formatDate(data.endingMonth));
    setKametiType(data.kametiType);
    setWithdrawDates(data.withdraw);
  };

  // const formatDate = (timestamp) => {
  //   const date = new Date(timestamp);
  //   const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
  //   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${day}/${month}/${year}`; // Format as DD/MM/YY
  // };

  const formatDate = (timestamp, type) => {
    if (!timestamp) return ""; // Return an empty string if no date is provided

    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return ""; // Handle invalid date values

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return type == "endDate"
      ? `${month}/${day}/${year}`
      : `${month}/${day}/${year}`;
      
  };

  const dateToTimestamp = (date) => {
    const timestamp = new Date(date).getTime();
    return timestamp;
  };

  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  const { id } = useParams();

  useEffect(() => {
    if (startingDate && totalMonths) {
      const startDate = new Date(startingDate);
      const endDate = new Date(startDate);

      // Move to the target month
      endDate.setMonth(endDate.getMonth() + parseInt(totalMonths));

      // Set the date to the last day of the new month
      endDate.setDate(0); // This makes it the last day of the updated month

      setEndingDate(endDate.toISOString().split("T")[0]);
    }
  }, [startingDate, totalMonths]);

  const formatPrice = (value) => {
    // Ensure value is a string before calling replace
    let formattedValue = String(value).replace(/[^0-9]/g, ""); // Remove non-numeric characters
    return new Intl.NumberFormat().format(formattedValue); // Format with commas
  };
  

  const handleTotalPriceChange = (e) => {
    let rawValue = e.target.value.replace(/[^0-9]/g, ""); // Keep only numbers
    setTotalPrice(rawValue ? parseInt(rawValue, 10) : ""); // Store as a number
  };

  useEffect(() => {
    if (totalPrice && totalMonths) {
      setPricePerKameti(totalPrice / totalMonths);
      setPricePerDayKameti(totalPrice / totalMonths / 30);
    } else {
      setPricePerKameti("");
      setPricePerDayKameti("");
    }
  }, [totalPrice, totalMonths]);

  const handleCreateCommittee = async () => {
    const toastId = "createCommitteeToast"; // Unique ID for this toast
    setBTnloader(true);

    // Validation for required fields
    if (!kametiHolderName) {
      if (!toast.isActive(toastId)) {
        toast.error("Kameti holder name is required.", { toastId });
      }
      setBTnloader(false);
      return;
    }
    if (!totalPrice || isNaN(totalPrice)) {
      if (!toast.isActive(toastId)) {
        toast.error("Total Amount is required and must be valid.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    if (!pricePerKameti || isNaN(pricePerKameti)) {
      if (!toast.isActive(toastId)) {
        toast.error("Total Month kameti is required.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    if (!totalMonths || isNaN(totalMonths)) {
      if (!toast.isActive(toastId)) {
        toast.error("Total months is required and must be valid.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    if (!totalPrice || isNaN(totalPrice)) {
      if (!toast.isActive(toastId)) {
        toast.error("Total price is required and must be valid.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    if (!myTotalKameties || isNaN(myTotalKameties)) {
      if (!toast.isActive(toastId)) {
        toast.error("Total kameties is required and must be valid.", {
          toastId,
        });
      }
      setBTnloader(false);
      return;
    }

    if (!startingDate) {
      if (!toast.isActive(toastId)) {
        toast.error("Starting date is required.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    if (!endingDate) {
      if (!toast.isActive(toastId)) {
        toast.error("Ending month is required.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    // Additional validation
    if (parseInt(myTotalKameties) > parseInt(totalMonths)) {
      if (!toast.isActive(toastId)) {
        toast.error("Total kameties cannot exceed total months.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiBaseUrl}committee`,
        {
          kametiName: kametiHolderName,
          pricePerMonthKameti: pricePerKameti,
          pricePerDayKameti: pricePerDayKameti,
          totalPrice: totalPrice,
          myTotalKametis: myTotalKameties,
          totalMonths: totalMonths,
          startingMonth: dateToTimestamp(startingDate),
          endingMonth: dateToTimestamp(endingDate),
          kametiType: kametiType,
          myKametiWithdrawDate: withdrawDates,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!toast.isActive(toastId)) {
        toast.success(response?.data?.message, { toastId });
      }

      setKametiHolderName("");
      setTotalPrice("");
      setPricePerKameti("");
      setPricePerDayKameti("");
      setTotalMonths("");
      setMyTotalKameties("");
      setPayablePerMonth("");
      setStartingDate("");
      setEndingDate("");

      // Set the confirmation message
      setConfirmMessage("Form reset successfully!");
    } catch (error) {
      if (!toast.isActive(toastId)) {
        toast.error(error?.response?.data?.message, { toastId });
      }
    } finally {
      setBTnloader(false);
    }
  };

  const handleUpdateCommittee = async () => {
    const toastId = "updateCommitteeToast"; // Unique ID for this toast

    try {
      const response = await axios.post(
        `${apiBaseUrl}committee/update`,
        {
          id: id,
          kametiName: kametiHolderName,
          pricePerMonthKameti: pricePerKameti,
          pricePerDayKameti: pricePerDayKameti,
          totalPrice: totalPrice,
          myTotalKametis: myTotalKameties,
          totalMonths: totalMonths,
          startingMonth: dateToTimestamp(startingDate),
          endingMonth: dateToTimestamp(endingDate),
          kametiType: kametiType,
          myKametiWithdrawDate: withdrawDates,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!toast.isActive(toastId)) {
        toast.success(response?.data?.message, { toastId });
      }

      setTimeout(() => {
        navigate("/history");
      }, 2000);
    } catch (error) {
      if (!toast.isActive(toastId)) {
        toast.error(error?.response?.data?.message, { toastId });
      }
    }
  };

  const handleSaveWithdrawDates = (dates) => {
    console.log(dates);
    setWithdrawDates(dates);
    setShowWithdrawDates(false);
  };
  const getSingleCommittee = async () => {
    try {
      if (id) {
        const response = await axios.get(
          `${apiBaseUrl}singleComm/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fillValues(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching committee:", error);
    }
  };

  const openWithdrawDatesModal = () => {
    const toastId = "withdrawDatesToast"; // Unique ID for this toast

    if (myTotalKameties) {
      setShowWithdrawDates(true);
    } else {
      if (!toast.isActive(toastId)) {
        toast.error("Select total kameties first.", { toastId });
      }
    }
  };
  useEffect(() => {
    getSingleCommittee();
  }, [id]);
  const handleKametiTypeChange = (event) => {
    setKametiType(event.target.value);
  };
  const handlePricePerMonth = (event) => {
    var perMonthPrice = event.target.value;
    var totalMonthEntered = totalMonths != "" ? totalMonths : 0;
    setPricePerKameti(perMonthPrice / totalMonthEntered);
  };

  let screenwidth = window.innerWidth;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  let [shareTotalAmount, setTotalAmountShare] = useState(false);
  let [shareMyKameti, setKametiShare] = useState(false);
  let [shareTotalMonth, setTotalMonthShare] = useState(false);
  let [shareMonthlyAmmount, setMonthlyAmmountShare] = useState(false);
  let [info, setInfo] = useState(false);
  let [shareinfo, setShare] = useState(false);

  let handleinfoTotalAmmount = () => {
    setTotalAmountShare(true);
  };
  let handleinfoMyKametie = () => {
    setKametiShare(true);
  };
  let handleinfoTotalMonth = () => {
    setTotalMonthShare(true);
  };
  let handleinfoMonthlyAmmount = () => {
    setMonthlyAmmountShare(true);
  };

  let handleCloseshare = () => {
    setInfo(false);
    setShare(false);
    setTotalAmountShare(false);
    setKametiShare(false);
    setTotalMonthShare(false);
    setMonthlyAmmountShare(false);
  };
  let windowWidth = window.innerWidth;

  return (
    <>
      <div className="w-[100%] h-[100vh] flex justify-center items-center bg-black">
        <div className="w-[100%] h-[100vh] flex">
          {screenwidth > 430 && <Sidebar />}
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

                <h1 className="text-[white] sm:text-[25px] text-[20px] font-bold  sm:mb-6 flex items-center sm:ml-5 sm:mr-0 mr-6  justify-center sm:justify-start w-full">
                  {/* Image visible only on larger screens */}
                  <img
                    className="hidden sm:block w-[40px] mr-3"
                    src={create}
                    alt="Icon"
                  />
                  {id ? "Update Kameti" : "Create Kameti"}
                </h1>
              </span>
            </div>

            {responseMessage && (
              <p className="text-white mt-3 w-[90%] ml-10">{responseMessage}</p>
            )}
            <div className="w-[100%] flex items-center justify-center flex-col">
              {windowWidth > 500 && (
                <div className="w-[88%] flex justify-end">
                  <p
                    onClick={handleReset}
                    className="text-white sm:mt-3  text-md cursor-pointer hover:text-gray-300"
                  >
                    Reset
                  </p>
                </div>
              )}
              <div className="w-[100%] sm:w-[90%] bg-[#64646469] flex items-center justify-center flex-col p-[25px] sm:p-[25px] mt-[10px] rounded-[15px]">
                {windowWidth < 500 && (
                  <div className="w-[100%] flex justify-end">
                    <p
                      onClick={handleReset}
                      className="text-white   text-md cursor-pointer hover:text-gray-300"
                    >
                      Reset
                    </p>
                  </div>
                )}
                <div className="flex w-[100%] justify-center sm:flex-row flex-col items-center">
                  <div className="sm:w-[90%] w-[100%] flex items-center flex-col">
                    <div className="w-[100%] sm:mt-2 mt-2 mb-2">
                      <label className="text-[white]">Kameti Holder Name</label>
                    </div>
                    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] sm:mb-5 flex items-center">
                      <div className="w-[90%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
                        {/* <img className="h-[25px]" src={profile} /> */}
                        <input
                          type="text"
                          placeholder="Abdullah"
                          value={kametiHolderName}
                          onChange={(e) => setKametiHolderName(e.target.value)}
                          className="outline-none border-none text-[white] bg-colorinput w-full h-[40px] placeholder-[#CACACA] pr-10 "

                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:w-[90%]  w-[100%] sm:ml-10 flex items-center flex-col">
                    <div className="w-[100%] sm:mt-2 mt-5 mb-2">
                      <label className="text-[white]"> Total Amount </label>
                    </div>
                    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] mb-5 flex items-center px-4 relative">
                      <div className="w-[80%] flex items-center">
                        <input
                          type="text"
                          placeholder="e.g 24,000"
                          value={
                            totalPrice ? formatPrice(totalPrice.toString()) : ""
                          } // Format for UI
                          onChange={handleTotalPriceChange} // Use function to update state
                          required
                          className="outline-none border-none text-[white] bg-colorinput w-full h-[40px] placeholder-[#CACACA] pr-10 pl-1"
                        />
                      </div>
                      <IoIosInformationCircleOutline
                        className="text-[#FFFFFF4D] text-[25px] absolute right-4 cursor-pointer"
                        onClick={handleinfoTotalAmmount}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex w-[100%] justify-center sm:flex-row flex-col items-center">
                  <div className="sm:w-[90%] w-[100%] flex items-center flex-col">
                    <div className="w-[100%] mt-2 mb-2">
                      <label className="text-[white]">Select</label>
                    </div>
                    <div className="flex items-center justify-between sm:w-[90%] w-[100%] space-x-5">
                      {/* Daily Option */}
                      <div
                        className={`flex items-center  w-[50%] h-[50px] rounded-[10px] cursor-pointer mb-5 pl-5 ${
                          kametiType === "daily"
                            ? "bg-[#A87F0B6E] "
                            : "bg-[#FFFFFF0D] "
                        } ${id ? "opacity-50 cursor-not-allowed" : ""}`} // Add visual feedback for disabled state
                        onClick={() =>
                          !id &&
                          setKametiType((prevType) =>
                            prevType === "daily" ? "" : "daily"
                          )
                        } // Prevent click when ID is available
                      >
                        <input
                          type="checkbox"
                          value="daily"
                          checked={kametiType === "daily"}
                          disabled={!!id} // Disable input if ID is available
                          onChange={(e) =>
                            setKametiType(e.target.checked ? "daily" : "")
                          }
                          className="hidden"
                        />
                        <label
                          className={`flex items-center text-white ${
                            kametiType === "daily"
                              ? "font-normal"
                              : "font-normal"
                          }`}
                        >
                          <span
                            className={`w-[16px] h-[16px] rounded border-[2px] mr-2 relative ${
                              kametiType === "daily"
                                ? "bg-[#A87F0B] border-[#A87F0B]"
                                : "border-[#6A6A6A]"
                            }`}
                          >
                            {/* Custom checkmark */}
                            {kametiType === "daily" && (
                              <span className="absolute inset-0 flex justify-center items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10"
                                  height="10"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                >
                                  <path
                                    d="M1 5L4 8L9 2"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            )}
                          </span>
                          Daily
                        </label>
                      </div>

                      {/* Monthly Option */}
                      <div
                        className={`flex items-center w-[50%] h-[50px] rounded-[10px] cursor-pointer mb-5 pl-5 ${
                          kametiType === "monthly"
                            ? "bg-[#A87F0B6E]"
                            : "bg-[#FFFFFF0D]"
                        } ${id ? "opacity-50 cursor-not-allowed" : ""}`} // Add visual feedback for disabled state
                        onClick={() =>
                          !id &&
                          setKametiType((prevType) =>
                            prevType === "monthly" ? "" : "monthly"
                          )
                        } // Prevent click when ID is available
                      >
                        <input
                          type="checkbox"
                          value="monthly"
                          checked={kametiType === "monthly"}
                          disabled={!!id} // Disable input if ID is available
                          onChange={(e) =>
                            setKametiType(e.target.checked ? "monthly" : "")
                          }
                          className="hidden"
                        />
                        <label
                          className={`flex items-center text-white ${
                            kametiType === "monthly"
                              ? "font-normal"
                              : "font-normal"
                          }`}
                        >
                          <span
                            className={`w-[16px] h-[16px] rounded border-[2px] mr-2 relative ${
                              kametiType === "monthly"
                                ? "bg-[#A87F0B] border-[#A87F0B]"
                                : "border-[#6A6A6A]"
                            }`}
                          >
                            {/* Custom checkmark */}
                            {kametiType === "monthly" && (
                              <span className="absolute inset-0 flex justify-center items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10"
                                  height="10"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                >
                                  <path
                                    d="M1 5L4 8L9 2"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            )}
                          </span>
                          Monthly
                        </label>
                      </div>
                    </div>
                  </div>

                  {screenwidth > 430 && (
                    <>
                      {kametiType === "daily" ? (
                        <div
                          className={`sm:w-[90%] w-[100%] sm:ml-10 flex items-center flex-col ${
                            kametiType === "daily" ? "opacity-1" : "opacity-0"
                          }`}
                        >
                          <div className="w-[100%] sm:mt-2 mt-5 mb-2">
                            <label className="text-[white]">Daily Amount</label>
                          </div>

                          <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] mb-5 flex items-center">
                            <div className="w-[80%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
                              <input
                                type="text"
                                placeholder="e.g 200"
                                disabled
                                value={
                                  pricePerDayKameti
                                    ? (Number(pricePerDayKameti) || 0).toFixed(
                                        2
                                      )
                                    : ""
                                }
                                onChange={(e) =>
                                  setPricePerDayKameti(e.target.value)
                                }
                                className="outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] placeholder-[#CACACA]"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`sm:w-[90%] w-[100%] flex items-center flex-col ${
                            kametiType === "dsf" ? "opacity-1" : "opacity-0"
                          }  `}
                        >
                          <div className="w-[90%] mt-1 mb-2">
                            <label className="text-[white]">Daily Amount</label>
                          </div>
                          <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] sm:mb-5 flex items-center">
                            <div className="w-[90%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
                              <input
                                type="text"
                                placeholder="e.g 200"
                                value={pricePerDayKameti}
                                onChange={(e) =>
                                  setPricePerDayKameti(e.target.value)
                                }
                                className="outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] pl-1 placeholder-[#CACACA]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {screenwidth < 431 && (
                    <>
                      {kametiType === "daily" && (
                        <div
                          className={`sm:w-[90%] w-[100%] flex items-center flex-col ${
                            kametiType === "daily" ? "opacity-1" : "opacity-0"
                          }  `}
                        >
                          <div className="w-[100%] mt-1 mb-2">
                            <label className="text-[white]">Daily Amount</label>
                          </div>
                          <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] sm:mb-5 flex items-center">
                            <div className="w-[90%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
                              <input
                                type="text"
                                placeholder="e.g 200"
                                value={pricePerDayKameti}
                                disabled
                                onChange={(e) =>
                                  setPricePerDayKameti(e.target.value)
                                }
                                className="outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] pl-1 placeholder-[#CACACA]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="flex w-[100%] justify-center sm:flex-row flex-col items-center">
                  <div className="sm:w-[90%] w-[100%] flex items-center flex-col">
                    <div className="w-[100%] sm:mt-2 mt-5 mb-2">
                      <label className="text-[white]"> Total Months</label>
                    </div>
                    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] sm:mb-5 flex items-center px-4 relative">
                      <input
                        type="text"
                        placeholder="e.g 12"
                        value={totalMonths}
                        onChange={(e) => setTotalMonths(e.target.value)}
                        className="outline-none border-none text-[white] bg-colorinput w-full h-[40px] placeholder-[#CACACA] pr-10 pl-1"


                      />
                      <IoIosInformationCircleOutline
                        onClick={handleinfoTotalMonth}
                        // Replace with your desired icon, e.g., calendar
                        className="text-[#FFFFFF4D] text-[25px] absolute right-4 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="sm:w-[90%] w-[100%] sm:ml-10 flex items-center flex-col">
                    <div className="w-[100%] sm:mt-2 mt-5 mb-2">
                      <label className="text-[white]">Monthly Amount</label>
                    </div>
                    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] mb-5 sm:sm-mb-5 flex items-center px-4 relative">
                      <input
                        type="text"
                        placeholder="e.g 24,000"
                        value={
                          pricePerKameti
                            ? new Intl.NumberFormat().format(pricePerKameti)
                            : ""
                        }
                        disabled
                        className="outline-none border-none text-[white] bg-colorinput w-full h-[40px] placeholder-[#CACACA] pr-10 pl-1"
                      />

                      <IoIosInformationCircleOutline
    onClick={handleinfoMonthlyAmmount}
     className="text-[#FFFFFF4D] text-[25px] absolute right-4 cursor-pointer"
    />
                    </div>
                  </div>
                </div>

                <div className="flex w-[100%] justify-center sm:flex-row flex-col items-center">
  <div className="sm:w-[90%] w-[100%] flex items-center flex-col">
    <div className="w-[100%] sm:mt-2 mt-0 mb-2">
      <label className="text-[white]">My Kameties</label>
    </div>
    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] mb-5 flex items-center px-4 relative">
      <input
        type="text"
        placeholder="e.g 1,2" // Placeholder stays the same
        value={myTotalKameties ? formatPrice(myTotalKameties) : ""}
        onChange={(e) => setMyTotalKameties(e.target.value)} // Keep raw value in state
        className="outline-none border-none text-[white] bg-colorinput w-full h-[40px] placeholder-[#CACACA] pr-10 pl-1"

      />
      <IoIosInformationCircleOutline
        onClick={handleinfoMyKametie}
        className="text-[#FFFFFF4D] text-[25px] absolute right-4 cursor-pointer"
      />
    </div>
  </div>
  <div className="sm:w-[90%] w-[100%] sm:ml-10 flex items-center flex-col">
  <div className="w-[100%] sm:mt-2 mt-0 mb-2">
    <label className="text-[white]">Start Date</label>
  </div>
  <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] sm:mb-5 flex items-center relative">
    <div className="w-[90%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
      <input
        id="startDateInput"
        type="text"
        onFocus={(e) => {
          if (myTotalKameties && totalMonths) {
            e.target.type = "date";
            e.target.showPicker();
          }
        }}
        placeholder="MM-DD-YY"
        value={startingDate}
        onChange={(e) => {
          setStartingDate(e.target.value);

          if (e.target.value === "") {
            setEndingDate("");
          }
        }}
        className="outline-none border-none text-[white] bg-colorinput w-full h-[40px] placeholder-[#CACACA]"
        disabled={!myTotalKameties || !totalMonths}
      />
      {/* Add custom calendar icon */}
      <i
        className="fa fa-calendar absolute right-4 text-brown-500"
        style={{ top: "50%", transform: "translateY(-50%)" }}
        onClick={() => {
          if (myTotalKameties && totalMonths) {
            document.getElementById("startDateInput").showPicker();
          }
        }}
      />
    </div>
  </div>
</div>

</div>

<div className="flex w-[100%] justify-center sm:flex-row flex-col items-center">
  <div className="sm:w-[90%] w-[100%] flex items-center flex-col">
    <div className="w-[100%] sm:mt-2 mt-5 mb-2">
      <label className="text-[white]">End Date</label>
    </div>
    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] mb-5 flex items-center">
      <div className="w-[80%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
        <input
          onFocus={(e) => (e.target.type = "date")}
          placeholder="MM-DD-YY"
          value={formatDate(endingDate, "endDate")}
          disabled
          onChange={(e) => setEndingDate(e.target.value)}
          className="outline-none border-none text-[white] bg-colorinput w-full h-[40px] placeholder-[#CACACA] pr-10"
       
        />
      </div>
    </div>
  </div>

  <div className="sm:w-[90%] w-[100%] sm:ml-10 flex items-center flex-col">
    <div className="w-[100%] sm:mt-2 mt-0 mb-2">
      <label className="text-[white]">Withdrawal Dates</label>
    </div>
    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] mb-5 flex items-center">
      <div className="w-[80%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
        <button
          className="text-[white] outline-none border-none text-left w-[100%] h-[50px] "
          onClick={openWithdrawDatesModal}
        >
          {withdrawDates.length === 0
            ? "Set Withdraw Dates"
            : withdrawDates
                .filter((date) => !isNaN(new Date(date).getTime()))
                .map((date) => 
                  date == null
                    ? "N/A"
                    : formatDate(new Date(date), "withdrawDate")
                )
                .join(", ")}
        </button>

        {showWithdrawDates && (
          <WithdrawDates
            counts={myTotalKameties}
            dates={withdrawDates}
            isCreating={true}
            onClose={() => setShowWithdrawDates(false)}
            onCreate={handleSaveWithdrawDates}
          />
        )}
      </div>
    </div>
  </div>
</div>


              </div>
              <div className="flex w-[95%] sm:w-[90%] justify-center items-center mt-5 mb-5">
                <div className="flex flex-col sm:flex-row sm:w-[100%] w-[100%] justify-between items-center sm:gap-7 gap-5">
                  {/* Cancel Button */}
                  <button
                    style={{
                      boxShadow: "-4px -6px 6.8px 0px #00000040 inset",
                    }}
                    className="w-[100%] order-2 sm:order-1 sm:w-[100%] h-[50px] rounded-[10px] bg-colorinput font-bold text-[white]"
                  >
                    Cancel
                  </button>

                  {/* Create/Update Button */}
                  <button
                    style={{
                      boxShadow: "-4px -6px 6.8px 0px #00000040 inset",
                    }}
                    className="w-[100%] order-1 sm:order-2 sm:w-[100%] h-[50px] rounded-[10px] bg-[#A87F0B] font-bold text-[white]"
                    onClick={id ? handleUpdateCommittee : handleCreateCommittee}
                  >
                    {id ? (
                      btnloader ? (
                        <ClipLoader
                          size={20}
                          color="#ffffff"
                          className="mt-2"
                        />
                      ) : (
                        "Update"
                      )
                    ) : btnloader ? (
                      <ClipLoader size={20} color="#ffffff" className="mt-2" />
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConfirmAlert && (
        <Alert
          btnloader={btnloader}
          message={confirmMessage}
          onConfirm={handleAlertConfirm} // Handle alert confirmation here
          onCancel={handleAlertCancel} // Cancel button logic
        />
      )}

      <InfoModal
        info={shareTotalAmount}
        handleCloseshare={handleCloseshare}
        message="Total amount that you will pay in all months and that you will receive on withdraw date."
      />
      <InfoModal
        info={shareMyKameti}
        handleCloseshare={handleCloseshare}
        message="Number of your shares in kameti. e.g. if there are total 10 share in the kameti and you want to have 2 shares then you will have 2 withdraw dates. You can add only 20 kameti Max."
      />
      <InfoModal
        info={shareTotalMonth}
        handleCloseshare={handleCloseshare}
        message="Total number of months for which you want to pay kameti."
      />
      <InfoModal
        info={shareMonthlyAmmount}
        handleCloseshare={handleCloseshare}
        message="Monthly amount that we pay each month."
      />
    </>
  );
}