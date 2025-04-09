import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-6 xl:px-9 w-full cursor-pointer transition-colors
     ${isActive ? "border-r-4 border-primary bg-white" : "hover:bg-gray-100"}`;

  const iconClass = "w-5 xl:w-6 2xl:w-7";

  return (
    <div className="min-h-screen bg-white border-r">
      {(atoken || dToken) && (
        <ul className="text-[#515151] mt-5">
          {atoken && (
            <>
              <NavLink to="/admin-dashboard" className={navLinkClass}>
                <img className={iconClass} src={assets.home_icon} alt="Dashboard" />
                <p className="hidden md:block">Dashboard</p>
              </NavLink>
              <NavLink to="/all-appointments" className={navLinkClass}>
                <img className={iconClass} src={assets.appointment_icon} alt="Appointments" />
                <p className="hidden md:block">Appointments</p>
              </NavLink>
              <NavLink to="/add-doctor" className={navLinkClass}>
                <img className={iconClass} src={assets.add_icon} alt="Add Doctor" />
                <p className="hidden md:block">Add Doctor</p>
              </NavLink>
              <NavLink to="/doctor-list" className={navLinkClass}>
                <img className={iconClass} src={assets.people_icon} alt="Doctors List" />
                <p className="hidden md:block">Doctors List</p>
              </NavLink>
            </>
          )}

          {dToken && (
            <>
              <NavLink to="/doctor-dashboard" className={navLinkClass}>
                <img className={iconClass} src={assets.home_icon} alt="Dashboard" />
                <p className="hidden md:block">Dashboard</p>
              </NavLink>
              <NavLink to="/doctor-appointments" className={navLinkClass}>
                <img className={iconClass} src={assets.appointment_icon} alt="Appointments" />
                <p className="hidden md:block">Appointments</p>
              </NavLink>
              <NavLink to="/doctor-Profile" className={navLinkClass}>
                <img className={iconClass} src={assets.people_icon} alt="Profile" />
                <p className="hidden md:block">Doctor Profile</p>
              </NavLink>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
