/* eslint-disable react/prop-types */
import { createContext } from "react"
import {   useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext()

 const  AppContextProvider = (props) => {

    const currency = '$'
    //   const [doctors, setDoctors] = useState([]);


    //  const getDoctorsData = async () => {
    //     try {
    //       const { data } = await axios.get("http://localhost:4000/api/doctor/list");
    //       if (data.success) {
    //         setDoctors(data.doctors);
    //         console.log("Fetched Doctors Data:", data); 
    
    //       } else {
    //         toast.error(data.message);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       toast.error(error.message);
    //     }
    //   };

    const calculateAge = (dob) => {
        const today = new Date()
        const birtDate = new Date(dob)

        let age = today.getFullYear() - birtDate.getFullYear()
        return age
    }
    
    const value = {
        calculateAge,currency,
        // getDoctorsData,doctors

    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

 }
 export default AppContextProvider