// import { Route, Routes } from "react-router-dom"
// import Dashboard from "./pages/Dashboard"

// import Appointments from "./pages/Appointments"
// import AddDoctor from "./pages/AddDoctor"
// import DoctorsList from "./pages/DoctorsList"
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";

import { Route, Routes } from "react-router-dom";
import Dashbord from "./pages/Admin/Dashbord";
import AllApointment from "./pages/Admin/AllApointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import Sidebar from "./components/Sidebar";



const App = () => {
  const { atoken } = useContext(AdminContext);
  return atoken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar/>
        <Routes>
    <Route path='/' element={<></>} />
    <Route path='/admin-dashboard' element={<Dashbord />} />
    <Route path='/all-appointments' element={<AllApointment />} />
    <Route path='/add-doctor' element={<AddDoctor />} />
   <Route path='/doctor-list' element={<DoctorsList />} />
</Routes> I
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};
export default App;
