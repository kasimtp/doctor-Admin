import { createContext, useState } from "react"
import axios from'axios'
import {toast} from 'react-toastify'
//import { apiClient } from "../api/axios"

export const AdminContext = createContext()

 const  AdminContextProvider = (props) => {

    const [atoken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'): '')
    const [doctors,setDoctors] = useState([])
    //const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {

        try {
              const {data} = await axios.post('http://localhost:4000/api/admin/all-doctors', {}, {headers:{atoken}} )
            // const {data} = await apiClient.post("/admin/all-doctors",  {}, {headers:{atoken}} ) 
            console.log(data);
            
              if (data) {
                setDoctors(data)
                
              } else {
                toast.error(data.message)
              }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const changeAvailability = async (docId)=> {
        
      try {
        const {data} = await axios.post('http://localhost:4000/api/admin/change-availability', {docId}, {headers:{atoken}})
        
        if (data.success) {
              toast.success(data.message)
              getAllDoctors()         
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const value = {
        atoken,setAToken,
        //backendUrl,
        doctors,
        getAllDoctors,changeAvailability

    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

 }
 export default AdminContextProvider