import { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashbord = () => {
  const { atoken, getDashData, CancelAppointment, dashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="" />

            <p className="text-xl font-semibold text-gray-600">
              {dashData.doctor}
            </p>
            <p className="text-gray-400">Doctors</p>
          </div>

          <div className="flex   items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />

            <p className="text-xl font-semibold text-gray-600">
              {dashData.appointments}
            </p>
            <p className="text-gray-400">appointments</p>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />

            <p className="text-xl font-semibold text-gray-600">
              {dashData.patients}
            </p>
            <p className="text-gray-400">patients</p>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold"> letest Booking</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData.leatestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item?.userData?.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item?.userData?.name}
                  </p>
                  <p className="text-gray-600  ">{new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</p>
                  
                </div>
                {
              item.cancelled 
              ?
              <p className="text-red-400 text-xs font-medium">cancelled</p> 
              : item.isCompleted 
              ?<p className="text-green-500 text-xs font-medium">Completed</p> 
               :  <img onClick={()=> CancelAppointment(item._id)} className="w-18 cursor-pointer" src={assets.cancel_icon} alt="" />
            }
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashbord;
