import { createContext, useState } from "react"
import axios  from "axios"
import  {toast} from "react-toastify"

export const DoctorContext = createContext()

 const  DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken ,setDToken] = useState( localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")

    const [appointment , setAppointment] = useState([])
    const [ dashboardData , setDashboardData ] = useState(false)   
    const [profileData, setProfileData] = useState(false)  

    const getAppointments = async () => {
        try {
            
         const {data} = await axios.get(
            "http://localhost:4000/api/Doctor/appointments",
            { headers: { dToken } }
          );
          if (data.success) {
            setAppointment(data.appointments)
            // console.log("doc data",(data.doctorData));
            // console.log("appoint data",(data.appointments));
            
            
          } else {
            toast.error(data.message)
          }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }


    const appointmentComplete = async (appointmentId) => {
      
      try {
          const {data} =  await axios.post (
            "http://localhost:4000/api/Doctor/complete-appointment",{appointmentId},
            { headers: { dToken } }
          );

          if (data.success) {
            toast.success(data.message)
            getAppointments()
            
          } else {
            toast.error(data.message)
          }
          
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }




    const cancelappointment = async (appointmentId) => {

      try {
          const {data} =  await axios.post (
            "http://localhost:4000/api/Doctor/cancel-appointment",{appointmentId},
            { headers: { dToken } }
          );

          if (data.success) {
            toast.success(data.message)
            getAppointments()
            
          } else {
            toast.error(data.message)
          }
          
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
    
    const getDashData = async () => {
      try {
          const { data } = await axios.get(
              "http://localhost:4000/api/Doctor/dashboard",  
              { headers: { dToken } }
          );
  
          // console.log("API Response Data:", data);  // Debugging Log
  
          if (data.success) {
              setDashboardData(data.dashboardData);
              // console.log("Dashboard Data:", data.dashboardData);
          } else {
              toast.error(data.message);
          }
      } catch (error) {
          // console.error("Error fetching dashboard data:", error);
          toast.error(error.message);
      }
  };

  const getProfileData = async () => {
    try {
      
    const {data} = await axios.get(
      "http://localhost:4000/api/Doctor/profile",      
      { headers: { dToken } }
  );

  if (data.success) {
    setProfileData(data.profileData) 
    console.log("profoleeeeeeeee",data.profileData);
    
  }
         
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  

    
            

    
    
    const value = {
        backendUrl,dToken,setDToken,appointment,setAppointment,getAppointments,appointmentComplete ,cancelappointment,getDashData,dashboardData,setDashboardData,
        profileData,setProfileData,getProfileData
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

 }
 export default DoctorContextProvider