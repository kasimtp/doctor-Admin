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

import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import Sidebar from "./components/Sidebar";
import AllAppointments from "./pages/Admin/AllAppointments";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return atoken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin route */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashbord />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />

          {/* doctor route */}

          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-Profile" element={<DoctorProfile />} />
        </Routes>{" "}
        I
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
