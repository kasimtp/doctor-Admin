import { createContext, useState } from "react"
import axios  from "axios"
import  {toast} from "react-toastify"

export const DoctorContext = createContext()

 const  DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken ,setDToken] = useState( localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")

    const [appointment , setAppointment] = useState([])

    const getAppointments = async () => {
        try {
            
         const {data} = await axios.get(
            "http://localhost:4000/api/Doctor/appointments",
            { headers: { dToken } }
          );
          if (data.success) {
            setAppointment(data.appointments.reverse())
            console.log("appoint data",(data.appointment));
            
            
          } else {
            toast.error(data.message)
          }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    
    
    const value = {
        backendUrl,dToken,setDToken,appointment,setAppointment,getAppointments
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

 }
 export default DoctorContextProvider