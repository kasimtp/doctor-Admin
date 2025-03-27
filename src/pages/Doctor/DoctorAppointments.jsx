import { useContext, useEffect, useState } from "react"
import  {DoctorContext} from '../../context/DoctorContext'
import { AppContext } from "../../context/AppContext"
import { assets } from "../../assets/assets"


const DoctorAppointments = () => {
const {dToken, appointment,getAppointments } = useContext(DoctorContext)

const {calculateAge,currency} = useState(AppContext)

useEffect(()=>{

  if (dToken) {
    getAppointments()  
  }
  
},[dToken])

  return (
    <div className="w-full  max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh]  min-h-[50vh] overflow-y-scroll">
      <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctors</p>
          <p>Fees</p>
          <p>Actions</p>
          </div>

      {
                 appointment?.map((item,index)=> (
                   <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50" key={index}>
                     <p className="max-sm:hidden">{index+1}</p>
                     <div className="flex items-center gap-2">
                       <img className="w-8 rounded-full" src={item?.userData?.image} alt="" /> <p>{item?.userData?.name}</p>
                     </div>
                     <p className="text-xs inline border-primary px-2 border rounded-full">{item.payment ? 'Online' : 'CASH'}</p>
                     {/* <p className="max-sm:hidden">{calculateAge(item?.userData?.dob)}</p> */}
                     <p>{item.slotDate}, {new Date(item.date).toLocaleDateString("en-US", {
                       year: "numeric",
                       month: "long",
                       day: "numeric",
                     })}
                     | {item.slotTime}</p>
     
                     <div className="flex items-center gap-2">
                       <img className="w-8 rounded-full bg-gray-200" src={item?.docData?.image} alt="" /> <p>{item?.docData?.name}</p>
                     </div>
                      <p>{currency}{item.amount}</p>

                      <div>
                        <img src={assets.cancel_icon} alt="" />
                        <img src={assets.tick_icon} alt="" />
                      </div>
                     
            
     
                     </div>
                 ))
               }

      </div>
      
    </div>
  )
}

export default DoctorAppointments
