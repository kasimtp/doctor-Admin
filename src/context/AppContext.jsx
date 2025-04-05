/* eslint-disable react/prop-types */
import { createContext } from "react"
import {   useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext()

 const  AppContextProvider = (props) => {

    const currency = '$'
   

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