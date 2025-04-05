import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, getDashData, dashboardData, setDashboardData,cancelappointment,appointmentComplete } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);
  return (
    dashboardData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />

            <p className="text-xl font-semibold text-gray-600">
              {currency}
              {dashboardData.earnings}
            </p>
            <p className="text-gray-400">Doctors</p>
          </div>

          <div className="flex   items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />

            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.totalAppointments}
            </p>
            <p className="text-gray-400">appointments</p>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />

            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.totalPatients}
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
            {dashboardData?.latestAppointments?.map((item, index) => (
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
                  <p className="text-gray-600  ">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-normal">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-400 text-xs font-normal">
                    Completed
                  </p>
                ) : (
                  <div className="flex">
                    <img
                      onClick={() => cancelappointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => appointmentComplete(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
