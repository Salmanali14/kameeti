
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import Splash from "./pages/Splash/Splash";
import Signup from "./pages/Signup/Signup";
import SignIn from "./pages/SignIn/SignIn";
import ForgotPassword from "./pages/Forgotpassword.jsx/ForgotPassword";
import Create from "./pages/CreatePage/Create";
import Payment from "./pages/PaymentPage/Payment";
import History from "./pages/HistoryPage/History";
import More from "./pages/More/More";

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Splash/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<SignIn/>}/>
    <Route path="/forgot" element={<ForgotPassword/>}/>
    <Route path="/create" element={<Create/>}/>
    <Route path="/payment" element={<Payment/>}/>
    <Route path="/history" element={<History/>}/>
    <Route path="/more" element={<More/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
