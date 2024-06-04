
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
import DeleteKameti from "./pages/Delete kameti/DeleteKameti";
import AllRecords from "./pages/AllRecords/AllRecords";

function App() {
  const RequireAuth = ({ children }) => {
    const currentUser = localStorage.getItem("id");
    return currentUser?.length>0 && currentUser !=undefined  ? children : <Navigate to="/signin" />;
  };

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Splash/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<SignIn/>}/>
    <Route path="/forgot" element={<ForgotPassword/>}/>
    <Route path="/create">
    <Route path="" element={<RequireAuth><Create/></RequireAuth>}/>
    <Route path=":id" element={<RequireAuth><Create/></RequireAuth>}/>
    </Route>
    <Route path="/delete" element={<RequireAuth><DeleteKameti/></RequireAuth>}/>
    <Route path="/payment" element={<RequireAuth><Payment/></RequireAuth>}/>
    <Route path="/history" element={<RequireAuth><History/></RequireAuth>}/>
    <Route path="/more" element={<RequireAuth><More/></RequireAuth>}/>
    <Route path="/allrecords" element={<RequireAuth><AllRecords/></RequireAuth>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
